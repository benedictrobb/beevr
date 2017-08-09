import React, {Component} from 'react';
import {Link} from 'react-router';
import {Slide as Menu} from 'react-burger-menu';

class BurgerMenu extends React.Component {
    constructor() {
        super();
    }
    showSettings(event) {
        event.preventDefault();
    }

    render() {
        return (
            <Menu>
                <li className="menu-item">
                    {this.props.loggedIn
                        ? <div />
                        : <Link to="/login">Login</Link>}
                </li>

                <li className="menu-item">
                    {!this.props.loggedIn
                        ? <div />
                        : <Link to="/" onClick={this.props.logout}>
                              Logout
                        </Link>}
                </li>
                <li className="menu-item">
                    <Link to="/">Home</Link>
                </li>

                <li className="menu-item">
                    {this.props.loggedIn
                        ? <div />
                        : <Link to="/registerstudent">
                              Register As Student
                        </Link>}
                </li>

                <li className="menu-item">
                    {this.props.loggedIn
                        ? <div />
                        : <Link to="/registerresident">
                              Register As Resident
                        </Link>}
                </li>
            </Menu>
        );
    }
}

export default BurgerMenu;
