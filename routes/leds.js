var express = require('express');
var router = express.Router();

/* GET LED Controller page. */
router.get('/leds', function(req, res, next) {
  res.render('leds', { title: 'LED Controller' });
});

module.exports = router;
