import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/fetch_my_jobs.js';
import axios from 'axios';

class MyJobs extends Component {
    constructor() {
        super();
        this.renderJobs = this.renderJobs.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
    }

    componentWillMount() {
        // this.props.fetchMyJobs();
        axios
            .get('/api/myjobs')
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    formatDate(date) {
        return date.slice(0, 10);
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    renderJobs(job) {
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
            </div>
        );
    }

    render() {
        return <div />;
    }

    // render() {
    //     let {myJobs} = this.props;
    //     let jobsList = jobs && jobs.jobsList;
    //
    //     if (!jobsList) {
    //         return <div>Loading</div>;
    //     }
    //     return (
    //         <article>
    //             <section className="text-section">
    //                 <ul>
    //                     {jobsList.map(this.renderJobs)}
    //                 </ul>
    //             </section>
    //         </article>
    //     );
    // }
}

function mapStateToProps(state) {
    return {
        myJobs: state.searchJobs.jobsRequest.response
    };
}

export default connect(mapStateToProps, actions)(MyJobs);
