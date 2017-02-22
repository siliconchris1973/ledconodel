var express = require('express');
var router = express.Router();

var myLeds = require(__base + 'controllers/leds_controller.js');

/*
 * shall we output debug logs?
 * if so start the app with:
 *    DEBUG=ledconodel node app.js
 */
const debug = require('debug')('ledconodel');
const name = 'ledconodel';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('leds', { title: 'Led Controller',
    redStatus: myLeds.getLedStatusByColor('red'),
    greenStatus: myLeds.getLedStatusByColor('green'),
    blueStatus: myLeds.getLedStatusByColor('blue')
  });
});

module.exports = router;
