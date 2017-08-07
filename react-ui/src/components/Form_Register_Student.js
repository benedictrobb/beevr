import React, {Component} from 'react';
import ErrorMessage from './ErrorMessage.js';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import MultiSelectField from './Multiselect.js';

class Form_Register_Student extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeJobCategories = this.onChangeJobCategories.bind(this);
        this.checkEmail = this.checkEmail.bind(this);

        this.state = {
            student: {
                jobCategories: {},
            },
            errorMessage: '',
            loggedIn: false,
            isAuthenticated: false,
        };
    }

    checkEmail(value) {
        value = this.state.student.email;
        if (value !== '') {
            this.props.checkIfStudentExists(value);
        }
    }

    onSubmit(evt) {
        evt.preventDefault();
        var student = this.state.student;
        if (!student.email) {
            var error_message = 'Email cannot be empty';
        }
        this.setState({errorMessage: error_message});
        if (!this.state.errorMessage) {
            this.props.registerStudent(student);
            browserHistory.push('/dashboard');
        }
    }

    onChange(evt) {
        var student = this.state.student;
        this.setState({
            student: {
                ...student,
                [evt.target.name]: evt.target.value,
            },
        });
    }

    onChangeJobCategories(evt) {
        var student = this.state.student;
        var jobCategories = student.jobCategories;
        this.setState({
            student: {
                ...student,
                jobCategories: [...jobCategories, evt.target.value],
            },
        });
    }

    render() {
        //const options = categories.map(function(elem) {
            //if (elem.indexOf('Beavers') != -1) {
                //var option = (
                    //<option className="dropdwn-header" value={categories[elem]}>
                        //{elem}
                    //</option>
                //);
            //} else {
                //option = (
                    //<option value={categories[elem]}>
                        //{elem}
                    //</option>
                //);
            //}
            //return option;
        //});

        if (!this.state) {
            return <div>Loading</div>;
        }

        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div
                    className="form-group"
                    className={
                        this.state.errorMessage ? 'alert alert-danger' : ''
                    }
                >
                    {this.state.errorMessage}
                </div>
                <ErrorMessage />
                <div className="form-group">
                    <label className="control-label" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="form-control"
                        name="firstName"
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={this.state.student.firstName}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="form-control"
                        name="lastName"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.student.lastName}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="form-control"
                        name="email"
                        id="email"
                        type="email"
                        value={this.state.student.email}
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
                        id="password"
                        type="password"
                        value={this.state.student.password}
                        placeholder="password"
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="confirmPassword">
                        Confirm password
                    </label>
                    <input
                        className="form-control"
                        name="confirmPassword"
                        id="password"
                        type="password"
                        value={this.state.student.confirmPassword}
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
                        value={this.state.student.DOB}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form-group">
                    <label className="control-label" htmlFor="universitySchool">
                        University/School
                    </label>
                    <input
                        className="form-control"
                        name="univSchool"
                        id="universitySchool"
                        type="text"
                        placeholder="University/School"
                        value={this.state.student.univSchool}
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
                        value={this.state.student.bio}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form-group">
                    <label className="control-label" htmlFor="picture">
                        Profile picture
                    </label>
                    <input
                        className="form-control"
                        name="picture"
                        id="picture"
                        type="file"
                        placeholder="Picture"
                        value={this.state.student.picture}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form-group">
                    <label className="control-label" htmlFor="phoneNumber">
                        Phone number
                    </label>
                    <input
                        className="form-control"
                        name="phone"
                        id="phoneNumber"
                        type="text"
                        placeholder="Phone number"
                        value={this.state.student.phone}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form-group">
                    <label
                        className="control-label"
                        name="jobCategories"
                        htmlFor="jobCategories"
                    >
                        Your job categories
                    </label>
                    <MultiSelectField />
                </div>
                <div>
                    {this.props.currentlySending
                        ? <div />
                        : <button className="btn btn-primary" type="submit">
                            {this.props.btnText}
                        </button>}
                </div>
            </form>
        );
    }
}

export default Form_Register_Student;
