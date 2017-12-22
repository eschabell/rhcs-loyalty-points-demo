var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//routes
var index = require('./routes/index');
var events = require('./routes/events');

//var app = express();
var app = require('express')();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client/dist')); // redirect socket
app.use('/',index);
app.use('/events',events);

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

//start socket server instance
/*
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001, function(){
    console.log('Express server listening on port '+ 3001);
});
io.on('connection', function(socket){
  console.log(' >> connected by client ');
  io.emit('gotMessage', {msg: 'new client connected'});
});//io.on
*/
module.exports = app;
