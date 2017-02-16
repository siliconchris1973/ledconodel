var express = require('express');
var router = express.Router();
var led = require('../public/javascripts/driveredled');

/* GET Red LED page.
router.get('/', function(req, res, next) {
  res.render('redled', { title: 'Red LED' });
});
*/

router.post('/on', function(req, res) {
  led.turnledon();
});

router.post('/off', function(req, res) {
  led.turnledoff();
});

router.post('/blink', function(req, res) {
  led.blinkled();
});

module.exports = router;
