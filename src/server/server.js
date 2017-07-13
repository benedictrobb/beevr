'use strict';
const Hapi = require('hapi');
const _ = require('lodash');
const pkg = require('../../package.json');
const inert = require('inert');
const blipp = require('blipp');
const cookieAuth = require('hapi-auth-cookie');
const fs = require('fs');
const path = require('path');
const env = require('env2');
env('./config.env');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, '..', '..', 'public')
            }
        }
    }
});

const PORT = process.env.PORT || 4000;

const dbconnection = require('../../database/db_connection.js');
const jobsQuery = `SELECT * FROM jobs WHERE CATEGORY = 'dog walking' AND end_date < NOW() ORDER BY start_date;`;

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
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/api/jobs',
        handler: (request, reply) => {
            dbconnection.query(jobsQuery, (err, res) => {
                if (err) { console.error(`
                replyFailed to retrieve data from the database.
                        Aborting`);
                    reply(err.message);
                }
                else reply({
                    name: 'jobsList',
                    message: 'Welcome to BEEVR!',
                    jobsList: res.rows
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
