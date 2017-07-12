import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form_Register_Resident from '../Form_Register_Resident.js';
import {sendingRequest, register} from '../../actions/AppActions';
import LoadingIndicator from '../LoadingIndicator.js';

class RegisterResident extends Component {
    render() {
        const dispatch = this.props.dispatch;
        const {formState, currentlySending} = this.props.data;
        return (
            <div className="form-page__wrapper">
                <div className="form-page__form-wrapper">
                    <div className="form-page__form-header">
                        <h2 className="form-page__form-heading">Register</h2>
                    </div>
                    {/* While the form is sending, show the loading indicator,
                        otherwise show "Register" on the submit button */}
                    <Form_Register_Resident
                        data={formState}
                        dispatch={dispatch}
                        location={location}
                        history={this.props.history}
                        onSubmit={this._register.bind(this)}
                        btnText={'Register'}
                        currentlySending={currentlySending}
                    />
                </div>
            </div>
        );
    }

    // Register a user
    _register(username, password) {
        this.props.dispatch(register(username, password));
    }
}

function select(state) {
    return {data: state};
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(RegisterResident);
