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
    }

    _onSubmit() {
        console.log('inside onSubmit');
        this.props.postJob();
        //     axios
        //         .post('/api/jobs', {
        //             start_date: '03/07/2017',
        //             start_time: '12:00',
        //             end_date: '12/12/12',
        //             end_time: '07:00',
        //             job_title: 'Hello Chello',
        //             description: 'Lorem Ipsum',
        //             rate: '100.00',
        //             resident_id: '1',
        //             category: 'horse riding'
        //         })
        //         .then(function(response) {
        //             console.log(response);
        //         })
        //         .catch(function(error) {
        //             console.log(error);
        //         });
    }
    render() {
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
