import React, {Component} from 'react';
import Form_Register_Resident from '../Form_Register_Resident.js';
import LoadingIndicator from '../LoadingIndicator.js';
import {Router, Route, IndexRoute, browseHistory} from 'react-router';

class RegisterResident extends Component {
    render() {
        const dispatch = this.props.dispatch;
        //const {formState, currentlySending} = this.props.data;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h2>Register As Resident</h2>
                    <Form_Register_Resident
                        btnText={'Sign Up'}
                    />
                </div>
            </div>
        );
    }
}

export default RegisterResident; 
    // Register a user
    //_register(username, password) {
    //this.props.dispatch(_register(username, password));
    //}
