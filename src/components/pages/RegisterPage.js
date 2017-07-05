/*
 * RegisterPage
 *
 * Users login on this page
 * Route: /register
 *
 */

import React, { Component} from 'react';
import { connect } from 'react-redux';
import Form_Register_Student from '../Form_Register_Student.js';
import { sendingRequest, register } from '../../actions/AppActions';
import LoadingIndicator from '../LoadingIndicator.js';

class RegisterPage extends Component {
    render() {
        const dispatch = this.props.dispatch;
        const { formState, currentlySending } = this.props.data;
    return (
            <div className="form-page__wrapper">
                <div className="form-page__form-wrapper">
                    <div className="form-page__form-header">
                        <h2 className="form-page__form-heading">Register</h2>
                    </div>
                    {/* While the form is sending, show the loading indicator,
                        otherwise show "Register" on the submit button */}
                <Form_Register_Student data={formState} dispatch={dispatch} location={location} history={this.props.history}
                 onSubmit={this._register.bind(this)} btnText={"Register"} currentlySending={currentlySending}/>
                </div>
            </div>
        );
  }

    // Register a user
    _register(username, password) {
        this.props.dispatch(register(username, password));
    }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(RegisterPage);
