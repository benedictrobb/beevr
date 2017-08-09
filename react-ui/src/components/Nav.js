import React, {Component} from 'react';
import {Link} from 'react-router';
import {logout} from '../actions/logout.js';

class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle"
                            data-toggle="collapse"
                            data-target="#myNavbar"
                        >
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                    </div>
                    <div id="myNavbar">
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    {this.props.loggedIn
                                        ? <div />
                                        : <Link to="/login">Login</Link>}
                                </li>

                                <li>
                                    {!this.props.loggedIn
                                        ? <div />
                                        : <Link
                                            to="/"
                                            onClick={this.props.logout}
                                        >
                                              Logout
                                        </Link>}
                                </li>
                                <li>
                                    {!this.props.role
                                        ? <Link to="/">Home</Link>
                                        : this.props.role === 'Student'
                                            ? <Link to="/browsejobs">Home</Link>
                                            : <Link to="/browsestudents">
                                                Home
                                            </Link>}
                                </li>

                                <li>
                                    {this.props.loggedIn
                                        ? <div />
                                        : <Link to="/registerstudent">
                                              Register As Student
                                        </Link>}
                                </li>

                                <li>
                                    {this.props.loggedIn
                                        ? <div />
                                        : <Link to="/registerresident">
                                              Register As Resident
                                        </Link>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;
