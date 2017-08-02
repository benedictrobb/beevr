import axios from 'axios';
import {FETCH_MY_JOBS, DELETE_APPLICATION} from '../constants/action_types.js';

export const fetchMyJobs = () => dispatch => {
    dispatch({
        type: FETCH_MY_JOBS,
        status: 'pending',
    });

    axios
        .get('/api/myjobs')
        .then(response => {
            dispatch({
                type: FETCH_MY_JOBS,
                status: 'success',
                response: response.data,
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_MY_JOBS,
                status: 'error',
                error: err,
            });
        });
};

export const deleteApplication = jobId => dispatch => {
    dispatch({
        type: DELETE_APPLICATION,
        status: 'pending',
        jobId: jobId,
    });

    axios
        .delete('/api/myjobs', {
            params: {jobId: jobId},
        })
        .then(response => {
            dispatch({
                type: DELETE_APPLICATION,
                status: 'success',
                jobId: jobId,
            });
        })
        .catch(err => {
            dispatch({
                type: DELETE_APPLICATION,
                status: 'error',
                error: err,
                jobId: jobId,
            });
        });
};
