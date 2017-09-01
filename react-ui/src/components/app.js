/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, {Component} from 'react';
import Nav from './Nav.js';
import {connect} from 'react-redux';
import {logout} from '../actions/logout.js';
import {checkAuth} from '../actions/checkAuth.js';

class App extends Component {
    constructor() {
        super();

        this.state = {
        };
    }
    
    componentWillMount() {
        this.props.checkAuth();
    };

    render() {
        return (
            <div className="wrapper">
                <Nav 
                    loggedIn={this.props.isAuthenticated}
                    role={this.props.role}
                    logout={this.props.logout}
                    isOpen={this.props.isOpen}
                />
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const isAuthenticated =
        state.auth &&
        state.auth.response &&
        state.auth.response.isAuthenticated;
    
    const role =
        state.auth && state.auth.response && state.auth.response.role;
    
    const isOpen =
        state.burgerMenu && state.burgerMenu.isOpen;
    
    return {
        isLogged: state.auth,
        isAuthenticated,
        role,
        isOpen,
    };
}

export default connect(mapStateToProps, {logout, checkAuth})(App);
