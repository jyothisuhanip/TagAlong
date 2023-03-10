var createError = require('http-errors');
var express = require('express');
require('dotenv').config()
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var propertyRouter = require('./routes/PropertyRouter');
var reservationRouter = require('./routes/ReservationRouter');
var categoryRouter = require('./routes/CategoryRouter');
var ratingsRouter = require('./routes/ratings');

var app = express();
app.disable('etag');

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST, DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static('uploads'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/properties', propertyRouter);
app.use('/reservations', reservationRouter);
app.use('/categories', categoryRouter);
app.use('/ratings', ratingsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
