import React, {Component} from 'react';
import LoadingButton from './LoadingButton.js';
import ErrorMessage from './ErrorMessage.js';

class Form_Register_Student extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkEmail = this.checkEmail.bind(this);

        this.state = {
            student: {},
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
        this.setState({errorMessage: error_message}, () => {
            if (!this.state.errorMessage) {
                this.props.registerStudent(student);
                //browserHistory.push('/dashboard');
            }
        });
        (err) => {
            this.setState({errorMessage: err.response.data.message});
        };
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
                    <label
                        className="control-label"
                        htmlFor="universitySchool"
                    >
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
                        name="jobCat"
                        htmlFor="jobCategories"
                    >
                        Pick up to 8 jobs categories
                    </label>
                    <input
                        className="form-control"
                        name="index1"
                        id="jobCategory1"
                        type="text"
                        placeholder="Select"
                        value={this.state.student.index1}
                        onChange={this.onChange}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index2"
                        id="jobCategory2"
                        type="text"
                        placeholder="Select"
                        value={this.state.student.index2}
                        onChange={this.onChange}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index3"
                        id="jobCategory3"
                        type="text"
                        placeholder="Select"
                        value={this.state.student.index3}
                        onChange={this.onChange}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index4"
                        id="jobCategory4"
                        type="text"
                        placeholder="Select"
                        value={this.state.student.index4}
                        onChange={this.onChange}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index5"
                        id="jobCategory5"
                        type="text"
                        placeholder="Select"
                        value={this.state.student.index5}
                        onChange={this.onChange}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index6"
                        id="jobCategory6"
                        type="text"
                        placeholder="Select"
                        value={this.state.student.index6}
                        onChange={this.onChange}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index7"
                        id="jobCategory7"
                        type="text"
                        placeholder="Select"
                        value={this.state.student.index7}
                        onChange={this.onChange}
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index8"
                        id="jobCategory8"
                        type="text"
                        placeholder="Select"
                        value={this.state.student.index8}
                        onChange={this.onChange}
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
