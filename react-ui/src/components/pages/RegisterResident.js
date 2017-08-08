import React, {Component} from 'react';
import Form_Register_Resident from '../Form_Register_Resident.js';
import {Router, Route, IndexRoute, browseHistory, Link} from 'react-router';
import * as actions from '../../actions/register_resident.js';
import {connect} from 'react-redux';

class RegisterResident extends Component {
    render() {
        if (this.props.registered) {
            return (
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div>Registration successful!</div>
                        <Link to="/login">Login to continue</Link>
                    </div>
                </div>
            );
        }
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

function mapStateToProps(state) {
    return {
        resident: state.registerResident.resident.response,
        registered: state.registerResident.resident.status,
    };
}
export default connect(mapStateToProps, actions)(RegisterResident);
