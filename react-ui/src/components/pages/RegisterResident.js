import React, {Component} from 'react';
import Form_Register_Resident from '../Form_Register_Resident.js';
import {Router, Route, IndexRoute, browseHistory, Link} from 'react-router';
import * as actions from '../../actions/register_resident.js';
import {connect} from 'react-redux';

class RegisterResident extends Component {
    render() {
        return (
            <div className="container-fluid register_container">
                <div className="row-fluid">
                    <div className="col-md-4 col-md-offset-4 ">
                        <h3>Resident Registration</h3>

                        <p>
                            <i>Fields marked with * are mandatory</i>
                        </p>
                        <Form_Register_Resident
                            btnText={'Sign Up'}
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
    };
}
export default connect(mapStateToProps, actions)(RegisterResident);
