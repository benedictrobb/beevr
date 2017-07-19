import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form_Post_Job from '../Form_Post_Job';
import {sendingRequest} from '../../actions/AppActions';
import LoadingIndicator from '../LoadingIndicator.js';

// const testObject = {
//     start_date: '01/12/90',
//     start_time: '12:00',
//     end_date: '12/12/12',
//     end_time: '07:00',
//     job_title: 'Hello Chello',
//     description: 'Lorem Ipsum',
//     rate: '100',
//     resident_id: '1',
//     category: 'photography'
// };

class PostJob extends Component {
    render() {
        return (
            <div className="form-page__wrapper">
                <div className="form-page__form-wrapper">
                    <div className="form-page__form-header">
                        <h2 className="form-page__form-heading">Post a Job</h2>
                    </div>
                    {/* While the form is sending, show the loading indicator,
                        otherwise show "Register" on the submit button */}
                    <Form_Post_Job btnText={'Submit'} />
                </div>
            </div>
        );
    }
}

export default PostJob;
