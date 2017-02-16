var exports = module.exports = {};
/*
 * shall we output debug logs?
 * if so start the app with:
 *    DEBUG=ledconodel node app.js
 */
const debug = require('debug')('ledconodel');
const name = 'ledconodel::greenled';
debug('initiating %s', name);

var fs = require('fs');
var configData = fs.readFileSync('../data/config.json'), myConfigObj;

try {
	myConfigObj = JSON.parse(configData);
	console.dir(myConfigObj);
} catch (err) {
	console.log('There has been an error parsing your JSON.')
	console.log(err);
}

/*
 * set the pins for the 3 leds as a new instance of Gpio
 * we set these from a config json file
							HW --> BCM --> WiringPI
		redled		33 --> 13  --> 23
		greenled	35 --> 19  --> 24
		blueled		37 --> 26  --> 25
*/
const redled = myConfigObj.redled;
const greenled = myConfigObj.greenled;
const blueled = myConfigObj.blueled;

// Blinking interval in usec
var configTimeout = myConfigObj.configtimeout;

// now setup the GPIO
var wpi = require('wiring-pi');

wpi.setup('wpi');
wpi.pinMode(redled, wpi.OUTPUT);
wpi.pinMode(greenled, wpi.OUTPUT);
wpi.pinMode(blueled, wpi.OUTPUT);

var isRedLedOn = fs.readFileSync('../data/red_status');
var isGreenLedOn = fs.readFileSync('../data/green_status');
var isBlueLedOn = fs.readFileSync('../data/blue_status');
var isLedOn = isGreenLedOn;
var configPin = greenled;


/*
 * the exit handler function. I want to make sure the led is turned off,
 * when exiting, so it doesn't blink or is on all the time
 */
function exitHandler(options, err) {
	wpi.digitalWrite(configPin,0);
  if (options.cleanup) debug('exiting clean');
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}

/*
 * drive the led
 */
exports.turnledon = function(){ wpi.digitalWrite(configPin,1) };

/*
 * drive the led
 */
exports.turnledoff = function(){ wpi.digitalWrite(configPin,0) };

/*
 * blink the given led
 */
exports.blinkled = function(){
	setInterval(function() {
		isLedOn = +!isLedOn;
		//isLedOn = !isLedOn;
		wpi.digitalWrite(configPin, isLedOn );
	}, configTimeout);
};


//do something when app is closing
process.on('exit', exitHandler.bind(null, {cleanup:true}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
