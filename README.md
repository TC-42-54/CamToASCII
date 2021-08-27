# CamToASCII
A simple script to convert webcam image to ascii art

![alt text](https://github.com/TC-42-54/CamToASCII/blob/main/example/cam_to_ascii.gif "CamToASCII Example")

# Install
This script need you to have Node.js installed : https://nodejs.org/en/

## Step 1 :

As this script is using the module node-webcam, there are some dependencies to install in order to run the script :

### Linux

```
#Linux relies on fswebcam currently
#Tested on ubuntu

sudo apt-get install fswebcam

```

### Mac OSX

```
#Mac OSX relies on imagesnap
#Repo https://github.com/rharder/imagesnap
#Avaliable through brew

brew install imagesnap

```

### Windows

Standalone exe included. See [src/bindings/CommandCam](https://github.com/chuckfairy/node-webcam/tree/master/src/bindings/CommandCam)

## Step 2 :
```
#You can now install the node modules necessary

#If you use Yarn
yarn install

#If you use npm
npm install

```
