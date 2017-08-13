import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../actions/logout.js';
import {slide as Menu} from 'react-burger-menu';

class Nav extends Component {
    showSettings(event) {
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <nav
                    className="navbar navbar-default"
                    role="navigation"
                    id="burger-menu"
                >
                    <div className="container">
                        <ul className="nav navbar-nav navbar-right">
                            <Menu right>
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
                                    <Link to="/">Home</Link>
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
                            </Menu>
                        </ul>
                    </div>
                </nav>
                <nav
                    className="navbar navbar-default"
                    role="navigation"
                    id="desktop-menu"
                >
                    <div className="container-desktop">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                {this.props.loggedIn
                                    ? <div />
                                    : <Link to="/login">Login</Link>}
                            </li>

                            <li>
                                {!this.props.loggedIn
                                    ? <div />
                                    : <Link to="/" onClick={this.props.logout}>
                                          Logout
                                    </Link>}
                            </li>
                            <li>
                                <Link to="/">Home</Link>
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
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const loggedIn =
        state.login && state.login.response && state.login.response.loggedIn;

    return {
        loggedIn,
    };
}

export default connect(mapStateToProps, {logout})(Nav);
