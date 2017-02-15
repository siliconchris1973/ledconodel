var wpi = require('wiring-pi');

/*
 * set the hardware pins for the 3 leds as a new instance of Gpio
 */
const redled = new Gpio(13);
const greenled = new Gpio(19);
const blueled = new Gpio(26);

// GPIO pin of the led
var configPin = greenled;
// Blinking interval in usec
var configTimeout = 1000;

wpi.setup('wpi');
wpi.pinMode(configPin, wpi.OUTPUT);

var isRedLedOn = 0;
var isGreenLedOn = 0;
var isBlueLedOn = 0;

var isLedOn = isGreenLedOn;

setInterval(function() {
	isLedOn = +!isLedOn;
	//isLedOn = !isLedOn;
	wpi.digitalWrite(configPin, isLedOn );
}, configTimeout);
