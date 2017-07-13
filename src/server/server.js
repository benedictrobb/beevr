'use strict';
const Hapi = require('hapi');
const _ = require('lodash');
const pkg = require('../../package.json');
const inert = require('inert');
const blipp = require('blipp');
const cookieAuth = require('hapi-auth-cookie');
const fs = require('fs');
const env = require('env2');
const data = require('../../database/database_queries.js');
env('./config.env');

const server = new Hapi.Server();

const PORT = process.env.PORT || 4000;

server.connection({
    port: PORT
    /*tls: process.env.NODE_ENV !== 'production' && {
      key: fs.readFileSync('./keys/key.pem'),
      cert: fs.readFileSync('./keys/cert.pem'),
  },
  state: {
  isSameSite: 'Lax',
  },*/
});

const plugins = [inert, blipp, cookieAuth];

server.register(plugins, err => {
    if (err) throw err;

    console.log('=> Registered plugins:', {
        plugins: _.keysIn(server.registrations).join(', ')
    });

    const cookieAuthOptions = {
        password: process.env.COOKIE_PASSWORD,
        cookie: 'logged-in',
        isSecure: false,
        ttl: 24 * 60 * 60 * 1000
    };

    server.auth.strategy('session', 'cookie', 'optional', cookieAuthOptions);

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: './public',
                listing: false,
                index: true
            }
        }
    });

    // serve up some data from the database
    server.route({
        method: 'GET',
        path: '/api/jobs',
        handler: (request, reply) => {
            data.getJobs(request.url.query.term, (err, res) => {
                if (err)
                    console.error(`
                    Failed to retrieve data from the database.
                    Aborting`);
                reply({
                    name: 'jobsList',
                    message: 'Welcome to BEEVR!',
                    jobsList: res
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/api',
        handler: (request, reply) => {
            reply({
                name: pkg.name,
                version: pkg.version,
                message: 'Welcome to BEEVR!'
            });
        }
    });

    server.start(err => {
        if (err) {
            throw err;
        }

        console.log(`=> BEEVR Server running at: ${server.info.uri}`);
    });
});

module.exports = server;
