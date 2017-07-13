import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

class BrowseJobs extends Component {
    constructor() {
        super();
        this.renderJobs = this.renderJobs.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onChange = this._onChange.bind(this);
        this.state = {
            data: {},
            term: ''
        };
    }

    componentWillMount() {
        // Axios.get('/api/jobs').then(response => {
        //     var data = response.data;
        //     this.setState({data});
        // });
    }

    formatDate(date) {
        return date.slice(0, 10);
    }

    formatTime(time) {
        return time.slice(0, 5);
    }

    _onSubmit(evt) {
        evt.preventDefault();
        console.log(this.state.term);
        Axios.get('/api/jobs').then(response => {
            var data = response.data;
            this.setState({data});
        });
    }

    _onChange(evt) {
        this.setState({term: evt.target.value});
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
        let data = this.state.data.jobsList;

        if (!data) {
            return (
                <form onSubmit={this._onSubmit}>
                    <label className="form__field-label" htmlFor="Browse Jobs">
                        Browse Jobs
                    </label>
                    <input
                        className="form__field-input"
                        id="Browse Jobs"
                        placeholder="Browse Jobs"
                        onChange={this._onChange}
                        value={this.state.term}
                    />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            );
        }
        return (
            <article>
                <section className="text-section">
                    <form onSubmit={this._onSubmit}>
                        <label
                            className="form__field-label"
                            htmlFor="Browse Jobs"
                        >
                            Browse Jobs
                        </label>
                        <input
                            className="form__field-input"
                            id="Browse Jobs"
                            placeholder="Browse Jobs"
                            onChange={this._onChange}
                            value={this.state.term}
                        />
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                    <ul>
                        {data.map(this.renderJobs)}
                    </ul>
                </section>
            </article>
        );
    }
}

function select(state) {
    return {data: state};
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(BrowseJobs);
