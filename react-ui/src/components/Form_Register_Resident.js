import React, {Component} from 'react';
import LoadingButton from './LoadingButton.js';
import ErrorMessage from './ErrorMessage.js';
import {Router, Route, IndexRoute, browseHistory} from 'react-router';

class Form_Register_Resident extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeResidentFirstName = this.onChangeResidentFirstName.bind(this);
        this.onChangeResidentLastName = this.onChangeResidentLastName.bind(this);
        this.onChangeResidentEmail = this.onChangeResidentEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePicture = this.onChangePicture.bind(this);

        this.state = {
            resident: {
            }
        };
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.registerResident(this.state.resident);
    }

    onChangeResidentFirstName(evt) {
        var resident = this.state.resident;
        this.setState({
            resident: {
                ...resident,
                firstName: evt.target.value
            }
        });
    }

    onChangeResidentLastName(evt) {
        var resident = this.state.resident;
        this.setState({
            resident: {
                ...resident,
                lastName: evt.target.value
            }
        });
    }

    onChangeResidentEmail(evt) {
        var resident = this.state.resident;
        this.setState({
            resident: {
                ...resident,
                residentEmail: evt.target.value
            }
        });
    }

    onChangePassword(evt) {
        var resident = this.state.resident;
        this.setState({
            resident: {
                ...resident,
                password: evt.target.value
            }
        });
    }

    onChangeDOB(evt) {
        var resident = this.state.resident;
        this.setState({
            resident: {
                ...resident,
                DOB: evt.target.value
            }
        });
    }

    onChangeBio(evt) {
        var resident = this.state.resident;
        this.setState({
            resident: {
                ...resident,
                bio: evt.target.value
            }
        });
    }

    onChangePicture(evt) {
        var resident = this.state.resident;
        this.setState({
            resident: {
                ...resident,
                picture: evt.target.value
            }
        });
    }

    onChangePhone(evt) {
        var resident = this.state.resident;
        this.setState({
            resident: {
                ...resident,
                phone: evt.target.value
            }
        });
    }

    render() {
        return (
            <form className="form-group" onSubmit={this.onSubmit}>
                <ErrorMessage />
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="First Name">
                        First Name
                    </label>
                    <input
                        className="form-control"
                        id="First Name"
                        type="text"
                        placeholder="First Name"
                        value={this.state.resident.firstName}
                        onChange={this.onChangeResidentFirstName}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Last Name">
                        Last Name
                    </label>
                    <input
                        className="form-control"
                        id="Last Name"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.resident.lastName}
                        onChange={this.onChangeResidentLastName}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="username">
                        Email
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="username"
                        value={this.state.resident.residentEmail}
                        placeholder="email"
                        onChange={this.onChangeResidentEmail}
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="form-control"
                        id="password"
                        type="password"
                        value={this.state.resident.password}
                        placeholder="password"
                        onChange={this.onChangePassword}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label
                        className="form__field-label"
                        htmlFor="Date Of Birth"
                    >
                        Date of Birth
                    </label>
                    <input
                        className="form-control"
                        id="Date Of Birth"
                        type="text"
                        placeholder="Date Of Birth"
                        value={this.state.resident.DOB}
                        onChange={this.onChangeDOB}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Picture">
                        Profile picture
                    </label>
                    <input
                        className="form-control"
                        id="Picture"
                        type="file"
                        placeholder="Picture"
                        value={this.state.resident.picture}
                        onChange={this.onChangePicture}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Phone number">
                        Phone number
                    </label>
                    <input
                        className="form-control"
                        id="Phone number"
                        type="text"
                        placeholder="Phone number"
                        value={this.state.resident.phone}
                        onChange={this.onChangePhone}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Bio">
                        Bio
                    </label>
                    <input
                        className="form-control"
                        id="Bio"
                        type="text"
                        placeholder="Bio"
                        value={this.state.resident.bio}
                        onChange={this.onChangeBio}
                    />
                </div>
                <div className="form__submit-btn-wrapper">
                    {this.props.currentlySending
                        ? <LoadingButton />
                        : <button className="btn btn-primary" type="submit">
                            {this.props.btnText}
                        </button>}
                </div>
            </form>
        );
    }

}

//Form_Register_Resident.propTypes = {
//onSubmit: React.PropTypes.func.isRequired,
//btnText: React.PropTypes.string.isRequired,
//data: React.PropTypes.object.isRequired
//};
