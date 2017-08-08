import React, {Component} from 'react';
import Form_Register_Student from '../Form_Register_Student.js';
import {Router, Route, IndexRoute, browseHistory, Link} from 'react-router';
import * as actions from '../../actions/register_student.js';
import {connect} from 'react-redux';

class RegisterStudent extends Component {
    render() {
        if (this.props.registered) {
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
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h2>Register As Student</h2>
                    <Form_Register_Student
                        btnText={'Sign Up'}
                        registerStudent={this.props.registerStudent}
                        checkIfStudentExists={this.props.checkIfStudentExists}
                    />
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
