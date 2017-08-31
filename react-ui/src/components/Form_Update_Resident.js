import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/update_resident.js';
import LoadingIndicator from 'react-loading-indicator';

class Form_Update_Resident extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkEmail = this.checkEmail.bind(this);

        this.state = {
            resident: {},
            errorMessage: '',
        };
    }

    checkEmail(value) {
        value = this.state.resident.email;
        if (value !== '') {
            this.props.checkIfResidentExists(value);
        }
    }

    onSubmit(evt) {
        evt.preventDefault();
        var {
            firstName,
            lastName,
            dob,
            email,
            password,
            bio,
            picture,
            phone,
            address,
            // confirmPassword,
        } = this.props.residentToUpdate;

        var firstName = this.state.resident.firstName || firstName;
        var lastName = this.state.resident.lastName || lastName;
        var email = this.state.resident.email || email;
        var password = this.state.resident.password || password;
        var DOB = this.state.resident.DOB || dob;
        var bio = this.state.resident.bio || bio;
        var picture = this.state.resident.picture || picture;
        var phone = this.state.resident.phone || phone;
        var univSchool = this.state.resident.address || address;
        var confirmPassword =
            this.state.resident.confirmPassword || confirmPassword;

        this.setState(
            {
                resident: {
                    firstName,
                    lastName,
                    email,
                    password,
                    DOB,
                    bio,
                    picture,
                    phone,
                    address,
                    confirmPassword,
                },
            },
            () => {
                var resident = this.state.resident;

                var {resident} = this.state;

                if (!resident.firstName) {
                    var errorMessage = 'First Name cannot be empty';
                } else if (!resident.lastName) {
                    errorMessage = 'Last Name cannot be empty';
                } else if (!resident.email) {
                    errorMessage = 'Email cannot be empty';
                } else if (!resident.password) {
                    errorMessage = 'Password cannot be empty';
                } else if (!this.state.resident.confirmPassword) {
                    errorMessage = 'Please confirm the password';
                } else if (resident.password !== resident.confirmPassword) {
                    errorMessage = 'Passwords do not match';
                } else if (!resident.address) {
                    errorMessage = 'Address cannot be empty';
                } else if (!resident.phone) {
                    errorMessage = 'Phone cannot be empty';
                }

                this.setState({errorMessage: errorMessage}, () => {
                    if (!errorMessage) {
                        this.props.registerResident(this.state.resident);
                    }
                });
            }
        );
    }

    onChange(evt) {
        var resident = this.state.resident;
        this.setState({
            resident: {
                ...resident,
                [evt.target.name]: evt.target.value,
            },
        });
    }

    render() {
        let residentToUpdate = new Object();

        for (var key in this.props.residentToUpdate) {
            residentToUpdate[key] = this.props.residentToUpdate[key];
        }

        return (
            <form className="form" onSubmit={this.onSubmit}>
                <p>
                    <div
                        className={
                            this.state.errorMessage ? 'alert alert-danger' : ''
                        }
                    >
                        {this.state.errorMessage}
                    </div>
                </p>

                <div className="form-group">
                    <label className="control-label" htmlFor="firstName">
                        First Name*
                    </label>
                    <input
                        className="form-control"
                        name="firstName"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={
                            this.state.resident.firstName ||
                            residentToUpdate.firstName
                        }
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="lastName">
                        Last Name*
                    </label>
                    <input
                        className="form-control"
                        name="lastName"
                        id="Last Name"
                        type="text"
                        placeholder="Last Name"
                        value={
                            this.state.resident.lastName ||
                            residentToUpdate.lastName
                        }
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="email">
                        Email*
                    </label>
                    <input
                        className="form-control"
                        name="email"
                        id="email"
                        type="email"
                        value={
                            this.state.resident.email || residentToUpdate.email
                        }
                        placeholder="Email"
                        onChange={this.onChange}
                        onBlur={this.checkEmail}
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="password">
                        Password*
                    </label>
                    <input
                        className="form-control"
                        name="password"
                        id="Password"
                        type="Password"
                        value={
                            this.state.resident.password ||
                            residentToUpdate.password
                        }
                        placeholder="password"
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="confirmPassword">
                        Confirm password*
                    </label>
                    <input
                        className="form-control"
                        name="confirmPassword"
                        id="Password"
                        type="password"
                        value={
                            this.state.resident.confirmPassword ||
                            residentToUpdate.confirmPassword
                        }
                        placeholder="Confirm password"
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="dateOfBirth">
                        Date of Birth
                    </label>
                    <input
                        className="form-control"
                        name="DOB"
                        id="dateOfBirth"
                        type="date"
                        placeholder="Date Of Birth"
                        value={this.state.resident.DOB || residentToUpdate.dob}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Address">
                        Address*
                    </label>
                    <input
                        className="form-control"
                        name="address"
                        id="Address"
                        type="text"
                        placeholder="Address"
                        value={
                            this.state.resident.address ||
                            residentToUpdate.address
                        }
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="bio">
                        Bio
                    </label>
                    <input
                        className="form-control"
                        name="bio"
                        id="bio"
                        type="text"
                        placeholder="Tell us more about you..."
                        value={this.state.resident.bio || residentToUpdate.bio}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="picture">
                        Profile picture url
                    </label>
                    <input
                        className="form-control"
                        name="picture"
                        id="picture"
                        type="text"
                        placeholder="Paste url of your picture"
                        value={
                            this.state.resident.picture ||
                            residentToUpdate.picture
                        }
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="phoneNumber">
                        Phone number*
                    </label>
                    <input
                        className="form-control"
                        name="phone"
                        id="phoneNumber"
                        type="text"
                        placeholder="Phone number"
                        value={
                            this.state.resident.phone || residentToUpdate.phone
                        }
                        onChange={this.onChange}
                    />
                </div>

                <div className="button">
                    {this.props.registerRequestStatus === 'pending'
                        ? <LoadingIndicator />
                        : <button className="btn btn-primary" type="submit">
                              Update
                        </button>}
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    let residentToUpdate =
        state.searchResidents.residentsRequest.response &&
        state.searchResidents.residentsRequest.response.residentList[0];

    if (residentToUpdate && residentToUpdate.dob) {
        residentToUpdate.dob = residentToUpdate.dob.slice(0, 10);
    }
    return {
        registerRequestStatus: state.registerResident.resident.status,
    };
}

export default connect(mapStateToProps, actions)(Form_Update_Resident);
