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

    submitJobApplication(jobId, residentId, studentId) {
        this.props.submitJobApplication(jobId, residentId, studentId);
    }

    renderJob() {
        if (!this.props.jobs) {
            return (
                <div className="register_container flex-container">
                    <LoadingIndicator />
                </div>
            );
        }

        if (this.props.applied.includes(Number(this.props.jobId))) {
            return (
                <div className="parent-container">
                    <div>
                        <div className="flex-container">
                            <img
                                className="success_image"
                                src={require('../../utils/lemmling-Cartoon-beaver.svg')}
                            />
                        </div>

                        <div className="flex-container">
                            <h3 className="success_message">SUCCESS!</h3>
                        </div>
                        <div className="flex-container">
                            <h6 className="success_message">
                                Your application has been sent
                            </h6>
                        </div>
                    </div>
                </div>
            );
        }
        var jobObj = {};
        var arr = this.props.jobs;
        for (var i = 0; i < arr.length; ++i) jobObj[arr[i].jobId] = arr[i];

        var job = jobObj[this.props.jobId];

        return (
            <div key={job.jobId} className="col-md-6 col-md-offset-3">
                <h3 className="job_title">
                    {job.jobTitle}
                </h3>
                <h5 className="job_title">
                    {job.jobCategories}
                </h5>
                <p>
                    {job.description}
                </p>

                <label>
                    <u>Start Date</u>
                </label>

                <p>
                    {this.formatDate(job.startDate)}
                </p>
                <label>
                    <u>Start Time</u>
                </label>
                <p>
                    {this.formatTime(job.startTime)}
                </p>
                <u>
                    <label>
                        <u>End Date</u>
                    </label>
                </u>
                <p>
                    {this.formatDate(job.endDate)}
                </p>
                <u>
                    <label>
                        <u>End Time</u>
                    </label>
                </u>
                <p>
                    {this.formatTime(job.endTime)}
                </p>
                <u>
                    <label>
                        <u>Rate</u>
                    </label>
                </u>
                <p>
                    {job.rate}
                </p>
                <div>
                    {this.props.status === 'pending'
                        ? <LoadingIndicator />
                        : <button
                            className="btn btn-primary"
                            onClick={() =>
                                this.submitJobApplication(
                                    job.jobId,
                                    job.residentId,
                                    this.props.studentId
                                )}
                        >
                              APPLY
                        </button>}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container-fluid register_container">
                <article className="row-fluid">
                    <section>
                        {this.renderJob()}
                    </section>
                </article>
            </div>
        );
    }
}

//studentId disappears on page reload
function mapStateToProps(state, ownProps) {
    var studentId = state.auth && state.auth.response && state.auth.response.id;

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
        studentId,
        jobs,
    };
}

export default connect(mapStateToProps, actions)(JobDetail);
