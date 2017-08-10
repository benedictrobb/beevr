import React, {Component} from 'react';
import Form_Register_Student from '../Form_Register_Student.js';
import {Router, Route, IndexRoute, browseHistory, Link} from 'react-router';
import * as actions from '../../actions/register_student.js';
import {connect} from 'react-redux';

class RegisterStudent extends Component {
    render() {
        console.log('page-state', this.state);
        console.log('page-props', this.props);
        return (
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
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        student: state.registerStudent.student.response,
    };
}

export default connect(mapStateToProps, actions)(RegisterStudent);
