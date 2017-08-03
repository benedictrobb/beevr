import React, {Component} from 'react';
import LoadingButton from './LoadingButton.js';
import ErrorMessage from './ErrorMessage.js';
import categories from '../constants/job_categories.js';

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
            //browserHistory.push('/dashboard');
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
        const options = categories.map(function(elem) {
            return (
                <option value={categories[elem]}>
                    {elem}
                </option>
            );
        });

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
                        Password*
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
                        placeholder="Bio"
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
                        name="jobCategories"
                        htmlFor="jobCategories"
                    >
                        Pick up to 8 jobs categories
                    </label>
                    <input
                        className="form-control"
                        name="category1"
                        id="jobCategory1"
                        type="dropdown"
                        placeholder="Select"
                        value={this.state.student.jobCategories.category1}
                        onChange={this.onChangeJobCategories}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="category2"
                        id="jobCategory2"
                        type="dropdown"
                        placeholder="Select"
                        value={this.state.student.jobCategories.category2}
                        onChange={this.onChangeJobCategories}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="category3"
                        id="jobCategory3"
                        type="dropdown"
                        placeholder="Select"
                        value={this.state.student.jobCategories.category3}
                        onChange={this.onChangeJobCategories}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="category4"
                        id="jobCategory4"
                        type="dropdown"
                        placeholder="Select"
                        value={this.state.student.jobCategories.category4}
                        onChange={this.onChangeJobCategories}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="category5"
                        id="jobCategory5"
                        type="dropdown"
                        placeholder="Select"
                        value={this.state.student.jobCategories.category5}
                        onChange={this.onChangeJobCategories}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="category6"
                        id="jobCategory6"
                        type="dropdown"
                        placeholder="Select"
                        value={this.state.student.jobCategories.category6}
                        onChange={this.onChangeJobCategories}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="category7"
                        id="jobCategory7"
                        type="dropdown"
                        placeholder="Select"
                        value={this.state.student.jobCategories.category7}
                        onChange={this.onChangeJobCategories}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="category8"
                        id="jobCategory8"
                        type="dropdown"
                        placeholder="Select"
                        value={this.state.student.jobCategories.category8}
                        onChange={this.onChangeJobCategories}
                        list="jobs"
                    />
                    <datalist id="jobs">
                        <option value="" disabled />
                        {options}
                    </datalist>
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

export default Form_Register_Student;
