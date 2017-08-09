import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from '../actions/logout.js';
import {slide as Menu} from 'react-burger-menu';

var styles = {
    bmBurgerButton: {
        position: 'relative',
        float: 'right',
        width: '36px',
        height: '30px',
        right: '5%',
        top: '5%',
    },
    bmBurgerBars: {
        background: '#373a47',
    },
    bmCrossButton: {
        height: '24px',
        width: '24px',
    },
    bmCross: {
        background: '#bdc3c7',
    },
    bmMenu: {
        background: '#523249',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
    },
    bmMorphShape: {
        fill: '#373a47',
    },
    bmItemList: {
        color: 'white',
        padding: '0.5em',
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)',
    },
};

class Nav extends Component {
    showSettings(event) {
        event.preventDefault();
    }
    render() {
        return (
            <nav className="avbar navbar-default" role="navigation">
                <div className="container">
                    <ul className="nav navbar-nav navbar-right">
                        <Menu right styles={styles}>
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
                        </Menu>
                    </ul>
                </div>
            </nav>
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

// <li>
//   {this.props.loggedIn
//     ? <div />
//   : <Link to="/login">Login</Link>}
// </li>
//
// <li>
//   {!this.props.loggedIn
//     ? <div />
//   : <Link to="/" onClick={this.props.logout}>
//   Logout
// </Link>}
// </li>
// <li>
//   <Link to="/">Home</Link>
// </li>
//
// <li>
//   {this.props.loggedIn
//     ? <div />
//   : <Link to="/registerstudent">
//   Register As Student
// </Link>}
// </li>
//
// <li>
//   {this.props.loggedIn
//     ? <div />
//   : <Link to="/registerresident">
//   Register As Resident
// </Link>}
// </li>
