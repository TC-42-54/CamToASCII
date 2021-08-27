const wc = require('node-webcam')
const canvas = require('node-canvas')
const clipper = require('image-clipper')({
    canvas
})
const fs = require('fs')
const options = {
    width: 1280,
    height: 720, 
    quality: 60,
    delay: 1,
    saveShots: false,
    output: "jpeg",
    device: false,
    callbackReturn: "location"
};
const imagePath = require('path').join(__dirname, 'face.jpg')

const captureImage = () => new Promise(async res => {
    try {
        wc.capture(imagePath, options, function (err, data) {
            if (err) throw err
            res(true)
        })
    } catch(e) {
        console.error(e.message)
        res(false)
    }
})

const cropImage = () => new Promise(res => {
    try {
        clipper.image(imagePath, function() {
            this.resize(600)
            this.toFile(imagePath, function() {
                res(true)
            })
        })
    } catch(e) {
        console.error(e.message)
        res(false)
    }
})


const getGrayscaleImage = async () => {
    const cv = canvas.createCanvas(120, 92)
    const ctx = cv.getContext('2d')
    const image = await canvas.loadImage(imagePath)
    ctx.drawImage(image, 0, 0, cv.width, cv.height)
    let imageData = ctx.getImageData(0, 0, cv.width, cv.height)
    ctx.clearRect(0, 0, cv.width, cv.height);
    const pixelLuminance = []
    for (let idx = 0; idx < imageData.data.length; idx += 4) {
        const r = imageData.data[idx]
        const g = imageData.data[idx + 1]
        const b = imageData.data[idx + 2]
        const average = parseInt(0.299 * r + 0.587 * g + 0.114 * b)
        imageData.data[idx] = average
        imageData.data[idx + 1] = average
        imageData.data[idx + 2] = average
        pixelLuminance.push(average)
    }
    return { lumArray: pixelLuminance, width: cv.width, height: cv.height }
}

const logImage = (pixelArray, width, height) => {
    const chars = '.:-=+*#%@ ';
    const charsLength = chars.length
    let result = ''
    pixelArray.forEach((luminance, idx) => {
        const simplifiedLuminance = luminance > 225 ? 255 : luminance
        const pixelChar = chars[Math.ceil((charsLength - 1) * simplifiedLuminance / 255)];
        result += ` ${pixelChar}`
        if (idx % width === 0) {
            result += '\n'
        }
    })
    console.clear()
    console.log(result);

    return result
}

const getImage = async () => {
    try {
        await captureImage()
        await cropImage()
        const {lumArray, width, height} = await getGrayscaleImage()
        logImage(lumArray, width, height)
    } catch (e) {
        console.error(e.message)
        return false
    }
    return true
}

setInterval(async () => {
 await getImage()
}, 150)