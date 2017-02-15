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
 * we need some timers to have the leds blink
 */
//var sleep = require('system-sleep');


/*
 * require rpio2 node module to drive GPIO pins and use hardware pin numbering
 */
const Gpio = require('rpio2').Gpio;
var options = {
  gpiomem: true,          /* Use /dev/gpiomem */
  mapping: 'physical',    /* Use the P1-P40 numbering scheme */
}

/*
 * set the pins for the 3 leds as a new instance of Gpio
							HW --> BCM --> WiringPI
		redled		33 --> 13  --> 23
		greenled	35 --> 19  --> 24
		blueled		37 --> 26  --> 25
*/
const redled = new Gpio(33);
const greenled = new Gpio(35);
const blueled = new Gpio(37);

var isRedLedOn = 0;
var isGreenLedOn = 0;
var isBlueLedOn = 0;

/*
 * function to turn off an led
 */
function turnOffLed(led) {
  led.open(Gpio.OUTPUT, Gpio.LOW)
}

/*
 * Set the initial state to low.  The state is set prior to the pin becoming
 * active, so is safe for devices which require a stable setup.
 */
turnOffLed(redled);
turnOffLed(greenled);
turnOffLed(blueled);
//greenled.open(Gpio.OUTPUT, Gpio.LOW);
//redled.open(Gpio.OUTPUT, Gpio.LOW);
//blueled.open(Gpio.OUTPUT, Gpio.LOW);


setInterval(function(configPin, isLedOn) {
  isLedOn = +!isLedOn;
	//isLedOn = !isLedOn;
	wpi.digitalWrite(configPin, isLedOn );
}, configTimeout);


setInterval(redled,isRedLedOn)

debug('closing GPIO');
turnOffLed(redled);
turnOffLed(greenled);
turnOffLed(blueled);

redled.close();
greenled.close();
blueled.close();
debug('shutdown!');
process.exit(0);


process.on("SIGINT", function(){
  redled.close();
  greenled.close();
  blueled.close();
  debug('shutdown!');
  process.exit(0);
});
