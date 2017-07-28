import axios from 'axios';
import {FETCH_MY_POSTED_JOBS} from '../constants/action_types.js';
import {DELETE_JOB} from '../constants/action_types.js';

export const fetchMyPostedJobs = () => dispatch => {
    dispatch({
        type: FETCH_MY_POSTED_JOBS,
        status: 'pending'
    });

    axios
        .get('/api/mypostedjobs')
        .then(response => {
            dispatch({
                type: FETCH_MY_POSTED_JOBS,
                status: 'success',
                response: response.data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_MY_POSTED_JOBS,
                status: 'error',
                error: err
            });
        });
};

export const deleteJob = (job_id, callback) => dispatch => {
    dispatch({
        type: DELETE_JOB,
        status: 'pending'
    });
    axios
        .delete('/api/mypostedjobs', {
            params: {job_id}
        })
        .then(response => {
            dispatch({
                type: DELETE_JOB,
                status: 'success'
            });
            callback();
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: DELETE_JOB,
                status: 'error',
                error: err
            });
        });
};
