import React, {Component} from 'react';
import LoadingButton from './LoadingButton.js';
import ErrorMessage from './ErrorMessage.js';

class Form_Register_Student extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            student: {},
            errorMessage: '',
        };
    }

    onSubmit(evt) {
        evt.preventDefault();
        var student = this.state.student;
        if (!student.email) {
            var error_message = 'Email cannot be empty';
        }

        this.setState({errorMessage: error_message}, () => {
            if (!this.state.errorMessage) {
                this.props.registerStudent(this.state.student);
                //browserHistory.push('/dashboard');
            }
        });
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
        return (
            <form onSubmit={this.onSubmit}>
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
                    <label className="control-label" htmlFor="First Name">
                        First Name
                    </label>
                    <input
                        className="form-control"
                        name="first_name"
                        id="First Name"
                        type="text"
                        placeholder="First Name"
                        value={this.state.student.first_name}
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
                        value={this.state.student.last_name}
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
                        value={this.state.student.email}
                        placeholder="email"
                        onChange={this.onChange}
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
                        value={this.state.student.password}
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
                        value={this.state.student.confirmPassword}
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
                        value={this.state.student.DOB}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form-group">
                    <label
                        className="control-label"
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
                        value={this.state.student.univ_school}
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
                        value={this.state.student.bio}
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
                        value={this.state.student.picture}
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
                        value={this.state.student.phone}
                        onChange={this.onChange}
                    />
                </div>

                <div className="form-group">
                    <label
                        className="control-label"
                        name="job-cat"
                        htmlFor="Job categories"
                    >
                        Pick up to 8 jobs categories
                    </label>
                    <input
                        className="form-control"
                        name="index1"
                        id="job_category_1"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index2"
                        id="job_category_2"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index3"
                        id="job_category_3"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index4"
                        id="job_category_4"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index5"
                        id="job_category_5"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index6"
                        id="job_category_6"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index7"
                        id="job_category_7"
                        type="text"
                        placeholder="Select"
                        list="jobs"
                    />
                    <input
                        className="form-control"
                        name="index8"
                        id="job_category_8"
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

//I leave it, could be useful later......
////Form_Register_Student.propTypes = {
////onSubmit: React.PropTypes.func.isRequired,
////btnText: React.PropTypes.string.isRequired,
////data: React.PropTypes.object.isRequired
////};

export default Form_Register_Student;
