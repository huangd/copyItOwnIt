var settings = {
  'sessionSecret': 'sessionSecret',
  'port': 8080,
  'uri': 'http://localhost:8080', // Without trailing /
  'debug': (process.env.NODE_ENV !== 'production')
};

if (process.env.NODE_ENV == 'production') {
  settings.uri = 'http://yourname.no.de';
  settings.port = process.env.PORT || 80; // Joyent SmartMachine uses process.env.PORT
}
module.exports = settings;
