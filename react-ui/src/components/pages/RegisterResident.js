import React, {Component} from 'react';
import Form_Register_Resident from '../Form_Register_Resident.js';
import * as actions from '../../actions/register_resident.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class RegisterResident extends Component {
    render() {
        if (this.props.registered === 'success') {
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
            <div className="container-fluid register_container">
                <div className="row-fluid">
                    <div className="col-md-4 col-md-offset-4 ">
                        <h3>Resident Registration</h3>

                        <p>
                            <i>Fields marked with * are mandatory</i>
                        </p>
                        <Form_Register_Resident
                            registerResident={this.props.registerResident}
                            checkIfResidentExists={
                                this.props.checkIfResidentExists
                            }
                        />
                    </div>
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
