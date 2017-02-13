var exports = module.exports = {};

/*
 * shall we output debug logs?
 * if so start the app with:
 *    DEBUG=ledconodel node app.js
 */
const debug = require('debug')('ledconodel');
const name = 'ledconodel';
debug('booting %s', name);

/*
 * require rpio2 node module to drive GPIO pins and use hardware pin numbering
 */
const Gpio = require('rpio2').Gpio;
var options = {
  gpiomem: true,          /* Use /dev/gpiomem */
  mapping: 'physical',    /* Use the P1-P40 numbering scheme */
}

/*
 * set the hardware pins for the 3 leds as a new instance of Gpio
 */
const greenled = new Gpio(19);
const redled = new Gpio(13);
const blueled = new Gpio(26);

/*
 * Set the initial state to low.  The state is set prior to the pin becoming
 * active, so is safe for devices which require a stable setup.
 */
greenled.open(Gpio.OUTPUT, Gpio.LOW);
redled.open(Gpio.OUTPUT, Gpio.LOW);
blueled.open(Gpio.OUTPUT, Gpio.LOW);


/*
 * include the adafruit.io client library to watch the feed
 */
//require xxx as adaio

/*
 * the name of the Adafruit.io feed we want to watch
 */
var feedname = "ledfeeder";



/*
 * the blinker function will get calls with the GPIO object of the pin,
 * how many times to blink the led and how long the led shall be turned on
 */
function blinkled(ledToBlink, howManyTimes=5, interval=500) {
  debug('blinkled called, payload is %s howManyTimes is %s and interval is %s', ledToBlink, howManyTimes, interval);
	if (ledToBlink == "red") {
    for (var i=0; i<howManyTimes; i++) {
      debug('red on');
      redled.open(Gpio.OUTPUT, Gpio.HIGH);
      redled.sleep(interval);
      debug('red off');
		  redled.open(Gpio.OUTPUT, Gpio.LOW);
    }
	} else if (ledToBlink == "green") {
    for (var i=0; i<howManyTimes; i++) {
      debug('green on');
      greenled.open(Gpio.OUTPUT, Gpio.HIGH);
      greenled.sleep(interval);
      debug('green off');
		  greenled.open(Gpio.OUTPUT, Gpio.LOW);
    }
	} else if (ledToBlink == "blue") {
    for (var i=0; i<howManyTimes; i++) {
      debug('blue on');
      blueled.open(Gpio.OUTPUT, Gpio.HIGH);
      blueled.sleep(interval);
      debug('blue off');
		  blueled.open(Gpio.OUTPUT, Gpio.LOW);
    }
	} else {
		debug('unrecognized payload %s', ledToBlink);
	}
}

/*
 * the main watcher function - need to do this asynchronously
 */
function watchfeed(){
  blinkled("red",5,1000);
  blinkled("green",5,1000);
  blinkled("blue",5,1000);
}

watchfeed();
debug('closing GPIO');
redled.close();
greenled.close();
blueled.close();
debug('shutdown!');
process.exit(0);

/*
process.on("SIGINT", function(){
  redled.close();
  greenled.close();
  blueled.close();
  debug('shutdown!');
  process.exit(0);
});
*/
