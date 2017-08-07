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
        this.props.fetchMyJobs();
    }

    formatDate(date) {
        return date.slice(0, 10);
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    deleteApplication(jobId) {
        this.props.deleteApplication(jobId);
    }

    renderJobs(job) {
        return (
            <div key={job.jobId}>
                <h3 className="light_brown_title">
                    {job.jobTitle}
                </h3>
                <p className="light_brown_title">
                    {job.jobCat}
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
                <button
                    className="btn btn-danger"
                    onClick={() => this.deleteApplication(job.jobId)}
                >
                    Delete application
                </button>
            </div>
        );
    }

    // let myJobsList = myJobs && myJobs.myJobsList;
    render() {
        let {myJobs} = this.props;

        if (!myJobs) {
            return (
                <div className="register_container flex-container">
                    <LoadingIndicator />
                </div>
            );
        }
        return (
            <div className="container-fluid">
                <article className="row-fluid search_jobs">
                    <section className="col-md-6 col-md-offset-3">
                        <ul>
                            {myJobs.map(this.renderJobs)}
                        </ul>
                    </section>
                </article>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        myJobs: state.fetchMyJobs.jobsApplied.jobs,
    };
}

export default connect(mapStateToProps, actions)(MyJobs);
