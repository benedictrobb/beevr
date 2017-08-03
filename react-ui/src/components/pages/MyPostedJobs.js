import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/my_posted_jobs.js';

class MyPostedJobs extends Component {
    constructor() {
        super();
        this.renderJob = this.renderJob.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
    }

    componentWillMount() {
        this.props.fetchMyPostedJobs();
    }

    formatDate(date) {
        return date.slice(0, 10);
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    deleteJob(job_id) {
        this.props.deleteJob(job_id);
    }

    renderJob(job) {
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
                <button
                    className="btn btn-danger"
                    onClick={() => this.deleteJob(job.job_id)}
                >
                    Delete the job
                </button>
            </div>
        );
    }
    // let myPostedJobsList = myPostedJobs && myPostedJobs.myPostedJobsList;

    render() {
        let {myPostedJobs} = this.props;

        if (!myPostedJobs) {
            return <div>Loading</div>;
        }
        return (
            <article>
                <section className="text-section">
                    <ul>
                        {myPostedJobs.map(this.renderJob)}
                    </ul>
                </section>
            </article>
        );
    }
}

function mapStateToProps(state) {
    return {
        myPostedJobs: state.fetchMyPostedJobs.jobsPosted.jobs,
    };
}

export default connect(mapStateToProps, actions)(MyPostedJobs);
