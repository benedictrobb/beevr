import axios from 'axios';
import {FETCH_SELECTED_JOBS} from '../constants/action_types.js';
import {FETCH_STUDENT_JOBS} from '../constants/action_types.js';

export const fetchJobs = () => dispatch => {
    console.log('fetch jobs called');
    dispatch({
        type: FETCH_STUDENT_JOBS,
        status: 'pending'
    });

    axios
        .get('/api/random_jobs')
        .then(response => {
            console.log(response);
            // if (response.status === 200) ??
            dispatch({
                type: FETCH_STUDENT_JOBS,
                status: 'success',
                response: response.data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_STUDENT_JOBS,
                status: 'error',
                error: err
            });
        });
};

export const fetchSelectedJobs = term => dispatch => {
    console.log('fetch jobs called');
    dispatch({
        type: FETCH_SELECTED_JOBS,
        status: 'pending'
    });

    axios
        .get('/api/jobs', {
            params: {term: term}
        })
        .then(response => {
            // if (response.status === 200) ??
            dispatch({
                type: FETCH_SELECTED_JOBS,
                status: 'success',
                response: response.data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_SELECTED_JOBS,
                status: 'error',
                error: err
            });
        });
};
