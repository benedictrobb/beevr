import React, {Component} from 'react';
import Form_Register_Resident from '../Form_Register_Resident.js';
import LoadingIndicator from '../LoadingIndicator.js';
import {Router, Route, IndexRoute, browseHistory} from 'react-router';
import * as actions from '../../actions/register_resident.js';
import {connect} from 'react-redux';

class RegisterResident extends Component {
    render() {
        //const dispatch = this.props.dispatch;
        //const {formState, currentlySending} = this.props.data;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h2>Register As Resident</h2>
                    <Form_Register_Resident
                        btnText={'Sign Up'}
                        registerResident={this.props.registerResident}
                        checkIfResidentExists={this.props.checkIfResidentExists}
                    />
                </div>
            </div>
        );
    }
}

// Register a user
//_register(username, password) {
//this.props.dispatch(_register(username, password));
//}

function mapStateToProps(state) {
    return {
        resident: state.registerResident.resident.response,
    };
}
export default connect(mapStateToProps, actions)(RegisterResident);
