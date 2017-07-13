import React, {Component} from 'react';
import {connect} from 'react-redux';

import Form_Register_Student from '../Form_Register_Student.js';
import {sendingRequest, register} from '../../actions/AppActions';
import LoadingIndicator from '../LoadingIndicator.js';
import * as actions from '../../actions/register_student'

class RegisterPage extends Component {
    render() {
        const dispatch = this.props.dispatch;
        const {formState, currentlySending} = this.props;
        return (
            <div className="form-page__wrapper">
                <div className="form-page__form-wrapper">
                    <div className="form-page__form-header">
                        <h2 className="form-page__form-heading">Register</h2>
                    </div>
                    {/* While the form is sending, show the loading indicator,
                        otherwise show "Register" on the submit button */}
                    <Form_Register_Student
                        data={formState}
                        dispatch={dispatch}
                        location={location}
                        history={this.props.history}
                        onSubmit={this.props.register}
                        btnText={'Register'}
                        currentlySending={currentlySending}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.home;
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, actions)(RegisterPage);
