import React, {Component} from 'react';
import {Link} from 'react-router';
import {logout} from '../actions/AppActions';
import LoadingButton from './LoadingButton.js';

class Nav extends Component {
    render() {
        // Render either the Log In and register buttons, or the logout button
        // based on the current authentication state.
        const navButtons = this.props.loggedIn
            ? <div>
                {this.props.currentlySending
                    ? <LoadingButton className="btn--nav" />
                    : <a
                        href="#"
                        className="btn"
                        onClick={this._logout.bind(this)}
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
                <Link to="/logout" className="btn"
                    onClick={this._logout.bind(this)}
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

    _logout() {
        this.props.dispatch(logout());
    }
}

export default Nav;
