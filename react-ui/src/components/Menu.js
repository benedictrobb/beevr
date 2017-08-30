import React, {Component} from 'react';
import {Link} from 'react-router';
import Menu from 'react-burger-menu/lib/menus/slide';
import {logout} from '../actions/logout.js';
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';

class BurgerMenu extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        };
    }

    render() {
        var isMenuOpen = function(state) {
            return state.isOpen;
        };

        console.log(this.props);
        console.log(this.state);
        return (
            <Menu>
                <p>AZZZZZ</p>
                <ul className="nav navbar-right">
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
            </Menu>
        );
    }
}

//export default BurgerMenu;
export default reduxBurgerMenu(BurgerMenu);
