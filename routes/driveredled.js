var express = require('express');
var router = express.Router();
var led = require('../public/javascripts/driveredled');

/* GET Red LED page.
router.get('/', function(req, res, next) {
  res.render('redled', { title: 'Red LED' });
});
*/

router.post('redledon', function(req, res) {
  led.turnledon();
});

router.post('redledoff', function(req, res) {
  led.turnledoff();
});

router.post('redledblink', function(req, res) {
  led.blinkled();
});

module.exports = router;
