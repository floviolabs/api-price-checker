var cors = require('cors');
var logger = require('morgan');
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
var path = require('path');
var indexRoute = require('./routes/index');
var createError = require('http-errors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: '*',
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'))

app.get('/', (req, res) => {
  // res.status(200).send('Hallo');
  // Default backend api page
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/static', express.static(path.join(__dirname, 'public')))
app.use('/api/sharing-file', express.static(path.join(__dirname, 'public/sharing-file')))
app.use('/api/v1', indexRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.sendFile(path.join(__dirname, 'notfound.html'));
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
