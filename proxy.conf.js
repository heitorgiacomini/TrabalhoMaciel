const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:8000/',
    secure: true,
    logLevel: 'debug',

  }
];

module.exports = PROXY_CONFIG;
