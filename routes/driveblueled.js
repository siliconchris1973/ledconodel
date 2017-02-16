var express = require('express');
var router = express.Router();
var led = require('../public/javascripts/driveblueled');

/* GET Red LED page. */
router.get('/', function(req, res, next) {
  res.render('oneled', { title: 'Blue LED' });
});


// base path is already set as being /leds/{color}
router.get('/on', function(req, res, next) {
  led.turnledon();
});

// base path is already set as being /leds/{color}
router.get('/off', function(req, res, next) {
  led.turnledoff();
});

// base path is already set as being /leds/{color}
router.get('/blink', function(req, res, next) {
  led.blinkled();
});

module.exports = router;
