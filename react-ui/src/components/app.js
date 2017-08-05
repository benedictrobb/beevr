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

    componentWillMount() {
        this.props.checkAuth();
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
                {this.props.checkAuth}
            </div>
        );
    }
}

//function mapStateToProps(state) {
    //return {data: state};
//}

function mapStateToProps(state) {
    return {
        isLogged: state.auth,
    };
}

export default connect(mapStateToProps, {logout, checkAuth})(App);
