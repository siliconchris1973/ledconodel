var exports = module.exports = {};
/*
 * shall we output debug logs?
 * if so start the app with:
 *    DEBUG=ledconodel node app.js
 */
const debug = require('debug')('ledconodel');
const name = 'ledconodel';
debug('booting %s', name);

var wpi = require('wiring-pi');

/*
 * set the pins for the 3 leds as a new instance of Gpio
							HW --> BCM --> WiringPI
		redled		33 --> 13  --> 23
		greenled	35 --> 19  --> 24
		blueled		37 --> 26  --> 25
*/
const redled = 23;
const greenled = 24;
const blueled = 25;

// GPIO pin of the led
var configPin = blueled;
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

debug('end');
