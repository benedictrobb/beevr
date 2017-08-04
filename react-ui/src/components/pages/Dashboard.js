import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
        };
    }

    componentWillMount() {
        axios.get('/api/jobs').then(response => {
            var data = response.data;
            this.setState({data});
        });
    }

    render() {
        let data = this.state.data;
        return (
            <article>
                <section className="text-section">
                    <Link to="/browsejobs" className="btn btn--login btn--nav">
                        <h2>Student</h2>
                    </Link>
                    <Link
                        to="/browsestudents"
                        className="btn btn--login btn--nav"
                    >
                        <h2>Resident</h2>
                    </Link>
                    <h1>
                        {data.message}
                    </h1>
                </section>
            </article>
        );
    }
}

// Which props do we want to inject, given the global state?
function select(state) {
    return {data: state};
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Dashboard);
