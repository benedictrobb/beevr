import React, {Component} from 'react';
import {Link} from 'react-router';

class Nav extends Component {
    render() {
        return (
            <nav className="avbar navbar-default" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        <Link to="/login" className="navbar-brand">
                            Login
                        </Link>
                    </div>

                    <div
                        className="collapse navbar-collapse"
                        id="bs-example-navbar-collapse-1"
                    >
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/registerstudent">
                                    Register As Student
                                </Link>
                            </li>
                            <li>
                                <Link to="/registerresident">
                                    Register As Resident
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;
