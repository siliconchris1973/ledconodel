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
 * the main watcher function - need to do this asynchronously
 */
function watchfeed(data, howmanytimes) {
  debug('watchfeed called, payload is %s and number is %i', data, howmanytimes);
	if (data == "red") {
    for (int 1=0; i<howmanytimes-1; i++) {
      debug('red on');
      redled.open(Gpio.OUTPUT, Gpio.HIGH);
      redled.sleep(500);
      debug('red off');
		  redled.open(Gpio.OUTPUT, Gpio.LOW);
    }
	} else if (data == "green") {
    for (int 1=0; i<howmanytimes-1; i++) {
      debug('green on');
      greenled.open(Gpio.OUTPUT, Gpio.HIGH);
      greenled.sleep(500);
      debug('green off');
		  greenled.open(Gpio.OUTPUT, Gpio.LOW);
    }
	} else if (data == "blue") {
    for (int 1=0; i<howmanytimes-1; i++) {
      debug('blue on');
      blueled.open(Gpio.OUTPUT, Gpio.HIGH);
      blueled.sleep(500);
      debug('blue off');
		  blueled.open(Gpio.OUTPUT, Gpio.LOW);
    }
	} else {
		debug('unrecognized payload %s', data);
	}
}


watchfeed("red",5);
watchfeed("green",5);
watchfeed("blue",5);
debug('purple led is wrong');
watchfeed("purple",5);

debug('cloding GPIO');
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
