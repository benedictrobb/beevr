import axios from 'axios';
import {FETCH_MY_JOBS} from '../constants/action_types.js';

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
