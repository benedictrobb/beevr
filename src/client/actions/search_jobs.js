import axios from 'axios';
import {FETCH_SELECTED_JOBS} from '../constants/action_types.js';
import {FETCH_STUDENT_JOBS} from '../constants/action_types.js';
import {SET_TERM} from '../constants/action_types.js';

export const fetchJobs = () => dispatch => {
    dispatch({
        type: FETCH_STUDENT_JOBS,
        status: 'pending'
    });

    axios
        .get('/api/random_jobs')
        .then(response => {
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

export const setTerm = term => dispatch => {
    dispatch({
        type: SET_TERM,
        response: term
    });
};
