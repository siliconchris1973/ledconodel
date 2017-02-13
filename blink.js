/*
 * 
 */
var rpio = require('rpio');

var options = {
        gpiomem: true,          /* Use /dev/gpiomem */
        mapping: 'physical',    /* Use the P1-P40 numbering scheme */
}

/*
 * include the adafruit.io client library to watch the feed
 */
//require xxx as adaio

/*
 * the hardware pins for the leds
 */
var greenled = 19;
var redled = 13;
var blueled = 26;

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
 * Set the initial state to low.  The state is set prior to the pin becoming
 * active, so is safe for devices which require a stable setup.
 */
rpio.open(greenled, rpio.OUTPUT, rpio.LOW);
rpio.open(redled, rpio.OUTPUT, rpio.LOW);
rpio.open(blueled, rpio.OUTPUT, rpio.LOW);

/*
 * The sleep functions block, but rarely in these simple programs does one care
 * about that.  Use a setInterval()/setTimeout() loop instead if it matters.
 */
function blinkLed(blinkpin, blinkcount) {
	for (var i = 0; i < blinkcount-1; i++) {
    /* On for 1 second */
    rpio.write(blinkpin, rpio.HIGH);
    rpio.sleep(1);

	  /* Off for half a second (500ms) */
	  rpio.write(blinkpin, rpio.LOW);
	  rpio.msleep(500);
	}
}

function watchfeed() {
	if (data == "red") {
		if (redon) {
			rpio.open(redled, rpio.OUTPUT, rpio.LOW);
		} else {
			blinkLed(redled,5);
		}
		redon != redon;
	} elseif (data == "green") {
		if (greenon) {
			rpio.open(greenled, rpio.OUTPUT, rpio.LOW);
		} else {
			blinkLed(greenled,5);
		}
		greenon != greenon;
	} elseif (data == "blue") {
		if (blueon) {
			rpio.open(blueled, rpio.OUTPUT, rpio.LOW);
		} else {
			blinkLed(blueled,5);
		}
		blueon != blueon;
	}

}
