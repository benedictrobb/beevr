import React from 'react';
import LoginForm from '../Login_Form.js';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import * as actions from '../../actions/login.js';

class LoginPage extends React.Component {
    render() {
        if (this.props.isAuthenticated === true) {
            if (this.props.role === 'Student') {
                browserHistory.push('/browsejobs');
            } else {
                browserHistory.push('/browsestudents');
            }
        }
        this.props.loginRequest.error;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <LoginForm />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const isAuthenticated =
        state.login &&
        state.login.response &&
        state.login.response.isAuthenticated;

    const role =
        state.login && state.login.response && state.login.response.role;

    return {
        loginRequest: state.login,
        isAuthenticated,
        role,
    };
}

export default connect(mapStateToProps, actions)(LoginPage);
