import {APPLY_JOB} from '../constants/action_types.js';
import axios from 'axios';

export const applyJob = job_id => dispatch => {
    axios
        .get('/api/apply')
        .then(response => {
            dispatch({
                type: APPLY_JOB,
                status: 'success',
                response: job_id
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
