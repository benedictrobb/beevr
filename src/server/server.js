'use strict';
const Hapi = require('hapi');
const _ = require('lodash');
const pkg = require('../../package.json');
const inert = require('inert');
const blipp = require('blipp');
const cookieAuth = require('hapi-auth-cookie');
const hapiAuth = require('hapi-auth-basic');
const credentials = require('hapi-context-credentials');
const fs = require('fs');
const env = require('env2');
env('./config.env');

const server = new Hapi.Server();

const PORT = process.env.PORT || 4000;

server.connection({
    port: PORT,
    /*tls: process.env.NODE_ENV !== 'production' && {
        key: fs.readFileSync('./keys/key.pem'),
        cert: fs.readFileSync('./keys/cert.pem'),
    },
    state: {
    isSameSite: 'Lax',
    },*/
});

const plugins = [inert, blipp, hapiAuth, cookieAuth, credentials];
    
server.register(plugins, (err) => {
    if (err) throw err;
            
    console.log('=> Registered plugins:', {
        plugins: _.keysIn(server.registrations).join(', ')
    });
    
    const cookieAuthOptions = {
        password: process.env.COOKIE_PASSWORD,
        cookie: 'logged-in',
        isSecure: false,
        ttl: 24 * 60 * 60 * 1000,
    };

    server.auth.strategy('base', 'cookie', 'required', 'cookieAuthOptions');

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

    // serve up some sample JSON data
    server.route({
        method: 'GET',
        path: '/info',
        handler: (request, reply) => {
            reply({
                name: pkg.name,
                version: pkg.version,
                message: 'Welcome to BEEVR!'
            });
        }
    });
    
    server.route({
        method: 'GET',
        path: '/fuck',
        handler: (request, reply) => {
            reply({
                name: pkg.name,
                version: pkg.version,
                message: 'Welcome to BEEVR Maja!'
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
