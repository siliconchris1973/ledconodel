var express = require('express');
var router = express.Router();

ledcolor = app.get('/p', function(req, res) {
  res.send("led is set to " + req.query.led);
});

var statusFile = __base + '/data/'+ledcolor+'_status';
var isLedOn = 0
try {
	isLedOn = parseInt(fs.readFileSync(statusFile));
} catch (err) {
	console.log('could not read status file for %s led %s', ledcolor, statusFile)
	console.log(err);
}

// GET /p?tagId=5
// tagId is set to 5

/* GET LED Controller page. */
router.get('/', function(req, res, next) {
  res.render('oneled', {
    title: '%s LED Controller', ledcolor,
    ledstatus: '%s', isLedOn,
    ledcolor: '%s', ledcolor
  });
});

module.exports = router;
