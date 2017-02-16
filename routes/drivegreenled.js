var express = require('express');
var router = express.Router();
var led = require('../public/javascripts/drivegreenled');

/* GET Red LED page.
router.get('/', function(req, res, next) {
  res.render('redled', { title: 'Red LED' });
});
*/

router.post('greenledon', function(req, res) {
  led.turnledon();
});

router.post('greenledoff', function(req, res) {
  led.turnledoff();
});

router.post('greenledblink', function(req, res) {
  led.blinkled();
});

module.exports = router;
