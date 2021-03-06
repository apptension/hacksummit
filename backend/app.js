var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var epilogue = require('epilogue');

var models = require('./models'),
  config = require('config');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var logout = require('./routes/logout');
var user = require('./routes/user');
var userEvaluation = require('./routes/userEvaluation');
var evaluation = require('./routes/evaluation');
var stat = require('./routes/stat');

var assoMiddleware = require('./middleware/associationFactory');

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
var sessionOptions = {
  secret: config.get('sessionSecret'),
  resave: false,
  saveUninitialized: false
};
if (app.get('env') === 'production') {
  sessionOptions.store = new RedisStore(config.get('redis'));
}
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);
app.use('/api/user/me', user);
app.use('/api/user/login', login);
app.use('/api/user/logout', logout);
app.use('/api/stat', stat);

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: models.sequelize
});

// Create REST resources
var usersResource = epilogue.resource({
  model: models.User,
  include     : [models.Role],
  endpoints: ['/api/user', '/api/user/:id']
});

usersResource.use(assoMiddleware({
  associations: [{
    associatedModel: models.Role,
    attribute: 'Roles',
    setMethod: 'setRoles'
  }]
}));

var projectsResource = epilogue.resource({
  model: models.Project,
  include     : [models.User],
  endpoints: ['/api/project', '/api/project/:id']
});

projectsResource.use(assoMiddleware({
  associations: [{
    associatedModel: models.User,
    attribute: 'Users',
    setMethod: 'setUsers'
  }]
}));

var skillsResource = epilogue.resource({
  model: models.Skill,
  endpoints: ['/api/skill', '/api/skill/:id']
});

var rolesResource = epilogue.resource({
  model: models.Role,
  include     : [models.Skill],
  endpoints: ['/api/role', '/api/role/:id']
});

rolesResource.use(assoMiddleware({
  associations: [{
    associatedModel: models.Skill,
    attribute: 'Skills',
    setMethod: 'setSkills'
  }]
}));

var evaluationsResource = epilogue.resource({
  model: models.Evaluation,
  endpoints: ['/api/evaluation'],
  actions: ['list']
});

app.use('/api/user', userEvaluation);
app.use('/api/evaluation', evaluation);

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
