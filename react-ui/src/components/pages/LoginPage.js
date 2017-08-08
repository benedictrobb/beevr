import React from 'react';
import LoginForm from '../Login_Form.js';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import * as actions from '../../actions/login.js';

class LoginPage extends React.Component {
    render() {
        if (this.props.isAuthenticated === true) {
            browserHistory.push('/');
        }
        this.props.loginRequest.error;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <LoginForm
                        loginRequest={this.props.loginRequest}
                        btnText={'Login'}
                    />
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

    return {
        loginRequest: state.login,
        isAuthenticated,
    };
}

export default connect(mapStateToProps, actions)(LoginPage);
