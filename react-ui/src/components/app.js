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

class App extends Component {
    render() {
        console.log('hhhh',this.props);
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

//function mapStateToProps(state) {
    //return {data: state};
//}

function mapStateToProps(state) {
    return {
        isLogged: state.login,
    };
}

export default connect(mapStateToProps, {logout})(App);
