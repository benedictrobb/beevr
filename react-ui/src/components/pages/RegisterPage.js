import React, {Component} from 'react';
import Form_Register_Student from '../Form_Register_Student.js';
import LoadingIndicator from '../LoadingIndicator.js';
import {Router, Route, IndexRoute, browseHistory} from 'react-router';

class RegisterPage extends Component {
    render() {
        const dispatch = this.props.dispatch;
        //const {formState, currentlySending} = this.props.data;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <h2>Register As Student</h2>
                    <Form_Register_Student
                        btnText={'Sign Up'}
                        //student={this.props.studentObject}
                    />
                </div>
            </div>
            //<div className="form-page__wrapper">
                //<div className="form-page__form-wrapper">
                    //<div className="form-page__form-header">
                        //<h2 className="form-page__form-heading">Register as student</h2>
                    //</div>
                    //{[> While the form is sending, show the loading indicator,
                        //otherwise show "Register" on the submit button */}
                    //<Form_Register_Student
                        //data={formState}
                        //dispatch={dispatch}
                        //history={this.props.history}
                        ////onSubmit={this._register.bind(this)}
                        //btnText={'Register'}
                        //currentlySending={currentlySending}
                    ///>
                //</div>
            //</div>
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

// Wrap the component to inject dispatch and state into it
//export default connect(select)(RegisterPage);
//function mapStateToProps(state) {
    //return {
        //studentObject: state.registerStudent.studentObject.response
    //};
//}

//Form_Register_Student.propTypes = {
    //onSubmit: React.PropTypes.func.isRequired,
    //btnText: React.PropTypes.string.isRequired,
    //data: React.PropTypes.object.isRequired
//};

//export default connect(mapStateToProps, actions)(RegisterPage);
export default RegisterPage;
