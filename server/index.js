'use strict';
const Hapi = require('hapi');
const _ = require('lodash');
const pkg = require('../package.json');
const inert = require('inert');
const blipp = require('blipp');
const cookieAuth = require('hapi-auth-cookie');
const fs = require('fs');
const env = require('env2');
<<<<<<< HEAD
const data = require('./database/database_queries.js');
const sendEmail = require('./lib/sendEmail.js');
=======
const data = require('./database/db_queries.js');
>>>>>>> master
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
            data.getJobs((err, res) => {
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
            }, request.url.query.term);
<<<<<<< HEAD
=======
        }
    });

    server.route({
        method: 'GET',
        path: '/api/students',
        handler: (request, reply) => {
            data.getStudents((err, res) => {
                if (err) {
                    reply.status(500)(
                        'Failed to connect load data from the database'
                    );
                } else {
                    reply({
                        name: 'studentList',
                        message: 'Welcome to BEEVR!',
                        studentList: res
                    });
                }
            }, request.url.query.searchTerm);
>>>>>>> master
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
        path: '/api/apply',
        handler: (request, reply) => {
            var to = ['rmrajaa@gmail.com'];
            var from = 'maja.kudlicka@gmail.com';
            var subject = 'New job application';
            var text =
                'Someone has applied for the job you posted. Go to your profile to find out more.';

            sendEmail(from, to, subject, text, (err, res) => {
                if (err) {
                    reply('Failed to send email').code(500);
                } else {
                    reply({
                        message: 'Email sent!'
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
