var exports = module.exports = {};

// set the color of the led
var ledcolor = "green";

/*
 * shall we output debug logs?
 * if so start the app with:
 *    DEBUG=ledconodel node app.js
 */
const debug = require('debug')('ledconodel');
const name = 'ledconodel::'+ledcolor+'led';
debug('initiating %s', name);

var fs = require('fs');
var configData = fs.readFileSync(__base + '/data/config.json'), myConfigObj;

try {
	myConfigObj = JSON.parse(configData);
	debug(myConfigObj);
} catch (err) {
	console.log('There has been an error parsing your JSON.')
	console.log(err);
}

/*
 * set the pins for the 3 leds as a new instance of Gpio
 * we set these from the config.json file above
							HW --> BCM --> WiringPI
		redled		33 --> 13  --> 23
		greenled	35 --> 19  --> 24
		blueled		37 --> 26  --> 25
*/
const redled = parseInt(myConfigObj.redled);
const greenled = parseInt(myConfigObj.greenled);
const blueled = parseInt(myConfigObj.blueled);
// THIS IS THE PIN WE DRIVE
var configPin = greenled;

// Blinking interval in usec
var configTimeout = parseInt(myConfigObj.configtimeout);

var statusFile = __base + '/data/'+ledcolor+'_status';
var isLedOn = 0
try {
	isLedOn = parseInt(fs.readFileSync(statusFile));
} catch (err) {
	console.log('could not read status file for %s led %s', ledcolor, statusFile)
	console.log(err);
}

// load up and define all the stuff for the PI
runtimeArch = "noPI";

// now setup the GPIO - I do this in a try catch block to overcome the issue
// of debugging on my laptop
try {
	var wpi = require('wiring-pi');
	wpi.setup('wpi');
	wpi.pinMode(configPin, wpi.OUTPUT);
	runtimeArch = "PI";
} catch (err) {
	runtimeArch = "noPI";
	console.log('could not load wiring-pi, so I\'m assuming we are not on a PI and this is just a demo run')
	console.log(err);
}


/*
 * the exit handler function. I want to make sure the led is turned off,
 * when exiting, so it doesn't blink or is on all the time
 */
function exitHandler(options, err) {
	if (runtimeArch == "PI") { wpi.digitalWrite(configPin,0); };
	try {
		fs.writeFile(statusFile, 0);
	} catch (err) {
		console.log('could not write status file for %s led %s', ledcolor, statusFile)
		console.log(err);
	}

  if (options.cleanup) debug('exiting clean');
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}

/*
 * drive the led
 */
exports.turnledon = function() {
	if (runtimeArch == "PI") { wpi.digitalWrite(configPin,1); };
	try {
		fs.writeFile(statusFile, 1);
	} catch (err) {
		console.log('could not write status file for %s led %s', ledcolor, statusFile);
		console.log(err);
	}
};

/*
 * drive the led
 */
 exports.turnledon = function() {
 	if (runtimeArch == "PI") { wpi.digitalWrite(configPin,0); };
 	try {
 		fs.writeFile(statusFile, 0);
 	} catch (err) {
 		console.log('could not write status file for %s led %s', ledcolor, statusFile);
 		console.log(err);
 	}
 };
/*
 * blink the given led
 */
exports.blinkled = function(){
	try {
 		fs.writeFile(statusFile, 1);
 	} catch (err) {
 		console.log('could not write status file for %s led %s', ledcolor, statusFile);
 		console.log(err);
 	}
	setInterval(function() {
		isLedOn = +!isLedOn;
		//isLedOn = !isLedOn;
		if (runtimeArch == "PI") { wpi.digitalWrite(configPin, isLedOn ); };
	}, configTimeout);
};


//do something when app is closing
process.on('exit', exitHandler.bind(null, {cleanup:true}));
//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
