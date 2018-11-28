const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression')
//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb://localhost/food';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression());
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SessionKey,
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// =============  Routes ================
const restaurants = require('./routes/restaurants');
const admin = require('./routes/admin');
const users = require('./routes/users');
app.use('/api/restaurants', restaurants);
app.use('/api/admins', admin);
app.use('/api/users', users);


app.get('/', (req, res) => {
  res.send('This is Food App API')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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

app.listen(3001, () =>{
  console.log('App is started')
})
module.exports = app;
