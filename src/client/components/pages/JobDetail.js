import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/search_jobs.js';

class JobDetail extends Component {
    constructor() {
        super();
    }

    render() {
        return <p>JobDetail</p>;
    }
}

function mapStateToProps(state) {
    return {
        jobs: state.searchJobs.jobsRequest.response,
        SearchTerm: state.searchJobs.term
    };
}

export default connect(mapStateToProps, actions)(JobDetail);
