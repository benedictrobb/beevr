import React, {Component} from 'react';
import {Link} from 'react-router';
import {logout} from '../actions/logout.js';
import {slide as Menu} from 'react-burger-menu';

class Nav extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    componentWillReceiveProps() {
        this.setState(this.props);
    }

    render() {
        console.log(this.props);
        console.log(this.props.role);
        console.log(this.state);
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
                                {!this.props.role
                                    ? <Link to="/">Home</Link>
                                    : this.props.role === 'Student'
                                        ? <Link to="/browsejobs">Home</Link>
                                        : <Link to="/browsestudents">Home</Link>}
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

export default Nav;
