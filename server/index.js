'use strict';
const Hapi = require('hapi');
const _ = require('lodash');
const pkg = require('../package.json');
const inert = require('inert');
const blipp = require('blipp');
const cookieAuth = require('hapi-auth-cookie');
const fs = require('fs');
const env = require('env2');
const data = require('./database/db_queries.js');
const sendEmail = require('./lib/sendEmail.js');
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

    //student is hardcoded to 2 until we have session management capacity
    server.route({
        method: 'GET',
        path: '/api/myjobs',
        handler: (request, reply) => {
            data.getMyJobs((err, res) => {
                if (err) {
                    reply('Failed to retrieve data fro database').code(500);
                } else {
                    const filtered_joblist = [];

                    res.map(job => {
                        let filtered_job = {};
                        filtered_job.job_id = job.job_id;
                        filtered_job.job_title = job.job_title;
                        filtered_job.description = job.description;
                        filtered_job.start_date = job.start_date;
                        filtered_job.start_time = job.start_time;
                        filtered_job.end_date = job.end_date;
                        filtered_job.end_time = job.end_time;
                        filtered_job.category = job.category;
                        filtered_job.rate = job.rate;
                        filtered_joblist.push(filtered_job);
                    });

                    reply({
                        name: 'myJobsList',
                        message: 'Welcome to BEEVR!',
                        myJobsList: filtered_joblist
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
                message: 'Welcome to BEEVR!'
            });
        }
    });

    //resident id hardcoded until we have cookie on the master branch
    server.route({
        method: 'GET',
        path: '/api/mypostedjobs',
        handler: (request, reply) => {
            data.getMyPostedJobs((err, res) => {
                if (err) {
                    reply('Failed to retrieve data fro database').code(500);
                } else {
                    const filtered_joblist = [];

                    res.map(job => {
                        let filtered_job = {};
                        filtered_job.job_id = job.job_id;
                        filtered_job.job_title = job.job_title;
                        filtered_job.description = job.description;
                        filtered_job.start_date = job.start_date;
                        filtered_job.start_time = job.start_time;
                        filtered_job.end_date = job.end_date;
                        filtered_job.end_time = job.end_time;
                        filtered_job.category = job.category;
                        filtered_job.rate = job.rate;
                        filtered_joblist.push(filtered_job);
                    });

                    reply({
                        name: 'myPostedJobsList',
                        message: 'Welcome to BEEVR!',
                        myPostedJobsList: filtered_joblist
                    });
                }
            }, 1);
        }
    });

    //need to connect id to the front end
    server.route({
        method: 'DELETE',
        path: '/api/mypostedjobs',
        handler: (request, reply) => {
            data.deleteJob((err, res) => {
                if (err) {
                    reply('Failed to delete record').code(500);
                } else {
                    reply({
                        message: 'Job deleted'
                    });
                }
            }, request.url.query.job_id);
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
