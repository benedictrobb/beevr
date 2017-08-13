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

    server.auth.strategy('session', 'cookie', 'required', cookieAuthOptions);

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
        method: 'POST',
        path: '/api/auth',
        config: {
            auth: {
                mode: 'optional',
                strategy: 'session',
            },
            handler: (request, reply) => {
                if (request.auth.isAuthenticated) {
                    var session = request.auth.credentials;
                    data.authRequest(session, (err, res) => {
                        if (err) {
                            return reply(
                                Boom.serverUnavailable('unavailable' + err)
                            );
                        }
                        console.log(res);
                        return reply({
                            name: 'successfulAuth',
                            message: `HI ${res.user.toUpperCase()}`,
                            status: 'success',
                            loggedIn: true,
                            isAuthenticated: true,
                            id: res.id,
                            role: res.role,
                        });
                    });
                } else {
                    reply({
                        name: 'FailedAuth',
                        message: 'WELCOME TO BEEVR',
                        status: 'success',
                        loggedIn: false,
                        isAuthenticated: false,
                    });
                }
            },
        },
    });

    server.route({
        method: 'GET',
        path: '/api/jobs',
        config: {
            auth: {
                mode: 'optional',
                strategy: 'session',
            },
            handler: (request, reply) => {
                data.getJobs((err, res) => {
                    if (err) {
                        return reply(
                            Boom.serverUnavailable('unavailable: ' + err)
                        );
                    }
                    reply({
                        name: 'jobsList',
                        message: 'Welcome to BEEVR!',
                        jobsList: res.map(element => {
                            return {
                                jobId: element.job_id,
                                jobTitle: element.job_title,
                                startDate: element.start_date,
                                startTime: element.start_time,
                                endDate: element.end_date,
                                endTime: element.end_time,
                                description: element.description,
                                jobCat: element.category,
                                rate: element.rate,
                                studentId: element.student_id,
                                residentId: element.resident_id,
                            };
                        }),
                    });
                }, request.url.query.term);
            },
        },
    });

    server.route({
        method: 'POST',
        path: '/api/jobs',
        config: {
            auth: {
                strategy: 'session',
            },
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
        },
    });

    server.route({
        method: 'GET',
        path: '/api/get-students',
        config: {
            auth: {
                mode: 'optional',
                strategy: 'session',
            },
            handler: (request, reply) => {
                data.getStudents((err, res) => {
                    if (err) {
                        return reply(
                            Boom.serverUnavailable('unavailable: ' + err)
                        );
                    } else {
                        reply({
                            name: 'studentList',
                            message: 'Welcome to BEEVR!',
                            studentList: res.map(element => {
                                return {
                                    studentId: element.student_id,
                                    firstName: element.first_name,
                                    lastName: element.last_name,
                                    dob: element.dob,
                                    univSchool: element.univ_school,
                                    bio: element.bio,
                                    picture: element.picture,
                                    jobCat: element.job_cat,
                                };
                            }),
                        });
                    }
                }, request.url.query.searchTerm);
            },
        },
    });

    server.route({
        method: 'POST',
        path: '/api/student',
        config: {
            auth: {
                mode: 'optional',
                strategy: 'session',
            },
            handler: (request, reply) => {
                data.studentExists(request.payload.email, (err, res) => {
                    if (err) {
                        return reply(Boom.badRequest('Bad request: ' + err));
                    }
                    reply(res.exists);
                });
            },
        },
    });

    server.route({
        method: 'POST',
        path: '/api/reg-student',
        config: {
            auth: {
                mode: 'optional',
                strategy: 'session',
            },
            handler: (request, reply) => {
                hashPassword(request.payload.password, (err, hash) => {
                    if (err) {
                        return reply(Boom.badData('bcrypt error'));
                    }
                    data.postStudents(
                        Object.assign({}, request.payload, {
                            passwordHash: hash,
                        }),
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
        },
    });

    server.route({
        method: 'POST',
        path: '/api/resident',
        config: {
            auth: {
                mode: 'optional',
                strategy: 'session',
            },
            handler: (request, reply) => {
                data.residentExists(request.payload.email, (err, res) => {
                    if (err) {
                        return reply(Boom.badRequest('Bad request: ' + err));
                    }
                    reply(res.exists);
                });
            },
        },
    });

    server.route({
        method: 'POST',
        path: '/api/reg-resident',
        config: {
            auth: {
                mode: 'optional',
                strategy: 'session',
            },
            handler: (request, reply) => {
                hashPassword(request.payload.password, (err, hash) => {
                    if (err) {
                        return reply(Boom.badData('bcrypt error'));
                    }
                    data.postResidents(
                        Object.assign({}, request.payload, {
                            passwordHash: hash,
                        }),
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
        },
    });

    server.route({
        method: 'PUT',
        path: '/api/apply',
        handler: (request, reply) => {
            var to = ['rmrajaa@gmail.com'];
            var from = 'maja.kudlicka@gmail.com';
            var subject = 'New job application';
            var text =
                'Someone has just applied for the job you posted - get in touch!';

            data.findStudent(request.payload.studentId, (err, res) => {
                if (err) {
                    reply(
                        Boom.serverUnavailable(
                            'Failed to retrieve data from database'
                        )
                    );
                } else {
                    var message = `${text}

                     Name: ${res.first_name} ${res.last_name}
                     University/School:${res.univ_school}
                     Phone: ${res.phone}
                     Email: ${res.email}
                     Bio: ${res.bio}`;

                    data.submitApplication(
                        request.payload.jobId,
                        request.payload.residentId,
                        request.payload.studentId,
                        (err, res) => {
                            if (err) {
                                reply(
                                    Boom.serverUnavailable(
                                        'Failed to retrieve data from database'
                                    )
                                );
                            } else {
                                var updatedTo = res.email;
                                //this needs to replace 'to' property once proper SES account has been
                                //established by the product owner

                                sendEmail(
                                    from,
                                    to,
                                    subject,
                                    message,
                                    (err, res) => {
                                        if (err) {
                                            reply(
                                                Boom.internal(
                                                    'Failed to send email',
                                                    500
                                                )
                                            );
                                        } else {
                                            reply({
                                                name: 'applyJob',
                                                message: 'Email sent!',
                                                applyJob: res,
                                            });
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            });
        },
    });

    server.route({
        method: 'POST',
        path: '/api/login',
        config: {
            auth: {
                mode: 'optional',
                strategy: 'session',
            },
            handler: (request, reply) => {
                const email = request.payload.email;
                data.loginRequest(email, (err, res) => {
                    if (err) {
                        return reply(
                            Boom.serverUnavailable(
                                'Failed to retrieve data from database'
                            )
                        );
                    }
                    const user = res;
                    comparePassword(
                        request.payload.password,
                        user.password_hash,
                        (err, match) => {
                            if (err || !match) {
                                return reply(
                                    Boom.unauthorized(
                                        'Invalid credentials, please retry...' +
                                            err
                                    )
                                );
                            }
                            request.cookieAuth.set({email});
                            reply({
                                name: 'loginRequest',
                                message: 'Welcome to BEEVR!',
                                status: 'success',
                                loggedIn: true,
                                isAuthenticated: true,
                                id: res.id,
                                role: res.role,
                            });
                        }
                    );
                });
            },
        },
    });

    server.route({
        method: 'GET',
        path: '/api/logout',
        config: {
            auth: {
                mode: 'optional',
                strategy: 'session',
            },
            handler: (request, reply) => {
                request.cookieAuth.clear();
                reply({
                    name: 'logout',
                    message:
                        'You have been successifully logged out from BEEVR',
                    status: 'success',
                });
            },
        },
    });

    server.route({
        method: 'GET',
        path: '/api/myjobs',
        handler: (request, reply) => {
            data.getMyJobs(request.url.query.studentId, (err, res) => {
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
                        myJobsList: res.map(element => {
                            return {
                                jobId: element.job_id,
                                jobTitle: element.job_title,
                                startDate: element.start_date,
                                startTime: element.start_time,
                                endDate: element.end_date,
                                endTime: element.end_time,
                                description: element.description,
                                jobCat: element.category,
                                rate: element.rate,
                                studentId: element.student_id,
                                residentId: element.resident_id,
                            };
                        }),
                    });
                }
            });
        },
    });

    server.route({
        method: 'DELETE',
        path: '/api/myjobs',
        handler: (request, reply) => {
            data.deleteApplication(
                request.url.query.studentId,
                request.url.query.jobId,
                (err, res) => {
                    if (err) {
                        reply(
                            Boom.serverUnavailable(
                                'Failed to delete record from database'
                            )
                        );
                    } else {
                        reply({
                            name: 'jobDeleted',
                            message: 'Job deleted',
                            jobDeleted: res,
                        });
                    }
                }
            );
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

    server.route({
        method: 'GET',
        path: '/api/mypostedjobs',
        handler: (request, reply) => {
            data.getMyPostedJobs(request.url.query.residentId, (err, res) => {
                if (err) {
                    reply(
                        Boom.serverUnavailable(
                            'Failed to retrieve data from database'
                        )
                    );
                } else {
                    reply({
                        name: 'myPostedJobsList',
                        message: 'Welcome to BEEVR!',
                        myPostedJobsList: res.map(element => {
                            return {
                                jobId: element.job_id,
                                jobTitle: element.job_title,
                                startDate: element.start_date,
                                startTime: element.start_time,
                                endDate: element.end_date,
                                endTime: element.end_time,
                                description: element.description,
                                jobCat: element.category,
                                rate: element.rate,
                                studentId: element.student_id,
                                residentId: element.resident_id,
                            };
                        }),
                    });
                }
            });
        },
    });

    server.route({
        method: 'DELETE',
        path: '/api/mypostedjobs',
        handler: (request, reply) => {
            data.deleteJob(request.url.query.jobId, (err, res) => {
                if (err) {
                    reply(
                        Boom.serverUnavailable(
                            'Failed to retrieve data from database'
                        )
                    );
                } else {
                    reply({
                        message: 'Job deleted',
                    });
                }
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
