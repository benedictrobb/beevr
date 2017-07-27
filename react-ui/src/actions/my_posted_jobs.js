import axios from 'axios';
import {FETCH_MY_POSTED_JOBS} from '../constants/action_types.js';

export const fetchMyPostedJobs = () => dispatch => {
    dispatch({
        type: FETCH_MY_POSTED_JOBS,
        status: 'pending'
    });

    axios
        .get('/api/mypostedjobs')
        .then(response => {
            console.log(response.data);
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
