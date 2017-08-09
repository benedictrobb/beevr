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
import {store} from '../index.js';

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
        console.log('app.props',this.props);
        return (
            <div className="wrapper">
                <Nav 
                    loggedIn={this.props.isAuthenticated}
                    role={this.props.role}
                    logout={this.props.logout}
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
    return {
        isLogged: state.auth,
        isAuthenticated,
        role,
    };
}

export default connect(mapStateToProps, {logout, checkAuth})(App);
