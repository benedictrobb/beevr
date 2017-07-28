'use strict';
const Hapi = require('hapi');
const Boom = require('boom');
const _ = require('lodash');
const pkg = require('../package.json');
const inert = require('inert');
const blipp = require('blipp');
const cookieAuth = require('hapi-auth-cookie');
const {hashPassword, comparePassword} = require('./bcrypt.js');
const fs = require('fs');
const data = require('./database/db_queries.js');
const sendEmail = require('./lib/sendEmail.js');
const env = require('env2');
env('./config.env');

const server = new Hapi.Server();

const PORT = process.env.PORT || 4000;

server.connection({
    port: PORT,
});

const plugins = [inert, blipp, cookieAuth];

server.register(plugins, err => {
    if (err) throw err;

    console.log('=> Registered plugins:', {
        plugins: _.keysIn(server.registrations).join(', '),
    });

    const cookieAuthOptions = {
        password: process.env.COOKIE_PASSWORD,
        cookie: 'loggedIn',
        isSecure: false,
        ttl: 24 * 60 * 60 * 1000,
    };

    server.auth.strategy('session', 'cookie', 'optional', cookieAuthOptions);

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: './react-ui/build',
                listing: false,
                index: true,
            },
        },
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
                reply({
                    name: 'jobsList',
                    message: 'Welcome to BEEVR!',
                    jobsList: res,
                });
            }, request.url.query.term);
        },
    });

    server.route({
        method: 'POST',
        path: '/api/jobs',
        handler: (request, reply) => {
            data.postJobs(request.payload, (err, res) => {
                if (err) {
                    return reply.status(500)(
                        'Failed to connect load data from the database'
                    );
                }
                reply({
                    name: 'newJob',
                    message: 'Welcome to BEEVR!',
                    newJob: res,
                });
            });
        },
    });

    server.route({
        method: 'GET',
        path: '/api/get-students',
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
                        studentList: res,
                    });
                }
            }, request.url.query.searchTerm);
        },
    });

    server.route({
        method: 'GET',
        path: '/api/student',
        handler: (request, reply) => {
            console.log('req', request.query);
            data.studentExists(request.query.email, (err, res) => {
                if (err) {
                    return reply(
                        Boom.unauthorized(
                            'Please log-in to see that',
                            data.error
                        )
                    );
                }
                reply(res);
            });
        },
    });

    server.route({
        method: 'POST',
        path: '/api/reg-student',
        handler: (request, reply) => {
            console.log(request.payload);
            hashPassword(request.payload.password, (err, hash) => {
                if (err) {
                    return reply(Boom.badData('', 'bcrypt error'));
                }
                console.log(hash);
                data.postStudents(
                    Object.assign({}, request.payload, {password_hash: hash}),
                    (err, res) => {
                        console.log(request.payload);
                        if (err) {
                            return reply(
                                Boom.serverUnavailable(
                                    'unavailable',
                                    data.error
                                )
                            );
                        }
                        reply({
                            name: 'student',
                            student: res,
                        });
                    }
                );
            });
        },
    });

    server.route({
        method: 'GET',
        path: '/api/resident',
        handler: (request, reply) => {
            console.log('req', request.query);
            data.residentExists(request.query.email, (err, res) => {
                if (err) {
                    return reply(
                        Boom.unauthorized(
                            'Please log-in to see that',
                            data.error
                        )
                    );
                }
                reply(res);
            });
        },
    });

    server.route({
        method: 'POST',
        path: '/api/reg-resident',
        handler: (request, reply) => {
            console.log(request.payload);
            hashPassword(request.payload.password, (err, hash) => {
                if (err) {
                    return reply(Boom.badData('', 'bcrypt error'));
                }
                console.log(hash);
                data.postResidents(
                    Object.assign({}, request.payload, {password_hash: hash}),
                    (err, res) => {
                        console.log(request.payload);
                        if (err) {
                            return reply(
                                Boom.serverUnavailable(
                                    'unavailable',
                                    data.error
                                )
                            );
                        }
                        reply({
                            name: 'resident',
                            resident: res,
                        });
                    }
                );
            });
        },
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
                        message: 'Email sent!',
                    });
                }
            });
        },
    });

    server.route({
        method: 'GET',
        path: '/api/auth',
        handler: (request, reply) => {
            console.log(request.query);
            const email = request.query.email;
            data.loginRequest(email, (err, res) => {
                if (err) {
                    return reply(
                        Boom.unauthorized(
                            'Please log-in to see that',
                            data.error
                        )
                    );
                    console.log('ffff', err);
                }
                const user = res;
                console.log('hey', user);
                comparePassword(
                    request.query.password,
                    user.password_hash,
                    (err, match) => {
                        if (err) {
                            return reply(
                                Boom.unauthorized(
                                    'Please log-in to see that',
                                    data.error
                                )
                            );
                        }
                        console.log('passwords matched');
                        request.cookieAuth.set({email});
                        reply({
                            name: 'loginRequest',
                            message: 'Welcome to BEEVR!',
                            status: 'success',
                            isAuthenticated: true,
                            id: res.id,
                            role: res.role,
                        });
                    }
                );
            });
        },
    });

    //student is hardcoded to 2 until we have session management capacity
    server.route({
        method: 'GET',
        path: '/api/myjobs',
        handler: (request, reply) => {
            data.getMyJobs((err, res) => {
                if (err) {
                    reply('Failed to retrieve data fro database').code(500);
                } else {
                    reply({
                        name: 'myJobsList',
                        message: 'Welcome to BEEVR!',
                        myJobsList: res
                    });
                }
            }, 2);
        }
    });

    server.route({
        method: 'GET',
        path: '/api',
        handler: (request, reply) => {
            reply({
                name: pkg.name,
                version: pkg.version,
                message: 'Welcome to BEEVR!',
            });
        },
    });

    server.start(err => {
        if (err) {
            throw err;
        }

        console.log(`=> BEEVR Server running at: ${server.info.uri}`);
    });
});

module.exports = server;
