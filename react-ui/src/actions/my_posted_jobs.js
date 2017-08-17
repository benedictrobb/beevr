import axios from 'axios';
import {FETCH_MY_POSTED_JOBS, DELETE_JOB} from '../constants/action_types.js';

export const fetchMyPostedJobs = residentId => dispatch => {
    dispatch({
        type: FETCH_MY_POSTED_JOBS,
        status: 'pending',
    });

    axios
        .get('/api/mypostedjobs', {
            params: {residentId: residentId},
        })
        .then(response => {
            dispatch({
                type: FETCH_MY_POSTED_JOBS,
                status: 'success',
                response: response.data,
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_MY_POSTED_JOBS,
                status: 'error',
                error: err,
            });
        });
};

export const deleteJob = jobId => dispatch => {
    dispatch({
        type: DELETE_JOB,
        status: 'pending',
        jobId: jobId,
    });
    axios
        .delete('/api/mypostedjobs', {
            params: {jobId},
        })
        .then(response => {
            dispatch({
                type: DELETE_JOB,
                status: 'success',
                jobId: jobId,
            });
        })
        .catch(err => {
            dispatch({
                type: DELETE_JOB,
                status: 'error',
                error: err,
                jobId: jobId,
            });
        });
};
