import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/search_jobs.js';
import {Link} from 'react-router';
import categories from '../../constants/job_categories.js';
const numberOfCharacters = 220;

class BrowseJobs extends Component {
    constructor() {
        super();
        this.renderJobs = this.renderJobs.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.formatDesc = this.formatDesc.bind(this);
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

    formatDesc(desc) {
        if (desc.length <= numberOfCharacters) {
            return desc;
        } else {
            return desc.slice(0, numberOfCharacters) + '...';
        }
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
            <div key={job.jobId}>
                <h3>
                    <Link to={`/jobdetail/${job.jobId}`}>
                        {job.jobTitle}
                    </Link>
                </h3>
                <h5 className="light_brown_title">
                    {job.jobCat}
                </h5>
                <label>
                    <u>Job description</u>
                </label>
                <p>
                    {this.formatDesc(job.description)}
                </p>

                <label>
                    <u>Start Time</u>
                </label>
                <p>
                    {this.formatTime(job.startTime)}
                </p>
                <label>
                    <u>End Date</u>
                </label>
                <p>
                    {this.formatDate(job.endDate)}
                </p>

                <label>
                    <u>Rate</u>
                </label>
                <p>
                    {job.rate}
                </p>
            </div>
        );
    }

    render() {
        const options = categories.map(function(elem) {
            return (
                <option value={categories[elem]}>
                    {elem}
                </option>
            );
        });

        let {jobs} = this.props;
        let jobsList = jobs && jobs.jobsList;

        if (!jobsList) {
            return (
                <div className="container-fluid">
                    <article className="row-fluid search_jobs">
                        <section className="col-md-6 col-md-offset-3">
                            <form onSubmit={this.onSubmit}>
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
                                    <option value="" disabled />
                                    {options}
                                </datalist>
                                <button
                                    type="submit"
                                    id="submit_button"
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                            </form>
                        </section>
                    </article>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                <article className="row-fluid search_jobs">
                    <section className="col-md-6 col-md-offset-3">
                        {this.props.isAuthenticated === true
                            ? <Link
                                to="/jobsapplied"
                                className="btn btn-primary pull-right submit_button"
                            >
                                  My applications
                            </Link>
                            : <div className="optional-login pull-right">
                                  Login to see:
                                <Link
                                    to="/login"
                                    className="btn btn-primary pull-right submit_button"
                                >
                                      My applications
                                </Link>
                            </div>}
                        <form onSubmit={this.onSubmit}>
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

                            <button
                                type="submit"
                                className="btn btn-primary submit_button"
                            >
                                Submit
                            </button>
                        </form>
                        <ul className="search_results_ul">
                            {jobsList.map(this.renderJobs)}
                        </ul>
                    </section>
                </article>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const isAuthenticated =
        state.auth &&
        state.auth.response &&
        state.auth.response.isAuthenticated;

    return {
        jobs: state.searchJobs.jobsRequest.response,
        SearchTerm: state.searchJobs.searchTerm,
        selectedJob: state.searchJobs.selectedJob,
        isAuthenticated,
    };
}

export default connect(mapStateToProps, actions)(BrowseJobs);
