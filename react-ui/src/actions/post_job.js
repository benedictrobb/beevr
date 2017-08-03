import axios from 'axios';
import {POST_JOB} from '../constants/action_types.js';

export const postJob = job => dispatch => {
    dispatch({
        type: POST_JOB,
        status: 'pending',
    });

    axios
        .post('/api/jobs', job)
        .then(response => {
            dispatch({
                type: POST_JOB,
                status: 'success',
                response: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: POST_JOB,
                status: 'error',
                error: error,
            });
        });
};
