import React, {Component} from 'react';
import Form_Register_Student from '../Form_Register_Student.js';
import LoadingIndicator from '../LoadingIndicator.js';
import {Router, Route, IndexRoute, browseHistory} from 'react-router';
import * as actions from '../../actions/register_student.js';
import {connect} from 'react-redux';

class RegisterStudent extends Component {
    render() {
        //const dispatch = this.props.dispatch;
        //const {formState, currentlySending} = this.props.data;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h2>Register As Student</h2>
                    <Form_Register_Student
                        btnText={'Sign Up'}
                        //student={this.props.student}
                        registerStudent={this.props.registerStudent}
                    />
                </div>
            </div>
        );
    }

    // Register a user
    //_register(username, password) {
    //this.props.dispatch(_register(username, password));
    //}
}

//function select(state) {
//return {data: state};
//}

//onSubmit: React.PropTypes.func.isRequired,
//btnText: React.PropTypes.string.isRequired,
//data: React.PropTypes.object.isRequired
//};

function mapStateToProps(state) {
    return {
        student: state.registerStudent.student.response,
    };
}

export default connect(mapStateToProps, actions)(RegisterStudent);
