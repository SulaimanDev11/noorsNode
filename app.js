var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
var containerRoutes = require('./routes/containerRoutes');
var auctionRoutes = require('./routes/auctionRoutes');
var orderRoutes = require('./routes/orderRoutes');
var exchangeRoutes = require('./routes/exchangeRoutes');
var fileRoutes = require('./routes/uploadFile');
var carRoutes = require('./routes/carRoutes');
var customerRoutes = require('./routes/customerRoutes');
var accountRoutes = require('./routes/accountRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/noor', usersRouter);
app.use('/noor', containerRoutes);
app.use('/noor', auctionRoutes);
app.use('/noor', orderRoutes);
app.use('/noor', exchangeRoutes);
app.use('/noor', fileRoutes);
app.use('/noor', carRoutes);
app.use('/noor', customerRoutes);
app.use('/noor', accountRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
