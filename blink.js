/*
 * shall we output debug logs?
 * if so start the app with:
 *    DEBUG=ledconodel node app.js
 */
const debug = require('debug')('ledconodel');
const name = 'ledconodel';
debug('booting %s', name);

/*
 *
 */
//var rpio = require('rpio2');
const Gpio = require('../lib/index.js').Gpio;

var options = {
  gpiomem: true,          /* Use /dev/gpiomem */
  mapping: 'physical',    /* Use the P1-P40 numbering scheme */
}

/*
 * include the adafruit.io client library to watch the feed
 */
//require xxx as adaio

/*
 * set the hardware pins for the 3 leds as a new instance of Gpio
 */
const greenled = new Gpio(19);
const redled = new Gpio(13);
const blueled = new Gpio(26);

/*
 * Set the initial state to low.  The state is set prior to the pin becoming
 * active, so is safe for devices which require a stable setup.

rpio.open(greenled, rpio.OUTPUT, rpio.LOW);
rpio.open(redled, rpio.OUTPUT, rpio.LOW);
rpio.open(blueled, rpio.OUTPUT, rpio.LOW);
 */
greenled.open(Gpio.OUTPUT, Gpio.LOW);
redled.open(Gpio.OUTPUT, Gpio.LOW);
blueled.open(Gpio.OUTPUT, Gpio.LOW);


/*
 * last state of the leds
 * in case we blink, this will stop the blinking
 * in case the leds are on, this will turn off the leds
 * in case leds are off and command is blink then blink they will
 * in case leds are off and command is trigger then on they will go
 */
var greenon = false;
var redon = false;
var blueon = false;

/*
 * the name of the Adafruit.io feed we want to watch
 */
var feedname = "ledfeeder";

/*
 * The sleep functions block, but rarely in these simple programs does one care
 * about that.  Use a setInterval()/setTimeout() loop instead if it matters.
 */
 void function blinkled(led, interval) {
   Promise.resolve(led.toggle())
    .then(led.sleep.bind(null, interval, true))
    .then(loop)
}();

/*
 * the main watcher function - need to do this asynchronously
 */
void function watchfeed(data) {
	if (data == "red") {
		if (redon) {
			//rpio.open(redled, rpio.OUTPUT, rpio.LOW);
      redled.open(Gpio.OUTPUT, Gpio.LOW);
		} else {
			blinkLed(redled,500);
		}
		redon != redon;
	} else if (data == "green") {
		if (greenon) {
			//rpio.open(greenled, rpio.OUTPUT, rpio.LOW);
      greenled.open(Gpio.OUTPUT, Gpio.LOW);
		} else {
			blinkLed(greenled,500);
		}
		greenon != greenon;
	} else if (data == "blue") {
		if (blueon) {
			//rpio.open(blueled, rpio.OUTPUT, rpio.LOW);
      blueled.open(Gpio.OUTPUT, Gpio.LOW);
		} else {
			blinkLed(blueled,500);
		}
		blueon != blueon;
	} else {
		debug('unrecognized payload %s', data);
	}
} ();

debug('red blinking');
watchfeed("red");
debug('green blinking');
watchfeed("green");
debug('blue blinking');
watchfeed("blue");
debug('purple blinking');
watchfeed("purple");

process.on("SIGINT", function(){
  redled.close();
  greenled.close();
  blueled.close();
  debug('shutdown!');
  process.exit(0);
});
