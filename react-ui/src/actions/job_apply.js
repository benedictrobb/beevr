import {APPLY_JOB} from '../constants/action_types.js';
import axios from 'axios';

export const applyJob = () => dispatch => {
    console.log('inside action');
    axios
        .get('/api/apply')
        .then(response => {
            dispatch({
                type: APPLY_JOB,
                status: 'success',
                response: 'email sent'
            });
        })
        .catch(error => {
            dispatch({
                type: APPLY_JOB,
                status: 'error',
                error: error
            });
        });
};
