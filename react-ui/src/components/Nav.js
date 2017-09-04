import React, {Component} from 'react';
import {Link} from 'react-router';
import {logout} from '../actions/logout.js';
import BurgerMenu from './BurgerMenu.js';

class Nav extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <nav
                    className="navbar"
                    role="navigation"
                    id="burger-menu"
                >
                    <div className="container-fluid">
                        <div className="row justify-content-between align-items-center">
                            <div className="navbar-header">
                                {!this.props.role
                                    ? <Link to="/">
                                        <div className="navbar-brand">
                                            <img src="./lemmling-Cartoon-beaver.svg" />
                                            <h1>BEEVR</h1>
                                        </div>
                                    </Link>
                                    : this.props.role === 'Student'
                                        ? <Link to="/browsejobs">
                                            <div className="navbar-brand">
                                                <img src="./lemmling-Cartoon-beaver.svg" />
                                                <h1>BEEVR</h1>
                                            </div>
                                        </Link>
                                        : <Link to="/browsestudents">
                                            <div className="navbar-brand">
                                                <img src="./lemmling-Cartoon-beaver.svg" />
                                                <h1>BEEVR</h1>
                                            </div>
                                        </Link>}
                            </div>
                            <div>
                                <BurgerMenu
                                    loggedIn={this.props.loggedIn}
                                    logout={this.props.logout}
                                    isOpen={this.props.isOpen}
                                    role={this.props.role}
                                />
                            </div>
                        </div>
                    </div>
                </nav>
                <nav
                    className="navbar"
                    role="navigation"
                    id="desktop-menu"
                >
                    <div className="container-fluid container-desktop">
                        <div className="row justify-content-between align-items-baseline">
                            <div className="navbar-header">
                                {!this.props.role
                                    ? <Link to="/">
                                        <div className="navbar-brand">
                                            <img src="./lemmling-Cartoon-beaver.svg" />
                                            <h1>BEEVR</h1>
                                        </div>
                                    </Link>
                                    : this.props.role === 'Student'
                                        ? <Link to="/browsejobs">
                                            <div className="navbar-brand">
                                                <img src="./lemmling-Cartoon-beaver.svg" />
                                                <h1>BEEVR</h1>
                                            </div>
                                        </Link>
                                        : <Link to="/browsestudents">
                                            <div className="navbar-brand">
                                                <img src="./lemmling-Cartoon-beaver.svg" />
                                                <h1>BEEVR</h1>
                                            </div>
                                        </Link>}
                            </div>
                            <div>
                                <ul className="nav navbar-right">
                                    <li>
                                        {!this.props.role
                                            ? <Link to="/">Home</Link>
                                            : this.props.role === 'Student'
                                                ? <Link to="/browsejobs">
                                                    Home
                                                </Link>
                                                : <Link to="/browsestudents">
                                                    Home
                                                </Link>}
                                    </li>
                                    <li>
                                        {!this.props.loggedIn
                                            ? <Link to="/login">Login</Link>
                                            : <Link
                                                to="/"
                                                onClick={this.props.logout}
                                            >
                                                  Logout
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
            </div>
        );
    }
}

export default Nav;
