import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/my_posted_jobs.js';
import LoadingIndicator from 'react-loading-indicator';

class MyPostedJobs extends Component {
    constructor() {
        super();
        this.renderJob = this.renderJob.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
    }

    componentWillMount() {
        this.props.fetchMyPostedJobs(this.props.residentId);
    }

    formatDate(date) {
        return date.slice(0, 10);
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    deleteJob(jobId) {
        this.props.deleteJob(jobId);
    }

    renderJob(job) {
        return (
            <div className="job-wrapper" key={job.jobId}>
                <h3 className="light_brown_title">
                    {job.jobTitle}
                </h3>
                <p className="light_brown_title">
                    {job.jobCategories}
                </p>
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
                    {this.props.deleteJobRequests[job.jobId] &&
                    this.props.deleteJobRequests[job.jobId].status === 'pending'
                        ? <LoadingIndicator />
                        : <button
                            className="btn btn-primary"
                            onClick={() => this.deleteJob(job.jobId)}
                        >
                              Delete the job
                        </button>}
                </div>
            </div>
        );
    }

    render() {
        let {myPostedJobs} = this.props;

        if (
            this.props.myPostedJobsStatus === 'success' &&
            myPostedJobs.length === 0
        ) {
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
                            <h5 className="success_message">
                                You have no active posted jobs
                            </h5>
                        </div>
                    </div>
                </div>
            );
        }

        if (myPostedJobs.length === 0) {
            return (
                <div className="register_container flex-container">
                    <LoadingIndicator />
                </div>
            );
        }

        return (
            <div className="container">
                <article className="row justify-content-md-center search_jobs">
                    <section className="col col-md-8">
                        <ul>
                            {myPostedJobs.map(this.renderJob)}
                        </ul>
                    </section>
                </article>
            </div>
        );
    }
}

function mapStateToProps(state) {
    var residentId =
        state.auth && state.auth.response && state.auth.response.id;
    return {
        myPostedJobs: state.fetchMyPostedJobs.jobsPosted.jobs,
        myPostedJobsStatus: state.fetchMyPostedJobs.jobsPosted.requestStatus,
        deleteJobRequests: state.fetchMyPostedJobs.deleteJobRequests,
        residentId,
    };
}

export default connect(mapStateToProps, actions)(MyPostedJobs);
