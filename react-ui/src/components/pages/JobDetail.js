import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/job_apply.js';

class JobDetail extends Component {
    constructor() {
        super();
        this.renderJob = this.renderJob.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }

    formatDate(date) {
        return date.slice(0, 10);
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    sendEmail() {
        this.props.applyJob(this.props.job_id);
    }

    // Ideally we want to somehow fetch jobs if there is no this.props.jobs
    renderJob() {
        if (!this.props.jobs) {
            return <h2>Something went wrong</h2>;
        }
        if (this.props.applied.includes(this.props.job_id)) {
            return <h2>APPLICATION SUCCESSFUL</h2>;
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
                <button className="btn btn primary" onClick={this.sendEmail}>
                    APPLY
                </button>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderJob()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    if (!state.searchJobs.jobsRequest.response) {
        return {};
    }
    return {
        applied: state.applyJob.applied,
        job_id: ownProps.params.id,
        jobs: state.searchJobs.jobsRequest.response.jobsList
    };
}

export default connect(mapStateToProps, actions)(JobDetail);
