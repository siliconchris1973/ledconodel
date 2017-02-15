var express = require('express');
var router = express.Router();

var greenled = require('../public/javascript/greenled.js');

/* GET LED Controller page. */
router.get('/', function(req, res, next) {
  res.render('leds', { title: 'LED Controller' });
});

module.exports = router;
