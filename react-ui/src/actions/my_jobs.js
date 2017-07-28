import axios from 'axios';
import {FETCH_MY_JOBS, DELETE_APPLICATION} from '../constants/action_types.js';

export const fetchMyJobs = () => dispatch => {
    dispatch({
        type: FETCH_MY_JOBS,
        status: 'pending'
    });

    axios
        .get('/api/myjobs')
        .then(response => {
            dispatch({
                type: FETCH_MY_JOBS,
                status: 'success',
                response: response.data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_MY_JOBS,
                status: 'error',
                error: err
            });
        });
};

export const deleteApplication = (job_id, callback) => dispatch => {
    dispatch({
        type: DELETE_APPLICATION,
        status: 'pending'
    });

    axios
        .delete('/api/myjobs', {
            params: {job_id: job_id}
        })
        .then(response => {
            dispatch({
                type: DELETE_APPLICATION,
                status: 'success'
            });
            callback();
        })
        .catch(err => {
            dispatch({
                type: DELETE_APPLICATION,
                status: 'error',
                error: err
            });
        });
};
