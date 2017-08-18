import React, {Component} from 'react';
import * as actions from '../actions/post_job.js';
import {connect} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import DropdownList from 'react-widgets/lib/DropdownList';
import categories from '../constants/job_categories.js';
import LoadingIndicator from 'react-loading-indicator';

class Form_Post_Job extends Component {
    constructor() {
        super();
        this._onSubmit = this._onSubmit.bind(this);
        this._onChangeStartDate = this._onChangeStartDate.bind(this);
        this._onChangeStartTime = this._onChangeStartTime.bind(this);
        this._onChangeEndDate = this._onChangeEndDate.bind(this);
        this._onChangeEndTime = this._onChangeEndTime.bind(this);
        this._onChangeTitle = this._onChangeTitle.bind(this);
        this._onChangeRate = this._onChangeRate.bind(this);
        this._onChangeDescription = this._onChangeDescription.bind(this);
        this._onChangeCategory= this._onChangeCategory.bind(this);
        

        this.state = {
            jobData: {},
            errorMessage: '',
        };
    }

    _onSubmit(evt) {
        evt.preventDefault();

        var {jobData} = this.state;
        jobData.category = jobData.category.value;

        if (!jobData.start_date) {
            var error_message = 'Start Date cannot be empty';
        } else if (!jobData.job_title) {
            error_message = 'Job Title cannot be empty';
        } else if (!jobData.start_time) {
            error_message = 'Start Time cannot be empty';
        } else if (!jobData.end_date) {
            error_message = 'End Date cannot be empty';
        } else if (!jobData.end_time) {
            error_message = 'End Time cannot be empty';
        } else if (!jobData.category) {
            error_message = 'Job Category cannot be empty';
        } else if (!jobData.rate) {
            error_message = 'Rate cannot be empty';
        } else if (isNaN(jobData.rate) === true) {
            error_message = 'Rate must be a number';
        } else if (!jobData.description) {
            error_message = 'Job Description cannot be empty';
        }

        this.setState({errorMessage: error_message});
        if (!error_message) {
            this.props.postJob(this.state.jobData);
            browserHistory.push('/jobposted');
        }
    }

    _onChangeStartDate(evt) {
        var jobData = this.state.jobData;
        this.setState({
            jobData: {
                ...jobData,
                start_date: evt.target.value,
                resident_id: this.props.residentId,
            },
        });
    }

    _onChangeStartTime(evt) {
        var jobData = this.state.jobData;
        this.setState({
            jobData: {
                ...jobData,
                start_time: evt.target.value,
            },
        });
    }

    _onChangeEndDate(evt) {
        var jobData = this.state.jobData;
        this.setState({
            jobData: {
                ...jobData,
                end_date: evt.target.value,
            },
        });
    }

    _onChangeEndTime(evt) {
        var jobData = this.state.jobData;
        this.setState({
            jobData: {
                ...jobData,
                end_time: evt.target.value,
            },
        });
    }

    _onChangeTitle(evt) {
        var jobData = this.state.jobData;
        this.setState({
            jobData: {
                ...jobData,
                job_title: evt.target.value,
            },
        });
    }

    _onChangeDescription(evt) {
        var jobData = this.state.jobData;
        this.setState({
            jobData: {
                ...jobData,
                description: evt.target.value,
            },
        });
    }

    _onChangeRate(evt) {
        var jobData = this.state.jobData;
        this.setState({
            jobData: {
                ...jobData,
                rate: evt.target.value,
            },
        });
    }

    _onChangeCategory(evt) {
        var jobData = this.state.jobData;
        this.setState({
            jobData: {
                ...jobData,
                category: evt,
            },
        });
    }

    render() {
        return (
            <form className="form-group" onSubmit={this._onSubmit}>
                <p>
                    <div
                        className={
                            this.state.errorMessage ? 'alert alert-danger' : ''
                        }
                    >
                        {this.state.errorMessage}
                    </div>
                </p>
                <div className="form-group">
                    <label className="control-label" htmlFor="Start Date">
                        Start Date*
                    </label>
                    <input
                        className="form-control"
                        id="Start Date"
                        type="date"
                        placeholder="Start Date"
                        value={this.state.jobData.start_date}
                        onChange={this._onChangeStartDate}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Job Title">
                        Job Title*
                    </label>
                    <input
                        className="form-control"
                        id="Job Title"
                        type="text"
                        placeholder="Job Title"
                        value={this.state.jobData.job_title}
                        onChange={this._onChangeTitle}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Start Time">
                        Start Time*
                    </label>
                    <input
                        className="form-control"
                        id="Start Time"
                        type="time"
                        placeholder="Start Time"
                        value={this.state.jobData.stat_time}
                        onChange={this._onChangeStartTime}
                    />
                </div>

                <div className="form-group">
                    <label className="control-label" htmlFor="End Date">
                        End Date*
                    </label>
                    <input
                        className="form-control"
                        id="End Date"
                        type="date"
                        placeholder="End Date"
                        value={this.state.jobData.end_date}
                        onChange={this._onChangeEndDate}
                    />
                </div>

                <div className="form-group">
                    <label className="control-label" htmlFor="End Time">
                        End Time*
                    </label>
                    <input
                        className="form-control"
                        id="End Time"
                        type="time"
                        placeholder="End Time"
                        value={this.state.jobData.end_time}
                        onChange={this._onChangeEndTime}
                    />
                </div>

                <div className="form-group">
                    <label className="control-label" htmlFor="Job categories">
                        Job category*
                    </label>
                    <DropdownList
                        data={categories}
                        textField='value'
                        placeholder="Select a job category"
                        onChange={this._onChangeCategory}
                        groupBy='group'
                    />
                </div>
                
                <div className="form-group">
                    <label className="control-label" htmlFor="Rate">
                        Rate* (in £)
                    </label>
                    <input
                        className="form-control"
                        id="Rate"
                        type="text"
                        placeholder="Rate"
                        value={this.state.jobData.rate}
                        onChange={this._onChangeRate}
                    />
                </div>

                <div className="form-group">
                    <label className="control-label" htmlFor="Job description">
                        Job description*
                    </label>
                    <textarea
                        className="form-control"
                        name="Job description"
                        id="Job description"
                        cols="50"
                        rows="6"
                        value={this.state.jobData.description}
                        onChange={this._onChangeDescription}
                    >
                        Job description
                    </textarea>

                    <div>
                        {this.props.postJobRequestStatus === 'pending'
                            ? <LoadingIndicator />
                            : <button className="btn btn-primary" type="submit">
                                  Submit
                            </button>}
                    </div>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    var residentId =
        state.auth && state.auth.response && state.auth.response.id;
    return {
        newJob: state.postJob.newJob.response,
        errorMessage: state.errorMessage,
        postJobRequestStatus: state.postJob.newJob.status,
        residentId,
    };
}

export default connect(mapStateToProps, actions)(Form_Post_Job);
