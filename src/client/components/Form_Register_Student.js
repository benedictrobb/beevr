import React, {Component} from 'react';
import LoadingButton from './LoadingButton.js';
import ErrorMessage from './ErrorMessage.js';
import axios from 'axios';
import * as actions from '../actions/register_student.js';
import {connect} from 'react-redux';
import {Router, Route, IndexRoute, browseHistory} from 'react-router';


class Form_Register_Student extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeStudentFirstName = this.onChangeStudentFirstName.bind(this);
        this.onChangeStudentLastName = this.onChangeStudentLastName.bind(this);
        this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangeUniversity = this.onChangeUniversity.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangePicture = this.onChangePicture.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);

        this.state = {
            student: {
            }
        };
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.registerStudent(this.state.student);
    }

    onChangeStudentFirstName(evt) {
        var student = this.state.student;
        this.setState({
            student: {
                ...student,
                firstName: evt.target.value
            }
        });
    }

    onChangeStudentLastName(evt) {
        var student = this.state.student;
        this.setState({
            student: {
                ...student,
                lastName: evt.target.value
            }
        });
    }

    onChangeStudentEmail(evt) {
        var student = this.state.student;
        this.setState({
            student: {
                ...student,
                studentEmail: evt.target.value
            }
        });
    }

    onChangePassword(evt) {
        var student = this.state.student;
        this.setState({
            student: {
                ...student,
                password: evt.target.value
            }
        });
    }

    onChangeDOB(evt) {
        var student = this.state.student;
        this.setState({
            student: {
                ...student,
                DOB: evt.target.value
            }
        });
    }

    onChangeUniversity(evt) {
        var student = this.state.student;
        this.setState({
            student: {
                ...student,
                univerisity: evt.target.value
            }
        });
    }
    
    onChangeBio(evt) {
        var student = this.state.student;
        this.setState({
            student: {
                ...student,
                bio: evt.target.value
            }
        });
    }

    onChangePicture(evt) {
        var student = this.state.student;
        this.setState({
            student: {
                ...student,
                picture: evt.target.value
            }
        });
    }

    onChangePhone(evt) {
        var student = this.state.student;
        this.setState({
            student: {
                ...student,
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
                        value={this.state.student.firstName}
                        onChange={this.onChangeStudentFirstName}
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
                        value={this.state.student.lastName}
                        onChange={this.onChangeStudentLastName}
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
                        value={this.state.student.studentEmail}
                        placeholder="email"
                        onChange={this.onChangeStudentEmail}
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
                        value={this.state.student.password}
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
                        value={this.state.student.DOB}
                        onChange={this.onChangeDOB}
                    />
                </div>

                <div className="form__field-wrapper">
                    <label
                        className="form__field-label"
                        htmlFor="University/School"
                    >
                        University/School
                    </label>
                    <input
                        className="form-control"
                        id="University/School"
                        type="text"
                        placeholder="University/School"
                        value={this.state.student.university}
                        onChange={this.onChangeUniversity}
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
                        value={this.state.student.bio}
                        onChange={this.onChangeBio}
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
                        value={this.state.student.picture}
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
                        value={this.state.student.phone}
                        onChange={this.onChangePhone}
                    />
                </div>

                <div className="form__field-wrapper">
                    <label
                        className="form__field-label"
                        htmlFor="Job categories"
                    >
                        Pick up to 8 jobs categories
                    </label>
                    <input
                        className="form-control"
                        id="job category1"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        id="job category2"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        id="job category3"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        id="job category4"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        id="job category5"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        id="job category6"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        id="job category7"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        id="job category8"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <datalist id="jobs">
                        <option value="Dog-walking" />
                        <option value="Tutoring- Spanish" />
                        <option value="Home maintenance" />
                        <option value="Tutoring- Mathematics" />
                        <option value="Cat Sitting" />
                        <option value="Plant watering" />
                        <option value="Babysitting" />
                        <option value="Cooking" />
                        <option value="House Cleaning" />
                        <option value="Band playing" />
                        <option value="Photography" />
                        <option value="Other" />
                    </datalist>
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

function mapStateToProps(state) {
    return {
        student: state.registerStudent.student.response
    };
}

//Form_Register_Student.propTypes = {
    //onSubmit: React.PropTypes.func.isRequired,
    //btnText: React.PropTypes.string.isRequired,
    //data: React.PropTypes.object.isRequired
//};

export default connect(mapStateToProps, actions)(Form_Register_Student);
