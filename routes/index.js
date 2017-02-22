var express = require('express');
var router = express.Router();

/*
 * shall we output debug logs?
 * if so start the app with:
 *    DEBUG=ledconodel node app.js
 */
const debug = require('debug')('ledconodel');
const name = 'ledconodel';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'LED Controller' });
});

module.exports = router;
