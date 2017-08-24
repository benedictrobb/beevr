import React, {Component} from 'react';
import Form_Register_Student from '../Form_Register_Student.js';
import {registerStudent} from '../../actions/register_student.js';
import {fetchStudents} from '../../actions/search_students.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class UpdateStudents extends Component {

    componentWillMount() {
        this.props.fetchStudents();
    }
    
    render() {
        console.log(this.props);
        console.log(this.state);
        return (
            <div className="container-fluid register_container">
                <div className="row-fluid">
                    <div className="col-md-4 col-md-offset-4 ">
                        <h3>Update your student profile</h3>

                        <p>
                            <i>Fields marked with * are mandatory</i>
                        </p>

                        <Form_Register_Student
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
    
    let studentToUpdate = state.searchStudents.studentsRequest.response && state.searchStudents.studentsRequest.response.studentList[0];

    return {
        student: state.registerStudent.student.response,
        registered: state.registerStudent.student.status,
        studentToUpdate,
    };
}

export default connect(mapStateToProps, {registerStudent, fetchStudents})(UpdateStudents);
