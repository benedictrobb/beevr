import {APPLY_JOB, FETCH_JOBS} from '../constants/action_types.js';
import axios from 'axios';

export const submitJobApplication = job_id => dispatch => {
    dispatch({
        type: APPLY_JOB,
        status: 'pending',
    });
    
    axios
        .put('/api/apply', {job_id: job_id})
        .then(response => {
            dispatch({
                type: APPLY_JOB,
                status: 'success',
                response: job_id,
            });
        })
        .catch(error => {
            dispatch({
                type: APPLY_JOB,
                status: 'error',
                error: error,
            });
        });
    
    axios
        .get('/api/apply')
        .then(response => {
            dispatch({
                type: APPLY_JOB,
                status: 'success',
                response: job_id,
            });
        })
        .catch(error => {
            dispatch({
                type: APPLY_JOB,
                status: 'error',
                error: error,
            });
        });
};

export const fetchJobs = () => dispatch => {
    dispatch({
        type: FETCH_JOBS,
        status: 'pending',
    });

    axios
        .get('/api/jobs')
        .then(response =>
            dispatch({
                type: FETCH_JOBS,
                status: 'success',
                response: response.data,
            })
        )
        .catch(err => {
            dispatch({
                type: FETCH_JOBS,
                status: 'error',
                error: err,
            });
        });
};
