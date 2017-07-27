import React, {Component} from 'react';
import LoadingButton from './LoadingButton.js';
import ErrorMessage from './ErrorMessage.js';

class Form_Register_Resident extends Component {
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
        var resident = this.state.resident;
        if (!resident.email) {
            var error_message = 'Email cannot be empty';
        }
        this.setState({errorMessage: error_message}, () => {
            if (!this.state.errorMessage) {
                this.props.registerResident(this.state.resident);
            }
        });
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
        return (
            <form className="form" onSubmit={this.onSubmit}>
                <ErrorMessage />
                <div className="form-group">
                    <label className="control-label" htmlFor="First Name">
                        First Name
                    </label>
                    <input
                        className="form-control"
                        name="first_name"
                        id="First Name"
                        type="text"
                        placeholder="First Name"
                        value={this.state.resident.first_name}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Last Name">
                        Last Name
                    </label>
                    <input
                        className="form-control"
                        name="last_name"
                        id="Last Name"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.resident.last_name}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Email">
                        Email
                    </label>
                    <input
                        className="form-control"
                        name="email"
                        id="Email"
                        type="email"
                        value={this.state.resident.email}
                        placeholder="email"
                        onChange={this.onChange}
                        onBlur={this.checkEmail}
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="form-control"
                        name="password"
                        id="Password"
                        type="password"
                        value={this.state.resident.password}
                        placeholder="password"
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Confirm password">
                        Confirm password
                    </label>
                    <input
                        className="form-control"
                        name="confirmPassword"
                        id="Password"
                        type="password"
                        value={this.state.resident.confirmPassword}
                        placeholder="Confirm password"
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Date Of Birth">
                        Date of Birth
                    </label>
                    <input
                        className="form-control"
                        name="DOB"
                        id="Date Of Birth"
                        type="date"
                        placeholder="Date Of Birth"
                        value={this.state.resident.DOB}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Address">
                        Address
                    </label>
                    <input
                        className="form-control"
                        name="address"
                        id="Address"
                        type="text"
                        placeholder="Address"
                        value={this.state.resident.address}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Bio">
                        Bio
                    </label>
                    <input
                        className="form-control"
                        name="bio"
                        id="Bio"
                        type="text"
                        placeholder="Bio"
                        value={this.state.resident.bio}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Picture">
                        Profile picture
                    </label>
                    <input
                        className="form-control"
                        name="picture"
                        id="Picture"
                        type="file"
                        placeholder="Picture"
                        value={this.state.resident.picture}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Phone number">
                        Phone number
                    </label>
                    <input
                        className="form-control"
                        name="phone"
                        id="Phone number"
                        type="text"
                        placeholder="Phone number"
                        value={this.state.resident.phone}
                        onChange={this.onChange}
                    />
                </div>
                <div>
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

export default Form_Register_Resident;
