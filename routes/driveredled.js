var express = require('express');
var router = express.Router();
var led = require('../public/javascripts/driveredled');

/* GET Red LED page. */
router.get('/', function(req, res, next) {
  res.render('oneled', { title: 'Red LED' });
});


// base path is already set as being /leds/{color}
router.post('/on', function(req, res) {
  led.turnledon();
});

// base path is already set as being /leds/{color}
router.post('/off', function(req, res) {
  led.turnledoff();
});

// base path is already set as being /leds/{color}
router.post('/blink', function(req, res) {
  led.blinkled();
});

module.exports = router;
