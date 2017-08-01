import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../actions/logout.js';
import LoadingButton from './LoadingButton.js';

class Nav extends Component {
    render() {
        // Render either the Log In and register buttons, or the logout button
        // based on the current authentication state.
        console.log(this.state)
        const navButtons = this.props.loggedIn
            ? <div>
                {this.props.currentlySending
                    ? <LoadingButton className="btn--nav" />
                    : <a
                        href="#"
                        className="btn"
                        onClick={this.props.logout.bind(this)}
                    >
                            Logout
                    </a>}
            </div>
            : <div>
                <Link to="/" className="btn">
                      Home
                </Link>
                <Link to="/registerstudent" className="btn">
                      Register As Student
                </Link>
                <Link to="/registerresident" className="btn">
                      Register As Resident
                </Link>
                <Link to="/login" className="btn">
                      Login
                </Link>
                <Link to="/" className="btn"
                    onClick={this.props.logout}
                >
                      Logout
                </Link>
            </div>;

        return (
            <div className="nav">
                <div className="container-fluid">
                    {navButtons}
                </div>
            </div>
        );
    }

    logout() {
        var state = this.state;
        this.setState({
            logout: {...logout,
                isAuthenticated: false,
                loggedIn: false,
            },
        });
        this.props.dispatch(logout());
    }
}

function mapStateToProps(state) {
    return {
        logout: state.logout,
    };
}

export default connect(mapStateToProps, {logout})(Nav);
//export default Nav;
