// Students dashboard?
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import * as actions from '../../actions/student_dashboard'

class Dashboard extends Component {
    constructor() {
        super();
        console.log('in dashboard component');
    }

    componentWillMount() {
      this.props.fetchJobs()
    }

    render() {
      console.log('rendering dashboard');
        let { jobs } = this.props;
        let message = jobs && jobs.message
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
                        {message}
                    </h1>
                </section>
            </article>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return { jobs: state.studentDashboard.jobsRequest.response };
}

export default connect(mapStateToProps, actions)(Dashboard);
