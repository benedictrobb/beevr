import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/my_jobs.js';
import LoadingIndicator from 'react-loading-indicator';

class MyJobs extends Component {
    constructor() {
        super();
        this.renderJobs = this.renderJobs.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.deleteApplication = this.deleteApplication.bind(this);
    }

    componentWillMount() {
        this.props.fetchMyJobs(this.props.studentId);
    }

    formatDate(date) {
        return date.slice(0, 10);
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    deleteApplication(jobId, studentId) {
        this.props.deleteApplication(jobId, studentId);
    }

    renderJobs(job) {
        return (
            <div className="myjob_wrapper" key={job.jobId}>
                <div className="container_brown ">
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

                        <div>
                            {this.formatTime(job.endTime)}
                        </div>
                    </div>
                    <div className="rectangle-4">
                        £{job.rate}
                    </div>
                    <div className="button">
                        <button
                            className="mt-2 btn btn-danger"
                            onClick={() =>
                                this.deleteApplication(
                                    job.jobId,
                                    this.props.studentId
                                )}
                        >
                            Delete application
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let {myJobs} = this.props;

        if (this.props.myJobsStatus === 'success' && myJobs.length === 0) {
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
                                You have no outstanding job applications
                            </h5>
                        </div>
                    </div>
                </div>
            );
        }

        if (myJobs.length === 0) {
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
                            {myJobs.map(this.renderJobs)}
                        </ul>
                    </section>
                </article>
            </div>
        );
    }
}

function mapStateToProps(state) {
    var studentId = state.auth && state.auth.response && state.auth.response.id;

    return {
        myJobs: state.fetchMyJobs.jobsApplied.jobs,
        myJobsStatus: state.fetchMyJobs.jobsApplied.requestStatus,
        studentId,
    };
}

export default connect(mapStateToProps, actions)(MyJobs);
