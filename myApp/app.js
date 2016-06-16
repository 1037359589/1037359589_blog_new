var express = require('express');
var ejs = require('ejs');
var path = require('path');
var parseurl = require('parseurl')
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require("express-session");
var mongoose=require("./config/mongoose.js");
//var RedisStore = require('connect-redis')(session);

var db=mongoose();

var admin = require('./routes/admin');
var blog = require('./routes/blog');
var test = require('./routes/test');
var test2 = require('./routes/test2');
//var account_add_api = require('./server.api/account_add_api');
//var send_code_api = require('./server.api/send_code_api');
//var uploads=require('./server_api/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/admin2016pp",express.static(path.join(__dirname, 'public/Admin2016pp')));
app.use("/blog",express.static(path.join(__dirname, 'public/Blog')));
app.use("/admin2016pp/build",express.static(path.join(__dirname, 'public/build')));
app.use("/blog/build",express.static(path.join(__dirname, 'public/build')));
app.use(cookieParser('user'));
app.use(favicon());
//app.use(session({
//  secret: 'keyboard cat',
//  key: 'sid',
//  cookie: { secure: false },
//  saveUninitialized: true,
//  resave: false,
//}));


//app.use(cookieParser());
app.use(session({
  secret: '12345',
  name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true,
}));




app.use('/admin2016pp', admin);
app.use('/blog', blog);
app.use("/test",test);
app.use("/test2",test2);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    //res.render('error', {
    //  message: err.message,
    //  error: err
    //});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
