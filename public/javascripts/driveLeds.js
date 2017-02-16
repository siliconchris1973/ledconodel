var exports = module.exports = {};
/*
 * shall we output debug logs?
 * if so start the app with:
 *    DEBUG=ledconodel node app.js
 */
const debug = require('debug')('ledconodel');
const name = 'ledconodel::blueled';
debug('initiating %s', name);

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

// Blinking interval in usec
var configTimeout = 1000;

wpi.setup('wpi');
wpi.pinMode(redled, wpi.OUTPUT);
wpi.pinMode(greenled, wpi.OUTPUT);
wpi.pinMode(blueled, wpi.OUTPUT);

var isRedLedOn = 0;
var isGreenLedOn = 0;
var isBlueLedOn = 0;
var isLedOn = isGreenLedOn;

/*
 * blink the given led
 */
function blink(configPin){
	setInterval(function() {
		isLedOn = +!isLedOn;
		//isLedOn = !isLedOn;
		wpi.digitalWrite(configPin, isLedOn );
	}, configTimeout);
};

/*
 * turn off the given led
 */
function turnOffLed(configPin){
	wpi.digitalWrite(configPin,0);
};

/*
 * the exit handler function. I want to make sure the led is turned off,
 * when exiting, so it doesn't blink or is on all the time
 */
function exitHandler(configPin, options, err) {
	wpi.digitalWrite(configPin,0);
  if (options.cleanup) debug('exiting clean');
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}

/*
 * drive the led
 */
blink(blueled);


//do something when app is closing
process.on('exit', exitHandler.bind(configPin, null, {cleanup:true}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(configPin, null, {exit:true}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(configPin, null, {exit:true}));
