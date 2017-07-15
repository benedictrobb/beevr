import React, {Component} from 'react';
import {changeForm} from '../actions/AppActions';
import LoadingButton from './LoadingButton.js';
import ErrorMessage from './ErrorMessage.js';
import axios from 'axios';
import * as actions from '../actions/post_job.js';
import {connect} from 'react-redux';

class Form_Post_Job extends Component {
    constructor() {
        super();
        this._onSubmit = this._onSubmit.bind(this);
        this._onChangeStartDate=this._onChangeStartDate.bind(this);
        this._onChangeStartTime=this._onChangeStartTime.bind(this);
        this._onChangeEndDate=this._onChangeEndDate.bind(this);
        this._onChangeEndTime=this._onChangeEndTime.bind(this);
        this._onChangeTitle=this._onChangeTitle.bind(this);
        this._onChangeRate=this._onChangeRate.bind(this);
        this._onChangeDescription= this._onChangeDescription.bind(this);
        this._onChangeCategory=this._onChangeCategory.bind(this);

        this.state = { jobData: {} };
    }

    _onSubmit(evt) {
      evt.preventDefault();
      console.log('inside onSubmit');
        this.props.postJob(this.state.jobData);
    }

    _onChangeStartDate(evt) {
      console.log(this.state);
        this.setState(this.state.jobData:{ start_date: event.target.value });
    }

    _onChangeStartTime(evt) {
        this.setState(this.state.jobData: { start_time: event.target.value });
    }

    _onChangeEndDate(evt) {
        this.setState(this.state.jobData: {end_date: event.target.value });
    }

    _onChangeEndTime(evt) {
        this.setState(this.state.jobData: {end_time: event.target.value });
    }

    _onChangeTitle(evt) {
        this.setState(this.state.jobData: {job_title: event.target.value });
    }

    _onChangeDescription(evt) {
        this.setState(this.state.jobData: {description: event.target.value });
    }

    _onChangeRate(evt) {
        this.setState(this.state.jobData: {rate: event.target.value });
    }

    _onChangeCategory(evt) {
        this.setState(this.state.jobData: {category: event.target.value });
    }

    render() {
      if (!this.state){
        return <div>Loading</div>;
      }
        return (
            <form className="form-group" onSubmit={this._onSubmit}>
                <ErrorMessage />
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Start Date">
                        Start Date
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
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Job Title">
                        Job Title
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
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Start Time">
                        Start Time
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

                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="End Date">
                        End Date
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

                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="End Time">
                        End Time
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

                <label className="form__field-label" htmlFor="Job categories">
                    Select a job category
                </label>
                <input
                    className="form-control"
                    id="job categories"
                    type="text"
                    placeholder="Select a job category"
                    list="jobs"
                    value={this.state.jobData.category}
                    onChange={this._onChangeCategory}
                />
                <datalist id="jobs">
                    <option value="Dog-walking" />
                    <option value="Tutoring- Spanish" />
                    <option value="Home maintenance" />
                    <option value="Tutoring- Mathematics" />
                    <option value="Cat Sitting" />
                    <option value="Plant watering" />
                    <option value="Babysitting" />
                    <option value="Cooking" />
                    <option value="House Cleaning" />
                    <option value="Band playing" />
                    <option value="Photography" />
                    <option value="Other" />
                </datalist>

                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Rate">
                        Rate
                    </label>
                    <input
                        className="form-control"
                        id="Rate"
                        type="text"
                        placeholder="Rate"
                        value={this.state.jobData.rate}
                        onChange={this._onChangeRate}
                    />
                    <label htmlFor="£">£</label>
                </div>

                <div className="form__field-wrapper">
                    <label
                        className="form__field-label"
                        htmlFor="Job description"
                    >
                        Job description
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
                </div>

                <div className="form__submit-btn-wrapper">
                    {this.props.currentlySending
                        ? <LoadingButton />
                        : <button className="btn btn-primary" type="submit">
                              Submit
                        </button>}
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        newJob: state.postJob.newJob.response
    };
}

export default connect(mapStateToProps, actions)(Form_Post_Job);
