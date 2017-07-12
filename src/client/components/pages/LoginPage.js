/*
 * LoginPage
 *
 * Users login on this page
 * Route: /login
 *
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form from '../Form.js';
import beevrAPI from '../../utils/beevrAPI.js';
import {login} from '../../actions/AppActions';
import Loadingindicator from '../Loadingindicator.js';

class LoginPage extends Component {
    /*componentWillMount() {
    fetch( 'https://swapi.co/api/people/?format=json' )
      .then( response => response.json() )
      .then( ({results: items}) => this.setState({items}))
    }*/

    render() {
        const dispatch = this.props.dispatch;
        const {formState, currentlySending} = this.props.data;
        return (
            <div className="form-page__wrapper">
                <div className="form-page__form-wrapper">
                    <div className="form-page__form-header">
                        <h2 className="form-page__form-heading">Login</h2>
                    </div>
                    {/* While the form is sending, show the loading indicator,
                        otherwise show "Log in" on the submit button */}
                    <Form
                        data={formState}
                        dispatch={dispatch}
                        location={location}
                        history={this.props.history}
                        onSubmit={this._login.bind(this)}
                        btnText={'Login'}
                        currentlySending={currentlySending}
                    />
                </div>
            </div>
        );
    }

    _login(username, password) {
        this.props.dispatch(login(username, password));
    }
}

// Which props do we want to inject, given the global state?
function select(state) {
    return {data: state};
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(LoginPage);
