var express = require('express');
var router = express.Router();
/*
 * shall we output debug logs?
 * if so start the app with:
 *    DEBUG=ledconodel node app.js
 */
const debug = require('debug')('ledconodel');
const name = 'ledconodel';

// we need fs, to retrieve and write the led status in the led status file
var fs = require('fs');

// load up and define all the stuff for the PI
var runtimeArch = "noPI";

// now setup the GPIO - I do this in a try catch block to overcome the issue
// of debugging on my laptop
try {
	var wpi = require('wiring-pi');
	wpi.setup('wpi');
	wpi.pinMode(configPin, wpi.OUTPUT);
	runtimeArch = "PI";
} catch (err) {
	runtimeArch = "noPI";
	debug('could not load wiring-pi, so I\'m assuming we are not on a PI and this is just a demo run');
	//console.log(err);
}

/*
 * get the status of the led - 1 = on / 0 = off
 */
exports.getLedStatusByColor = function (ledcolor, callback) {
	var statusFile = __base + 'data/'+ledcolor+'_status';
  var isLedOn = 0
  debug('reading status of %s led from config file %s', ledcolor, statusFile);

  try {
   	isLedOn = parseInt(fs.readFileSync(statusFile));
    debug('%s led status is %s', ledcolor, isLedOn);
  } catch (err) {
   	console.log('could not read status file for %s led %s', ledcolor, statusFile)
   	console.log(err);
	};

   return callback(null, isLedOn);
};

/*
 * set the status of the led - 1 = on / 0 = off
 */
var setLedStatusByColor = function (ledcolor, ledonoff, callback) {
	var statusFile = __base + 'data/'+ledcolor+'_status';
  var isLedOn = ledonoff
  debug('reading status of %s led from config file %s', ledcolor, statusFile);

	try {
		fs.writeFile(statusFile, "%s", isLedOn);
    fs.close(statusFile);
	} catch (err) {
		console.log('could not write status file for %s led %s', ledcolor, statusFile);
		console.log(err);
	};

  return callback(null, isLedOn);
};

/*
 * get the config-Pin of the led -
 */
var getLedPinByColor = function (ledcolor, callback) {
	var configData = fs.readFileSync(__base + '/data/config.json'), myConfigObj;

  debug('reading pin of %s led from config file %s', ledcolor, statusFile);

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
	var configPin = parseInt(myConfigObj.ledcolor);

  return callback(null, configPin);
};

/*
 * get the timout for led blinking
 */
var getLedConfigTimeout = function (callback) {
	var configData = fs.readFileSync(__base + '/data/config.json'), myConfigObj;

  debug('reading pin of %s led from config file %s', ledcolor, statusFile);

	try {
		myConfigObj = JSON.parse(configData);
		debug(myConfigObj);
	} catch (err) {
		console.log('There has been an error parsing your JSON.')
		console.log(err);
	}

	var configTimeout = parseInt(myConfigObj.configtimeout);

  return callback(null, configTimeout);
};

/*
 * Available routes:
 *  Method  URL                       Handler
 *  GET     /leds                    leds_controller.index
 *  GET     /leds.format             leds_controller.index
 *  GET     /leds/new                leds_controller.new
 *  GET     /leds/new.format         leds_controller.new
 *  POST    /leds                    leds_controller.create
 *  POST    /leds.format             leds_controller.create
 *  GET     /leds/:id                leds_controller.show
 *  GET     /leds/:id.format         leds_controller.show
 *  GET     /leds/:id/edit           leds_controller.edit
 *  GET     /leds/:id/edit.format    leds_controller.edit
 *  PUT     /leds/:id                leds_controller.update
 *  PUT     /leds/:id.format         leds_controller.update
 *  DELETE  /leds/:id                leds_controller.destroy
 *  DELETE  /leds/:id.format         leds_controller.destroy
 */

/*
 * return all leds including their status
 */
router.get('/' + API_VERSION + '/leds', function(req, res) {


});

/*
 * return a page for the led of color :color
 */
exports.show = router.get('/' + API_VERSION + '/leds/:color/show', function(req, res) {
  var ledcolor = req.query.color;

  res.render('oneled', { title: ledcolor +' LED',
    ledstatus: '%', isLedOn});
});

/*
 * return the index page with all 3 leds
 */
exports.index = router.get('/' + API_VERSION + '/leds/index', function(req, res) {

  res.render('leds', { title: 'LED Controller',
    redStatus: getLedStatusByColor('red'),
		greenStatus: getLedStatusByColor('green'),
		blueStatus: getLedStatusByColor('blue')
	});
});

/*
 * turn led on
 */
exports.on = router.get('/' + API_VERSION + '/leds/:color/on', function(req, res) {
  var ledcolor = req.query.color;
  var isLedOn = 1;
	var configPin = getLedPinByColor(ledcolor, callback);

  if (runtimeArch == "PI") { wpi.digitalWrite(configPin,isLedOn); };
	isLedOn = setLedStatusByColor(ledcolor, callback)
});

/*
 * turn led off
 */
exports.off = router.get('/' + API_VERSION + '/leds/:color/off', function(req, res) {
  var ledcolor = req.query.color;
	var isLedOn = 0;
	var configPin = getLedPinByColor(ledcolor);

  if (runtimeArch == "PI") { wpi.digitalWrite(configPin,isLedOn); };
	isLedOn = setLedStatusByColor(ledcolor, callback)
});

/*
 * blink led
 */
exports.blink = router.get('/' + API_VERSION + '/leds/:color/blink', function(req, res) {
  var ledcolor = req.query.color;
  var isLedOn = 1;
	var configPin = getLedPinByColor(ledcolor);
  var configTimeout = getLedConfigTimeout();

  setInterval(function() {
		isLedOn = +!isLedOn;
		//isLedOn = !isLedOn;
		if (runtimeArch == "PI") { wpi.digitalWrite(configPin, isLedOn ); };
	}, configTimeout);

	isLedOn = setLedStatusByColor(ledcolor, callback)
});

exports.new = router.post('/' + API_VERSION + '/leds/:color', function(req, res) {});
exports.delete = router.post('/' + API_VERSION + '/leds/:color', function(req, res) {});
exports.create = router.post('/' + API_VERSION + '/leds/:color', function(req, res) {});
exports.edit = router.post('/' + API_VERSION + '/leds/:color', function(req, res) {});
exports.destroy = router.post('/' + API_VERSION + '/leds/:color', function(req, res) {});
exports.update = router.post('/' + API_VERSION + '/leds/:color', function(req, res) {});

var exports = module.exports = {};
