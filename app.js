/**
 * Module dependencies.
 */
var http = require('http');
var path = require('path');

var express = require('express');
var passport =  require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes');
var user = require('./routes/user');

var app = express();

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      return done(null, {name: "Di"});
    });
  }
));

// all environments
app.engine('html', require('ejs').renderFile);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(process.env.SECRET || ''));
app.use(express.session());
app.use(passport.initialize());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/user', user.user);
app.get('/user/posts', user.posts);

app.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
