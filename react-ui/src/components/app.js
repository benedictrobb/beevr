/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

// Import stuff
import React, {Component} from 'react';
import Nav from './Nav.js';
import {connect} from 'react-redux';
import beevrAPI from '../utils/beevrAPI.js';

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Nav />
                {this.props.children}
            </div>
        );
    }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {data: state};
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App);
