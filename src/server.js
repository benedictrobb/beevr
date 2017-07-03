const hapi = require('hapi');
// const inert = require('inert');
// const vision = require('vision');
// const handlebars = require('./handlebars');
const CookieAuth = require('hapi-auth-cookie');
const routes = require('./routes/index.js');

const port = process.env.PORT || 3000;

const server = new hapi.Server();

server.connection({
  port,
});

server.register(CookieAuth, (err) => {
  if (err) throw err;

  // server.views(handlebars);
  server.route(routes);
});

const options = {
  password: 'datagangrulesokdatagangrulesokdatagangrulesok',
  cookie: 'beevrcookie',
  isSameSite: false,
  isSecure: false,
  ttl: 3 * 60 * 10000,
};

server.auth.strategy('base', 'cookie', 'optional', options);


module.exports = server;
