// we need this, so we can refer to it in below required led driver modules
global.__base = __dirname + '/';
var globals = require(__base + 'public/javascripts/global.js');
/*
 * shall we output debug logs?
 * if so start the app with:
 *    DEBUG=ledconodel npm start
 * or
 *    DEBUG=ledconodel node app.js
 */
const debug = require('debug')('ledconodel');
const name = 'ledconodel';
debug('initiating %s', name);

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// initiate the express app
var app = express();

// get your controller path. NOTE: resolve to full path
var path = require('path');
var controller_dir = path.resolve('./controllers');

// build your resource routing urls
var routing = require('resource-routing');
routing.resources(app, controller_dir, 'leds', { except: ["delete",
                                                          "create",
                                                          "new",
                                                          "update",
                                                          "edit",
                                                          "destroy"] });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*
 * here are the static defined pages and routes
 */
// the index page
var index = require('./routes/index');
var leds = require('./routes/leds');
//var redled = require('./routes/redledcontroller');
//var greenled = require('./routes/greenledcontroller');
//var blueled = require('./routes/blueledcontroller');

app.use('/', index);
app.use('/leds', leds);
//app.use('/leds/red', redled);
//app.use('/leds/green', greenled);
//app.use('/leds/blue', blueled);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
