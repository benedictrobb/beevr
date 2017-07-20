import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/search_jobs.js';
var aws = require('aws-sdk');
const env = require('env2');
env('../../../../config.env');

console.log(process.env.SES_ACCESS_ID);

aws.config = {
    accessKeyId: 'id',
    secretAccessKey: 'key',
    region: 'eu-west-1'
};

// load aws sdk

// load aws config
// aws.config.loadFromPath('config.json');

// load AWS SES
var ses = new aws.SES({apiVersion: '2010-12-01'});

// send to list
var to = ['rmrajaa@gmail.com'];

// this must relate to a verified SES account
var from = 'maja.kudlicka@gmail.com';

// this sends the email
// @todo - add HTML version
ses.sendEmail(
    {
        Source: from,
        Destination: {ToAddresses: to},
        Message: {
            Subject: {
                Data: 'A Message To You Rudy'
            },
            Body: {
                Text: {
                    Data: 'Stop your messing around'
                }
            }
        }
    },
    function(err, data) {
        if (err) throw err;
        console.log('Email sent:');
        console.log(data);
    }
);

// var key = process.env.SES_ACCESS_ID;
// var secret = process.env.SES_ACCESS_KEY;
//
// var ses = require('node-ses'),
//     client = ses.createClient({
//         key: 'AKIAJ3QGMLKZUSI3HT6A',
//         secret: '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',
//         amazon: 'https://email.eu-west-1.amazonaws.com'
//     });

// // Give SES the details and let it construct the message for you.
// client.sendEmail(
//     {
//         to: 'rmrajaa@gmail.com',
//         from: 'maja.kudlicka@gmail.com',
//         subject: 'greetings',
//         message: 'your <b>message</b> goes here',
//         altText: 'plain text'
//     },
//     function(err, data, res) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('email sent!');
//         }
//     }
// );

class JobDetail extends Component {
    constructor() {
        super();
        this.renderJob = this.renderJob.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        console.log(this.jobs);
    }

    formatDate(date) {
        return date.slice(0, 10);
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    // Ideally we want to fetch jobs if there is no this.props.jobs
    renderJob() {
        console.log('this.props.jobs are ', this.props.jobs);
        if (!this.props.jobs) {
            // this.props.fetchJobs;
            return <div>Something went wrong</div>;
        }
        var jobObj = {};
        var arr = this.props.jobs;
        for (var i = 0; i < arr.length; ++i) jobObj[arr[i].job_id] = arr[i];

        var job = jobObj[this.props.job_id];

        return (
            <div key={job.job_id}>
                <h2>
                    {job.job_title}
                </h2>
                <h4>
                    <label>Category: </label>
                    {job.category}
                </h4>
                <p>
                    {job.description}
                </p>
                <label>Start Date</label>
                <p>
                    {this.formatDate(job.start_date)}
                </p>
                <label>Start Time</label>
                <p>
                    {this.formatTime(job.start_time)}
                </p>
                <label>End Date</label>
                <p>
                    {this.formatDate(job.end_date)}
                </p>
                <label>End Time</label>
                <p>
                    {this.formatTime(job.end_time)}
                </p>
                <label>Rate</label>
                <p>
                    {job.rate}
                </p>
                <button className="btn btn primary">APPLY</button>
            </div>
        );
    }

    render() {
        return (
            <div>
                <p>JobDetail</p>
                <h2>
                    {this.renderJob()}
                </h2>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    if (!state.searchJobs.jobsRequest.response) {
        return {};
    }
    return {
        job_id: ownProps.params.id,
        jobs: state.searchJobs.jobsRequest.response.jobsList
    };
}

export default connect(mapStateToProps, actions)(JobDetail);
