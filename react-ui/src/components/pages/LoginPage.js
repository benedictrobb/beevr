import React from 'react';
import LoginForm from '../Login_Form.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../../actions/login.js';

class LoginPage extends React.Component {
    render() {
        this.props.loginRequest.error;
        return (
            <div className="container-fluid register_container">
                <div className="row-fluid">
                    <div className="col-sm-4 col-sm-offset-4 ">
                        <LoginForm
                            loginRequest={this.props.loginRequest}
                            btnText={'Login'}
                        />
                    </div>
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
