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
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);

        return `${day}/${month}/${year}`;
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    deleteJob(jobId) {
        this.props.deleteJob(jobId);
    }

    renderJob(job) {
        return (
            <div className="myjob_wrapper" key={job.jobId}>
                <div className="container_brown">
                    <h3 className="mt-2">
                        {job.jobTitle}
                    </h3>
                    <p>
                        {job.jobCategories}
                    </p>
                </div>
                <div className="job_description">
                    <p className="italic">
                        {job.description}
                    </p>
                    <div className="date">
                        <img
                            className="calendar-icon"
                            src={require('../../utils/if_72-Calendar_2123904.svg')}
                        />

                        <div className="date-item">
                            {this.formatDate(job.startDate)}
                        </div>

                        <div>-</div>

                        <div className="date-item">
                            {this.formatDate(job.endDate)}
                        </div>
                    </div>
                    <div className="date">
                        <img
                            className="calendar-icon"
                            src={require('../../utils/if_10_171505.svg')}
                        />
                    
                        <div className="date-item">
                            {this.formatTime(job.startTime)}
                        </div>

                        <div>-</div>

                        <div className="date-item">
                            {this.formatTime(job.endTime)}
                        </div>
                    </div>

                    <div className="rectangle-4">
                        £{job.rate}
                    </div>
                    <div className="button">
                        {this.props.deleteJobRequests[job.jobId] &&
                        this.props.deleteJobRequests[job.jobId].status ===
                            'pending'
                            ? <LoadingIndicator />
                            : <button
                                className="mt-2 btn btn-primary"
                                onClick={() => this.deleteJob(job.jobId)}
                            >
                                  Delete the job
                            </button>}
                    </div>
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
                        <ul className="search_results_ul">
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
