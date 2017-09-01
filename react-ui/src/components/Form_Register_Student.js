import React, {Component} from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import categories from '../constants/job_categories.js';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/register_student.js';
import LoadingIndicator from 'react-loading-indicator';

class Form_Register_Student extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeJobCategories = this.onChangeJobCategories.bind(this);
        this.checkEmail = this.checkEmail.bind(this);

        this.state = {
            errorMessage: '',
            loggedIn: false,
            isAuthenticated: false,
            student: {
                jobCategories: {},
            },
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

        if (!student.firstName) {
            var errorMessage = 'First Name cannot be empty';
        } else if (!student.lastName) {
            var errorMessage = 'Last Name cannot be empty';
        } else if (!student.email) {
            var errorMessage = 'Email cannot be empty';
        } else if (!student.password) {
            var errorMessage = 'Password cannot be empty';
        } else if (!student.confirmPassword) {
            var errorMessage = 'Please confirm the password';
        } else if (student.password !== student.confirmPassword) {
            var errorMessage = 'Passwords do not match';
        } else if (!student.univSchool) {
            var errorMessage = 'University/ School field cannot be empty';
        } else if (!student.phone) {
            var errorMessage = 'Phone cannot be empty';
        } else if (!Array.isArray(student.jobCategories)) {
            var errorMessage = 'Please select at least one job category';
        } else if (student.jobCategories[0].length < 1) {
            var errorMessage = 'Please select at least one job category';
        }

        this.setState({errorMessage: errorMessage});
        if (!this.state.errorMessage) {
            this.props.registerStudent(student);
        }
    }

    onChange(evt) {
        var {student} = this.state;

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
                jobCategories: [evt],
            },
        });
    }

    render() {
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
                        value={this.state.student.firstName}
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
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.student.lastName}
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
                        value={this.state.student.email}
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
                        id="password"
                        type="password"
                        value={this.state.student.password}
                        placeholder="Password"
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
                        University/School*
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
                        Profile picture url
                    </label>
                    <input
                        className="form-control"
                        name="picture"
                        id="picture"
                        type="text"
                        placeholder="Paste url of your picture"
                        value={this.state.student.picture}
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
                        value={this.state.student.phone}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label
                        className="control-label"
                        name="category"
                        htmlFor="jobCategories"
                    >
                        Your job categories*
                    </label>
                    <Multiselect
                        data={categories}
                        textField="value"
                        onChange={this.onChangeJobCategories}
                        placeholder="Pick up to 8 jobs categories"
                        groupBy="group"
                    />
                </div>
                
                <div className="button" >
                    {this.props.registerRequestStatus === 'pending'
                        ? <LoadingIndicator />
                        : <button className="btn btn-primary" type="submit">
                              Sign Up
                        </button>}
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        registerRequestStatus: state.registerStudent.student.status,
    };
}

export default connect(mapStateToProps, actions)(Form_Register_Student);
