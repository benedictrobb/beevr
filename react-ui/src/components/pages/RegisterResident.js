import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form_Register_Resident from '../Form_Register_Resident.js';
import LoadingIndicator from '../LoadingIndicator.js';
import * as actions from '../../actions/register_resident.js';
import {Router, Route, IndexRoute, browseHistory} from 'react-router';

class RegisterResident extends Component {
    render() {
        const dispatch = this.props.dispatch;
        //const {formState, currentlySending} = this.props.data;
        return (
            <div className="form-page__wrapper">
                <div className="form-page__form-wrapper">
                    <div className="form-page__form-header">
                        <h2 className="form-page__form-heading">Register as resident</h2>
                    </div>
                    {/* While the form is sending, show the loading indicator,
                        otherwise show "Register" on the submit button */}
                    <Form_Register_Resident
                        //data={formState}
                        dispatch={dispatch}
                        history={this.props.history}
                        //onSubmit={this._register.bind(this)}
                        btnText={'Register'}
                        //currentlySending={currentlySending}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        resident: state.registerResident.resident.response
    };
}

export default connect(mapStateToProps, actions)(RegisterResident);

    // Register a user
    //_register(username, password) {
    //this.props.dispatch(_register(username, password));
    //}
