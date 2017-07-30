'use strict';
const Hapi = require('hapi');
const Boom = require('boom');
const _ = require('lodash');
const pkg = require('../package.json');
const inert = require('inert');
const blipp = require('blipp');
const cookieAuth = require('hapi-auth-cookie');
const {hashPassword, comparePassword} = require('./lib/bcrypt.js');
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
                if (err) {
                    return reply(Boom.serverUnavailable('unavailable: ' + err));
                }
                reply({
                    name: 'jobsList',
                    message: 'Welcome to BEEVR!',
                    jobsList: res.map(key => {
                        return {
                            jobId: key.job_id,
                            startDate: key.start_date,
                            startTime: key.start_time,
                            endDate: key.end_date,
                            endTime: key.end_time,
                            description: key.description,
                            jobCat: key.category,
                            rate: key.rate,
                            studentId: key.student_id,
                            residentId: key.resident_id,
                        };
                    }),
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
                    return reply(Boom.badRequest('Bad request: ' + err));
                }
                reply({
                    name: 'newJob',
                    message: 'Job posted succesfully!',
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
                    return reply(Boom.serverUnavailable('unavailable: ' + err));
                } else {
                    reply({
                        name: 'studentList',
                        message: 'Welcome to BEEVR!',
                        studentList: res.map(key => {
                            return {
                                studentId: key.student_id,
                                firstName: key.first_name,
                                lastName: key.last_name,
                                dob: key.dob,
                                univSchool: key.univ_school,
                                bio: key.bio,
                                picture: key.picture,
                                jobCat: key.job_cat,
                            };
                        }),
                    });
                }
            }, request.url.query.searchTerm);
        },
    });

    server.route({
        method: 'POST',
        path: '/api/student',
        handler: (request, reply) => {
            data.studentExists(request.payload.email, (err, res) => {
                if (err) {
                    return reply(Boom.badRequest('Bad request: ' + err));
                }
                reply(res.exists);
            });
        },
    });

    server.route({
        method: 'POST',
        path: '/api/reg-student',
        handler: (request, reply) => {
            hashPassword(request.payload.password, (err, hash) => {
                if (err) {
                    return reply(Boom.badData('bcrypt error'));
                }
                data.postStudents(
                    Object.assign({}, request.payload, {passwordHash: hash}),
                    (err, res) => {
                        if (err) {
                            return reply(
                                Boom.badRequest('Bad request: ' + err)
                            );
                        }
                        reply({
                            name: 'student',
                            status: 'success',
                            message: `Registration successful!
                            Welcome to BEEVR!`,
                        });
                    }
                );
            });
        },
    });

    server.route({
        method: 'POST',
        path: '/api/resident',
        handler: (request, reply) => {
            data.residentExists(request.payload.email, (err, res) => {
                if (err) {
                    return reply(Boom.badRequest('Bad request: ' + err));
                }
                reply(res.exists);
            });
        },
    });

    server.route({
        method: 'POST',
        path: '/api/reg-resident',
        handler: (request, reply) => {
            hashPassword(request.payload.password, (err, hash) => {
                if (err) {
                    return reply(Boom.badData('bcrypt error'));
                }
                data.postResidents(
                    Object.assign({}, request.payload, {passwordHash: hash}),
                    (err, res) => {
                        if (err) {
                            return reply(
                                Boom.badRequest('Bad request: ' + err)
                            );
                        }
                        reply({
                            name: 'resident',
                            status: 'success',
                            message: `Registration successful!
                            Welcome to BEEVR!`,
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
                    reply(Boom.internal('Failed to send email', 500));
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
            const email = request.query.email;
            data.loginRequest(email, (err, res) => {
                if (err) {
                    return reply(
                        Boom.unauthorized('Please log-in to see that')
                    );
                }
                const user = res;
                comparePassword(
                    request.query.password,
                    user.password_hash,
                    (err, match) => {
                        if (err) {
                            return reply(
                                Boom.unauthorized('Please log-in to see that')
                            );
                        }
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
                    reply(
                        Boom.serverUnavailable(
                            'Failed to retrieve data from database'
                        )
                    );
                } else {
                    reply({
                        name: 'myJobsList',
                        message: 'Welcome to BEEVR!',
                        myJobsList: res.map(key => {
                            return {
                                jobId: key.job_id,
                                jobTitle: key.job_title,
                                startDate: key.start_date,
                                startTime: key.start_time,
                                endDate: key.end_date,
                                endTime: key.end_time,
                                description: key.description,
                                jobCat: key.category,
                                rate: key.rate,
                                studentId: key.student_id,
                                residentId: key.resident_id,
                            };
                        }),
                    });
                }
            }, 2);
        },
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
