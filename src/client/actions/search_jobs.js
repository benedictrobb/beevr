import axios from 'axios';

import {FETCH_STUDENT_JOBS} from '../constants/action_types.js';

export const fetchJobs = () => dispatch => {
    console.log('fetch jobs called');
    dispatch({
        type: FETCH_STUDENT_JOBS,
        status: 'pending'
    });

    axios
        .get('/api/jobs', {
            params: {term: 'dog walking'}
        })
        .then(response => {
            console.log(response);
            // if (response.status === 200) ??
            dispatch({
                type: FETCH_STUDENT_JOBS,
                status: 'success',
                response: response.data
            });
            // } else {
            //   dispatch({
            //       type: FETCH_STUDENT_JOBS,
            //       status: 'error',
            //       error: error
            //   })
            // }
        })
        .catch(err => {
            dispatch({
                type: FETCH_STUDENT_JOBS,
                status: 'error',
                error: err
            });
        });
};
