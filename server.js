// Fetch the site configuration
var siteConf = require('./lib/getConfig');

process.title = siteConf.uri.replace(/http:\/\/(www)?/, '');

process.addListener('uncaughtException', function(err, stack) {
  console.log('Caught exception: ' + err + '\n' + err.stack);
  console.log('\u0007'); // Terminal bell
});

var connect = require('connect');
var express = require('express');
var DummyHelper = require('./lib/dummy-helper');

var app = module.exports = express();
app.listen(siteConf.port, null);

// Settings
app.configure(function() {
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
});

// Middleware
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.logger({
    format: ':response-time ms - :date - :req[x-real-ip] - :method :url :user-agent / :referrer'
  }));
  app.use(express.static(__dirname + '/public', {
    maxAge: 86400000
  }));
});

// ENV based configuration

// Show all errors and keep search engines out using robots.txt
app.configure('development', function() {
  app.use(express.errorHandler({
    'dumpExceptions': true,
    'showStack': true
  }));
  app.all('/robots.txt', function(req, res) {
    res.send('User-agent: *\nDisallow: /', {
      'Content-Type': 'text/plain'
    });
  });
});
// Suppress errors, allow all search engines
app.configure('production', function() {
  app.use(express.errorHandler());
  app.all('/robots.txt', function(req, res) {
    res.send('User-agent: *', {
      'Content-Type': 'text/plain'
    });
  });
});

// Error handling
app.use(function(err, req, res, next) {
  console.log(err);

  if (err instanceof NotFound) {
    res.render('errors/404');
  } else {
    res.render('errors/500');
  }
});

function NotFound(msg) {
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}

// Initiate this after all other routing is done, otherwise wildcard will go crazy.
var dummyHelpers = new DummyHelper(app);

// If all fails, hit em with the 404
app.all('*', function(req, res) {
  throw new NotFound();
});

console.log('Running in ' + (process.env.NODE_ENV || 'development') + ' mode @ ' + siteConf.uri);
