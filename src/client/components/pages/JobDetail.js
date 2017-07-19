import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/search_jobs.js';

class JobDetail extends Component {
    constructor() {
        super();
        this.toObject = this.toObject.bind.this;
    }

    toObject(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i) rv[arr[i].job_id] = arr[i];
        return rv;
    }

    render() {
        return (
            <div>
                <p>JobDetail</p>
                <h2
                    onMouseOver={() => {
                        var rv = {};
                        var arr = this.props.jobs;
                        for (var i = 0; i < arr.length; ++i)
                            rv[arr[i].job_id] = arr[i];
                        console.log(rv);
                    }}
                >
                    DETAILS
                </h2>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        job_id: ownProps.params.id,
        jobs: state.searchJobs.jobsRequest.response.jobsList
    };
}

export default connect(mapStateToProps, actions)(JobDetail);
