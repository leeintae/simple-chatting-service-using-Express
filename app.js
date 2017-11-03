var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.io = require('socket.io')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

var client_number = 0;

app.io.on('connection', function(socket){
  socket.name = "cli" + client_number++;

  app.io.emit('add_client', "-----" + socket.name + " connected");

  console.log(socket.name + " connected");

  socket.on('new_message', function(msg){
    console.log("msg from " + socket.name + " : " + msg);
    app.io.emit('message', "[" + socket.name + "] : " + msg);
  });

  socket.on('disconnect', function(){
    console.log(socket.name + " disconnected");
    app.io.emit('remove_client', "-----" + socket.name + " disconnected");
  });
});

module.exports = app;
