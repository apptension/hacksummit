var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var session = require('express-session');
var epilogue = require('epilogue');

var models = require('./models'),
  config = require('config');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var user = require('./routes/user');

var app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config.get('sessionSecret'),
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);
app.use('/user', user);
app.use('/user/login', login);

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: models.sequelize
});

// Create REST resources
var usersResource = epilogue.resource({
  model: models.User,
  endpoints: ['/api/users']
});

var projectsResource = epilogue.resource({
  model: models.Project,
  endpoints: ['/api/projects', '/api/projects/:id']
});

var skillsResource = epilogue.resource({
  model: models.Skill,
  endpoints: ['/api/skills', '/api/skills/:id']
});

var skillsetsResource = epilogue.resource({
  model: models.Skill,
  endpoints: ['/api/skillsets', '/api/skillsets/:id']
});

var rolesResource = epilogue.resource({
  model: models.Role,
  endpoints: ['/api/roles', '/api/roles/:id']
});

var ForbiddenError = epilogue.Errors.ForbiddenError;

[usersResource, projectsResource, skillsResource, skillsetsResource, rolesResource].map(function(res) {
  res.list.fetch.before(function(req, res, context) {
    return passport.authenticate('token', function(err, user, info) {
      if (err) {
        res.status(500);
        return context.stop();
      }
    
      if (user) {
        context.continue();
      } else {
        context.error(new ForbiddenError());
      }
    })(req, res, context);
  });
});

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
    res.render('error', {
      message: err.message,
      error: err
    });
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
