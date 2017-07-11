import React, { Component} from 'react';
import { connect } from 'react-redux';
import Form_Post_Job from '../Form_Post_Job';
import { sendingRequest, register } from '../../actions/AppActions';
import LoadingIndicator from '../LoadingIndicator.js';

class PostJob extends Component {
    render() {
        const dispatch = this.props.dispatch;
        const { formState, currentlySending } = this.props.data;
    return (
            <div className="form-page__wrapper">
                <div className="form-page__form-wrapper">
                    <div className="form-page__form-header">
                        <h2 className="form-page__form-heading">Post a Job</h2>
                    </div>
                    {/* While the form is sending, show the loading indicator,
                        otherwise show "Register" on the submit button */}
                <Form_Post_Job data={formState} dispatch={dispatch} location={location} history={this.props.history}
                  btnText={"Submit"} currentlySending={currentlySending}/>
                </div>
            </div>
        );
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(PostJob);
