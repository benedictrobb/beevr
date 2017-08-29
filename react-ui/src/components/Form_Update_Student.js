import React, {Component} from 'react';
import Multiselect from 'react-widgets/lib/Multiselect';
import categories from '../constants/job_categories.js';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/update_student.js';
import LoadingIndicator from 'react-loading-indicator';

class Form_Update_Student extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeJobCategories = this.onChangeJobCategories.bind(this);
        this.checkEmail = this.checkEmail.bind(this);

        this.state = {
            count: 0,
            allItems: [],
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
        var {
            firstName,
            lastName,
            dob,
            email,
            password,
            bio,
            picture,
            phone,
            univSchool,
            jobCategories,
            // confirmPassword,
        } = this.props.studentToUpdate;

        var firstName = this.state.student.firstName || firstName;
        var lastName = this.state.student.lastName || lastName;
        var email = this.state.student.email || email;
        var password = this.state.student.password || password;
        var dob = this.state.student.dob || dob;
        var bio = this.state.student.bio || bio;
        var picture = this.state.student.picture || picture;
        var phone = this.state.student.phone || phone;
        var univSchool = this.state.student.univSchool || univSchool;
        var jobCategories = this.state.student.jobCategories || jobCategories;
        var confirmPassword =
            this.state.student.confirmPassword || confirmPassword;

        console.log(this.state.student.confirmPassword);

        this.setState(
            {
                student: {
                    firstName,
                    lastName,
                    email,
                    password,
                    dob,
                    bio,
                    picture,
                    phone,
                    univSchool,
                    jobCategories,
                },
            },
            () => {
                console.log('this.state is ', this.state);
                var student = this.state.student;

                if (!student.firstName) {
                    var errorMessage = 'First Name cannot be empty';
                } else if (!student.lastName) {
                    errorMessage = 'Last Name cannot be empty';
                } else if (!student.email) {
                    errorMessage = 'Email cannot be empty';
                } else if (!student.password) {
                    errorMessage = 'Password cannot be empty';
                } else if (!confirmPassword) {
                    errorMessage = 'Please confirm the password';
                } else if (student.password !== confirmPassword) {
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
        );
    }

    onChange(evt) {
        // console.log('evt is', evt.target.name, evt.target.value);
        var {student} = this.state;

        this.setState({
            student: {
                ...student,
                [evt.target.name]: evt.target.value || [],
            },
        });
    }

    onChangeJobCategories(evt) {
        var arrayItem = evt.pop();
        var arrayvalue = arrayItem.value;

        if (arrayvalue) {
            if (this.state.count < 1) {
                var allItems = evt.concat([[arrayvalue]]);
                this.setState({
                    count: 1,
                    allItems: allItems,
                });
            } else {
                var allItems = this.state.allItems.concat([[arrayvalue]]);
                this.setState({
                    allItems: allItems,
                });
            }
        } else {
            var allItems = evt;
        }

        var student = this.state.student;
        var jobCategories = student.jobCategories;
        this.setState({
            student: {
                ...student,
                jobCategories: [allItems],
            },
        });
    }

    render() {
        let studentToUpdate = new Object();

        for (var key in this.props.studentToUpdate) {
            studentToUpdate[key] = this.props.studentToUpdate[key];
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
                            this.state.student.firstName ||
                            studentToUpdate.firstName
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
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={
                            this.state.student.lastName ||
                            studentToUpdate.lastName
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
                            this.state.student.email || studentToUpdate.email
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
                        name="dob"
                        id="dateOfBirth"
                        type="date"
                        placeholder="Date Of Birth"
                        value={this.state.student.dob || studentToUpdate.dob}
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
                        value={
                            this.state.student.univSchool ||
                            studentToUpdate.univSchool
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
                        value={this.state.student.bio || studentToUpdate.bio}
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
                            this.state.student.picture ||
                            studentToUpdate.picture
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
                            this.state.student.phone || studentToUpdate.phone
                        }
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
                        value={
                            this.state.allItems.length > 0
                                ? this.state.allItems
                                : studentToUpdate.jobCategories
                        }
                        textField="value"
                        onChange={this.onChangeJobCategories}
                        placeholder="Pick up to 8 jobs categories"
                        groupBy="group"
                    />
                </div>
                <div className="button">
                    {this.props.registerRequestStatus === 'pending'
                        ? <LoadingIndicator />
                        : this.props.studentToUpdate
                            ? <button className="btn btn-primary" type="submit">
                                Update
                            </button>
                            : <button className="btn btn-primary" type="submit">
                                Sign Up
                            </button>}
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    let studentToUpdate =
        state.searchStudents.studentsRequest.response &&
        state.searchStudents.studentsRequest.response.studentList[0];
    if (studentToUpdate && studentToUpdate.dob) {
        studentToUpdate.dob = studentToUpdate.dob.slice(0, 10);
    }
    return {
        updateRequestStatus: state.registerStudent.student.status,
    };
}

export default connect(mapStateToProps, actions)(Form_Update_Student);
