import React from 'react';
import LoginForm from '../Login_Form.js';
import {connect} from 'react-redux';
import * as actions from '../../actions/login.js';

class LoginPage extends React.Component {
    render() {
        this.props.loginRequest.error;
        console.log(this.props.loginRequest);
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
    return {
        loginRequest: state.login,
    };
}

export default connect(mapStateToProps, actions)(LoginPage);
