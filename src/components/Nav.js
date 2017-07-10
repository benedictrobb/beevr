/**
 *
 * Nav.js
 *
 * This component renders the navigation bar
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout } from '../actions/AppActions';
import LoadingButton from './LoadingButton.js';

class Nav extends Component {
  render() {
    // Render either the Log In and register buttons, or the logout button
    // based on the current authentication state.
    const navButtons = this.props.loggedIn ? (
        <div>

          {this.props.currentlySending ? (
            <LoadingButton className="btn--nav" />
          ) : (
            <a href="#" className="btn btn--login btn--nav" onClick={this._logout.bind(this)}>Logout</a>
          )}
        </div>
      ) : (
        <div>
          <Link to="/" className="btn btn--login btn--nav">Home</Link>
          <Link to="/register" className="btn btn--login btn--nav">Register As Student</Link>
          <Link to="/registerresident" className="btn btn--login btn--nav">Register As Resident</Link>
          <Link to="/login" className="btn btn--login btn--nav">Login</Link>
        </div>
      );

    return(
      <div className="nav">
        <div className="nav__wrapper">
          { navButtons }
        </div>
      </div>
    );
  }

  _logout() {
    this.props.dispatch(logout());
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  currentlySending: React.PropTypes.bool.isRequired
}

export default Nav;
