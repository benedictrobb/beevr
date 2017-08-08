import React, {Component} from 'react';
import Form_Register_Student from '../Form_Register_Student.js';
import {Router, Route, IndexRoute, browseHistory, Link} from 'react-router';
import * as actions from '../../actions/register_student.js';
import {connect} from 'react-redux';

class RegisterStudent extends Component {
    render() {
        if (this.props.registered === 'success') {
            return (
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <div>Registration successful!</div>
                        <Link to="/login">Login to continue</Link>
                    </div>
                </div>
            );
        }

        return (
<<<<<<< HEAD
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h2>Register As Student</h2>
                    <Form_Register_Student
                        btnText={'Sign Up'}
                        registerStudent={this.props.registerStudent}
                        checkIfStudentExists={this.props.checkIfStudentExists}
                    />
=======
            <div className="container-fluid register_container">
                <div className="row-fluid">
                    <div className="col-md-4 col-md-offset-4 ">
                        <h3>Student Registration</h3>

                        <p>
                            <i>Fields marked with * are mandatory</i>
                        </p>

                        <Form_Register_Student
                            btnText={'Sign Up'}
                            registerStudent={this.props.registerStudent}
                            checkIfStudentExists={
                                this.props.checkIfStudentExists
                            }
                        />
                    </div>
>>>>>>> master
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        student: state.registerStudent.student.response,
        registered: state.registerStudent.student.status,
    };
}

export default connect(mapStateToProps, actions)(RegisterStudent);
