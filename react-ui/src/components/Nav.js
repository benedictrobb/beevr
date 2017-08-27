import React, {Component} from 'react';
import {Link} from 'react-router';
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
                    className="navbar navbar-default navbar-static-top"
                    role="navigation"
                    id="desktop-menu"
                >
                    <div className="container-fluid container-desktop">
                        <div className="navbar-header navbar-left">
                            <div className="navbar-brand">
                                <img src="./lemmling-Cartoon-beaver.svg" />
                                <h1>BEEVR</h1>
                            </div>
                        </div>
                        <div>
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
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;
