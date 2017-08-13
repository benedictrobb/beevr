import React, {Component} from 'react';
import ErrorMessage from './ErrorMessage.js';
import {browserHistory} from 'react-router';
import Multiselect from 'react-widgets/lib/Multiselect';
import categories from '../constants/job_categories.js';
import LoadingIndicator from 'react-loading-indicator';

class Form_Register_Student extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.checkEmail = this.checkEmail.bind(this);

        this.state = {
            errorMessage: '',
            loggedIn: false,
            isAuthenticated: false,
            student: {
                jobCategories: {
                    options: categories,
                    value: [],
                },
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
        delete student.jobCategories.options;
        student.jobCategories = student.jobCategories.value.map(e => e.value);

        if (!student.firstName) {
            var errorMessage = 'First Name cannot be empty';
        } else if (!student.lastName) {
            errorMessage = 'Last Name cannot be empty';
        } else if (!student.email) {
            errorMessage = 'Email cannot be empty';
        } else if (!student.password) {
            errorMessage = 'Password cannot be empty';
        } else if (!student.confirmPassword) {
            errorMessage = 'Please confirm the password';
        } else if (student.password !== student.confirmPassword) {
            errorMessage = 'Passwords do not match';
        } else if (!student.univSchool) {
            errorMessage = 'University/ School field cannot be empty';
        } else if (!student.phone) {
            errorMessage = 'Phone cannot be empty';
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

    handleSelectChange(value) {
        var student = this.state.student;
        var jobCategories = student.jobCategories;
        if (jobCategories.value.length < 8) {
            this.setState({
                student: {
                    ...student,
                    jobCategories: {
                        ...jobCategories,
                        value,
                    },
                },
            });
        }
    }

    render() {
        console.log(this.state);
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
                        Your job categories
                    </label>
                    <Multiselect 
                        data={categories}
                        textField='value'
                        value={this.state.student.jobCategories.value}
                        onChange={this.onChangeJobCategories}
                        placeholder="Pick up to 8 jobs categories"
                        groupBy='group'
                    />
                </div>
                <div>
                    {this.props.status === 'pending'
                        ? <LoadingIndicator />
                        : <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={this.onSubmit}
                        >
                            {this.props.btnText}
                        </button>}
                </div>
            </form>
        );
    }
}

export default Form_Register_Student;
