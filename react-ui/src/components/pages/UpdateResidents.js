import React, {Component} from 'react';
import Form_Update_Resident from '../Form_Update_Resident.js';
import {registerResident} from '../../actions/register_resident.js';
import {fetchResidents} from '../../actions/update_resident.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class UpdateResidents extends Component {
    componentWillMount() {
        this.props.fetchResidents();
    }

    render() {
        if (this.props.status === 'success') {
            return (
                <div className="parent-container">
                    <div>
                        <div className="flex-container">
                            <img
                                className="success_image"
                                src={require('../../utils/lemmling-Cartoon-beaver.svg')}
                            />
                        </div>

                        <div className="flex-container">
                            <h3 className="success_message">
                                PROFILE UPDATED SUCCESSFULLY!
                            </h3>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="container-fluid register_container">
                <div className="row-fluid">
                    <div className="col-md-4 col-md-offset-4 ">
                        <h3>Update your resident profile</h3>

                        <p>
                            <i>Fields marked with * are mandatory</i>
                        </p>

                        <Form_Update_Resident
                            onEnter={this.props.fetchResidents}
                            residentToUpdate={this.props.residentToUpdate}
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
    let residentToUpdate =
        state.searchResidents.residentsRequest.response &&
        state.searchResidents.residentsRequest.response.residentList[0];

    return {
        resident: state.searchResidents.residentsRequest.response,
        status: state.updateResident.resident.status,
        residentToUpdate,
    };
}

export default connect(mapStateToProps, {registerResident, fetchResidents})(
    UpdateResidents
);
