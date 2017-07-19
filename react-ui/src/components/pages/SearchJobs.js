import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import * as actions from '../../actions/search_jobs.js';

class BrowseJobs extends Component {
    constructor() {
        super();
        this.renderJobs = this.renderJobs.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onJobSearchChange = this.onJobSearchChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchJobs();
    }

    formatDate(date) {
        return date.slice(0, 10);
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.fetchJobs(this.props.SearchTerm);
    }

    onJobSearchChange(evt) {
        this.props.setTerm(evt.target.value);
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
        let {jobs} = this.props;
        let jobsList = jobs && jobs.jobsList;

        if (!jobsList) {
            return (
                <form onSubmit={this.onSubmit}>
                    <label className="form__field-label" htmlFor="Browse Jobs">
                        Browse Jobs
                    </label>
                    <input
                        className="form-control"
                        id="Browse Jobs"
                        type="text"
                        placeholder="Browse Jobs"
                        list="jobs"
                        onChange={this.onJobSearchChange}
                        value={this.props.SearchTerm}
                    />
                    <datalist id="jobs">
                        <option value="dog walking" />
                        <option value="Tutoring- Spanish" />
                        <option value="Home maintenance" />
                        <option value="Tutoring- Mathematics" />
                        <option value="Cat Sitting" />
                        <option value="Plant watering" />
                        <option value="Babysitting" />
                        <option value="Cooking" />
                        <option value="House Cleaning" />
                        <option value="Band playing" />
                        <option value="photography" />
                        <option value="Other" />
                    </datalist>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            );
        }
        return (
            <article>
                <section className="text-section">
                    <form onSubmit={this.onSubmit}>
                        <label
                            className="form__field-label"
                            htmlFor="Browse Jobs"
                        >
                            Browse Jobs
                        </label>

                        <input
                            className="form-control"
                            id="Browse Jobs"
                            type="text"
                            placeholder="Browse Jobs"
                            list="jobs"
                            onChange={this.onJobSearchChange}
                            value={this.props.SearchTerm}
                        />
                        <datalist id="jobs">
                            <option value="dog walking" />
                            <option value="Tutoring- Spanish" />
                            <option value="Home maintenance" />
                            <option value="Tutoring- Mathematics" />
                            <option value="Cat Sitting" />
                            <option value="Plant watering" />
                            <option value="Babysitting" />
                            <option value="Cooking" />
                            <option value="House Cleaning" />
                            <option value="Band playing" />
                            <option value="photography" />
                            <option value="Other" />
                        </datalist>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                    <ul>
                        {jobsList.map(this.renderJobs)}
                    </ul>
                </section>
            </article>
        );
    }
}

function mapStateToProps(state) {
    return {
        jobs: state.searchJobs.jobsRequest.response,
        SearchTerm: state.searchJobs.term
    };
}

export default connect(mapStateToProps, actions)(BrowseJobs);
