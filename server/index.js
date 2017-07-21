'use strict';
const Hapi = require('hapi');
const _ = require('lodash');
const pkg = require('../package.json');
const inert = require('inert');
const blipp = require('blipp');
const cookieAuth = require('hapi-auth-cookie');
const fs = require('fs');
const env = require('env2');
const data = require('./database/database_queries.js');
env('./config.env');

const server = new Hapi.Server();

const PORT = process.env.PORT || 4000;

server.connection({
    port: PORT
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
                path: './react-ui/build',
                listing: false,
                index: true
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/api/jobs',
        handler: (request, reply) => {
            data.getJobs(
                (err, res) => {
                    if (err)
                        reply.status(500)(
                            'Failed to connect load data from the database'
                        );
                    else {
                        reply({
                            name: 'jobsList',
                            message: 'Welcome to BEEVR!',
                            jobsList: res
                        });
                    }
                },
                request.url.query.term
            );
        }
    });

    server.route({
        method: 'POST',
        path: '/api/jobs',
        handler: (request, reply) => {
            data.postJobs(request.payload, (err, res) => {
                if (err) {
                    reply.status(500)(
                        'Failed to connect load data from the database'
                    );
                } else {
                    reply({
                        name: 'newJob',
                        message: 'Welcome to BEEVR!',
                        newJob: res
                    });
                }
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/api/random_jobs',
        handler: (request, reply) => {
            data.getRandomJobs((err, res) => {
                if (err)
                    reply.status(500)(
                        'Failed to connect load data from the database'
                    );
                else {
                    reply({
                        name: 'jobsList',
                        message: 'Welcome to BEEVR!',
                        jobsList: res
                    });
                }
            });
        }
    });
    
    server.route({
        method: 'POST',
        path: '/api/reg-student',
        handler: (request, reply) => {
            console.log(request.payload);
            data.postStudents(request.payload, (err, res) => {
                if (err) {
                    reply(
                        'Failed to connect load data from the database'
                    ).code(500);
                }
                else {
                    reply({
                        name: 'student',
                        student: res
                    });
                }
            });
        }
    });

    server.route({
        method: 'POST',
        path: '/api/reg-resident',
        handler: (request, reply) => {
            console.log(request.payload);
            data.postResidents(request.payload, (err, res) => {
                if (err) {
                    reply(
                        'Failed to connect load data from the database'
                    ).code(500);
                }
                else {
                    reply({
                        name: 'resident',
                        resident: res
                    });
                }
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
