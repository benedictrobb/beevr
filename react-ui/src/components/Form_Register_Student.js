import React, {Component} from 'react';
import LoadingButton from './LoadingButton.js';
import ErrorMessage from './ErrorMessage.js';
import * as actions from '../actions/register_student.js';
import {connect} from 'react-redux';

class Form_Register_Student extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            studentObject: {}
        };
    }

    onSubmit(evt) {
        evt.preventDefault();
        this.props.registerStudent(this.state.studentObject);
    }

    onChange(evt) {
        var studentObject = this.state.studentObject;
        this.setState({
            studentObject: {
                ...studentObject,
                [evt.target.name]: evt.target.value
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
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
                        value={this.state.studentObject.firstName}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Last Name">
                        Last Name
                    </label>
                    <input
                        className="form-control"
                        name="last_name"
                        id="Last Name"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.studentObject.lastName}
                        onChange={this.onChange}
                    />
                </div>
                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="username">
                        Email
                    </label>
                    <input
                        className="form-control"
                        name="email"
                        id="Last Name"
                        type="text"
                        id="username"
                        value={this.state.studentObject.email}
                        placeholder="email"
                        onChange={this.onChange}
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
                        name="password"
                        id="password"
                        type="password"
                        value={this.state.studentObject.password}
                        placeholder="password"
                        onChange={this.onChange}
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
                        name="DOB"
                        id="Date Of Birth"
                        type="date"
                        placeholder="Date Of Birth"
                        value={this.state.studentObject.DOB}
                        onChange={this.onChange}
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
                        name="univ_school"
                        id="University/School"
                        type="text"
                        placeholder="University/School"
                        value={this.state.studentObject.univ_school}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Bio">
                        Bio
                    </label>
                    <input
                        className="form-control"
                        name="bio"
                        id="Bio"
                        type="text"
                        placeholder="Bio"
                        value={this.state.studentObject.bio}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Picture">
                        Profile picture
                    </label>
                    <input
                        className="form-control"
                        name="picture"
                        id="Picture"
                        type="file"
                        placeholder="Picture"
                        value={this.state.studentObject.picture}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form__field-wrapper">
                    <label className="form__field-label" htmlFor="Phone number">
                        Phone number
                    </label>
                    <input
                        className="form-control"
                        name="phone"
                        id="Phone number"
                        type="text"
                        placeholder="Phone number"
                        value={this.state.studentObject.phone}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form__field-wrapper">
                    <label
                        className="form__field-label"
                        name="job-cat"
                        htmlFor="Job categories"
                    >
                        Pick up to 8 jobs categories
                    </label>
                    <input
                        className="form-control"
                        name="index1"
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
                        : <button className="btn btn-primary btn-lg" type="submit">
                            {this.props.btnText}
                        </button>}
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        studentObject: state.registerStudent.studentObject.response
    };
}

////Form_Register_Student.propTypes = {
    ////onSubmit: React.PropTypes.func.isRequired,
    ////btnText: React.PropTypes.string.isRequired,
    ////data: React.PropTypes.object.isRequired
////};

export default connect(mapStateToProps, actions)(Form_Register_Student);
//export default Form_Register_Student;
