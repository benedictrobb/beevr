import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
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
                        <Link to="/login" className="navbar-brand">
                            Login
                        </Link>
                        <Link
                            to="/"
                            className="navbar-brand"
                            onClick={this.props.logout}
                        >
                            Logout
                        </Link>
                    </div>
                    <div id="myNavbar">
                        <div className="collapse navbar-collapse" id="myNavbar">
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
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLogged: state.login,
    };
}

export default connect(mapStateToProps, {logout})(Nav);
