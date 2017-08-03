import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/job_apply.js';
import LoadingIndicator from 'react-loading-indicator';

class JobDetail extends Component {
    constructor() {
        super();
        this.renderJob = this.renderJob.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.submitJobApplication = this.submitJobApplication.bind(this);
    }

    componentDidMount() {
        if (!this.props.jobs) {
            this.props.fetchJobs();
        }
    }

    formatDate(date) {
        return date.slice(0, 10);
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    submitJobApplication() {
        this.props.submitJobApplication(this.props.jobId);
    }

    renderJob() {
        if (!this.props.jobs) {
            return <h2>Loading</h2>;
        }
        if (this.props.applied.includes(this.props.jobId)) {
            return <h2>APPLICATION SUCCESSFUL</h2>;
        }
        var jobObj = {};
        var arr = this.props.jobs;
        for (var i = 0; i < arr.length; ++i) jobObj[arr[i].jobId] = arr[i];

        var job = jobObj[this.props.jobId];

        return (
            <div key={job.jobId}>
                <h2>
                    {job.jobTitle}
                </h2>
                <h4>
                    <label>Category: </label>
                    {job.jobCat}
                </h4>
                <p>
                    {job.description}
                </p>
                <label>Start Date</label>
                <p>
                    {this.formatDate(job.startDate)}
                </p>
                <label>Start Time</label>
                <p>
                    {this.formatTime(job.startTime)}
                </p>
                <label>End Date</label>
                <p>
                    {this.formatDate(job.endDate)}
                </p>
                <label>End Time</label>
                <p>
                    {this.formatTime(job.endTime)}
                </p>
                <label>Rate</label>
                <p>
                    {job.rate}
                </p>
                <div>
                    {this.props.status === 'pending'
                        ? <LoadingIndicator />
                        : <button
                            className="btn btn primary"
                            onClick={this.submitJobApplication}
                        >
                              APPLY
                        </button>}
                </div>
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
    var searchJobs =
        state.searchJobs.jobsRequest &&
        state.searchJobs.jobsRequest.response &&
        state.searchJobs.jobsRequest.response.jobsList;

    var applyJobs =
        state.applyJob.jobsRequest &&
        state.applyJob.jobsRequest.response &&
        state.applyJob.jobsRequest.response.jobsList;

    var jobs = searchJobs || applyJobs;

    return {
        applied: state.applyJob.applied,
        jobId: ownProps.params.id,
        status: state.applyJob.status,
        jobs
    };
}

export default connect(mapStateToProps, actions)(JobDetail);
