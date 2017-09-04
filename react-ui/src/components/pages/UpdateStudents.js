import React, {Component} from 'react';
import Form_Update_Student from '../Form_Update_Student.js';
import {registerStudent} from '../../actions/register_student.js';
import {fetchStudents} from '../../actions/search_students.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class UpdateStudents extends Component {
    componentWillMount() {
        this.props.fetchStudents();
    }

    render() {
        if (this.props.status === 'success') {
            return (
                <div className="parent-container">
                    <div>
                        <div className="flex-container">
                            <img
                                className="success_image"
                                src={require('../../utils/lemmling-Cartoon-beaver.svg')}
                            />
                        </div>

                        <div className="flex-container">
                            PROFILE UPDATED SUCCESSFULLY!
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="container register_container">
                <div className="row justify-content-md-center">
                    <div className="col col-md-8 ">
                        <h3>Update your student profile</h3>

                        <p>
                            <i>Fields marked with * are mandatory</i>
                        </p>

                        <Form_Update_Student
                            onEnter={this.props.fetchStudents}
                            studentToUpdate={this.props.studentToUpdate}
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
    console.log(state.updateStudent);
    let studentToUpdate =
        state.searchStudents.studentsRequest.response &&
        state.searchStudents.studentsRequest.response.studentList[0];

    return {
        //student: state.registerStudent.student.response,
        student: state.searchStudents.studentsRequest.response,
        status: state.updateStudent.student.status,
        studentToUpdate,
    };
}

export default connect(mapStateToProps, {registerStudent, fetchStudents})(
    UpdateStudents
);
