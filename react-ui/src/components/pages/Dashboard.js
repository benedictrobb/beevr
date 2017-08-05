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
        axios.post('/api/auth').then(response => {
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

function mapStateToProps(state) {
    return {data: state};
}

export default connect(mapStateToProps)(Dashboard);
