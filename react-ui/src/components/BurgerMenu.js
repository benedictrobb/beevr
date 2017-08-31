import React, {Component} from 'react';
import {Link} from 'react-router';
import {logout} from '../actions/logout.js';
import Menu from './Menu.js';
import {closeMenu} from '../actions/burgerMenu.js';

class BurgerMenu extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        };
    }

    render() {
        return (
            <Menu right noOverlay>
                <ul className="nav navbar-right">
                    <li>
                        {!this.props.role
                            ? <Link to="/"
                                onClick={() => this.closeMenu()}
                            >
                              Home
                            </Link>
                            : this.props.role === 'Student'
                                ? <Link
                                    to="/browsejobs"
                                    onClick={() => this.closeMenu()}
                                >
                                    Home
                                </Link>
                                : <Link
                                    to="/browsestudents"
                                    onClick={() => this.closeMenu()}
                                >
                                    Home
                                </Link>}
                    </li>

                    <li>
                        {!this.props.loggedIn
                            ? <Link to="/login"
                                onClick={() => this.closeMenu()}
                            >
                                Login
                            </Link>
                            : <Link to="/"
                                onClick={this.props.logout,
                                    () => this.closeMenu()}
                            >
                                  Logout
                            </Link>}
                    </li>

                    <li>
                        {this.props.loggedIn
                            ? <div />
                            : <Link
                                to="/registerstudent"
                                onClick={() => this.closeMenu()}
                            >
                                  Register As Student
                            </Link>}
                    </li>

                    <li>
                        {this.props.loggedIn
                            ? <div />
                            : <Link
                                to="/registerresident"
                                onClick={() => this.closeMenu()}
                            >
                                  Register As Resident
                            </Link>}
                    </li>
                </ul>
            </Menu>
        );
    }
}

export default BurgerMenu;
