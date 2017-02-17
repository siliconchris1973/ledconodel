# ledconodel
A tiny Node.JS app to watch an adafruit.io feed and turn on/off 3 leds
connected to the Raspberry PI

The idea is to, for example, tell Alexa to trigger the red led and "she/it"
pushes this command to

## Installation
Get the repository from github:
  git clone https://guthub.com/siliconchris1973/ledconodel

Change into the new directory:
  cd ledconodel

Satisfy all dependencies:
  npm install

[Optional] Configure your GPIO connection
Adapt the configuration, in case you do not have your LEDs attached to the same pins
Configuration can be found in directory
  data/config.json

Start the process
  npm start

To start in debug mode - have some log output on the console:
  DEBUG=ledconodel npm start

## Configuration
Red LED:
    Connection  : Pin
    "HW"        : "33"
    "BCM"       : "13"
    "Wiring-PI" : "23"

Green LED:
    Connection  : Pin
    "HW"        : "35",
    "BCM"       : "19",
    "Wiring-PI" : "24"

Blue LED:
    Connection  : Pin
    "HW"        : "37",
    "BCM"       : "26",
    "Wiring-PI" : "25"
