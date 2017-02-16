var express = require('express');
var router = express.Router();
var led = require('../public/javascripts/driveblueled');

/* GET Red LED page.
router.get('/', function(req, res, next) {
  res.render('redled', { title: 'Red LED' });
});
*/

router.post('blueledon', function(req, res) {
  led.turnledon();
});

router.post('blueledoff', function(req, res) {
  led.turnledoff();
});

router.post('blueledblink', function(req, res) {
  led.blinkled();
});

module.exports = router;
