var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/led', function(req, res, next) {
  res.render('led', { title: 'LED Controller' });
});

module.exports = router;
