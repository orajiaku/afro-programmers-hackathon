var express = require('express');

var globals = require('./globals') 
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var store = require(globals.vars.store);
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app) 
var io = require('socket.io')(server) 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


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

// modules to initialize on Server startup


// modules to export
module.exports.app = app;
module.exports.io = io; 


server.listen(globals.vars.port, function (err) {
	if (err) {
		console.log(err);
	}else{
		console.log('Listening on port 7012');
	};
})
