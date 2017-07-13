import React, {Component} from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

class BrowseJobs extends Component {
    constructor() {
        super();
        this.renderJobs = this.renderJobs.bind(this);
        this.state = {
            data: {}
        };
    }

    componentWillMount() {
        Axios.get('/api/jobs').then(response => {
            console.log(response);
            var data = response.data;
            this.setState({data});
        });
    }

    renderJobs(job) {
        return (
            <div>
                <h2>
                    {job.category}
                </h2>
                <p>
                    {' '}{job.description}{' '}
                </p>
                <label>Start Date</label>
                <p>
                    {job.start_date}
                </p>
                <label>Start Time</label>
                <p>
                    {job.start_time}
                </p>
            </div>
        );
    }
    render() {
        let data = this.state.data.jobsList;

        if (!data) {
            return <div>Loading</div>;
        }
        return (
            <article>
                <section className="text-section">
                    <label className="form__field-label" htmlFor="Browse Jobs">
                        Browse Jobs
                    </label>
                    <input
                        className="form__field-input"
                        id="Browse Jobs"
                        placeholder="Browse Jobs"
                    />
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
