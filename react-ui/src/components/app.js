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

        //this.setState({
            //isLogged: this.props.auth 
        //});
    }
    
    componentWillMount() {
        this.props.checkAuth();
        this.setState({
            isLogged: store.getState().auth
        });
    };

    render() {
        console.log('hhhh',this.props);
        console.log('sss',this.state);
        return (
            <div className="wrapper">
                <Nav 
                    logout={this.props.logout}
                />
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLogged: state.auth,
    };
}

export default connect(mapStateToProps, {logout, checkAuth})(App);
