import axios from 'axios';
import {FETCH_SELECTED_JOBS} from '../constants/action_types.js';
import {FETCH_STUDENT_JOBS} from '../constants/action_types.js';
import {SET_TERM} from '../constants/action_types.js';

export const fetchJobs = term => dispatch => {
    dispatch({
        type: FETCH_STUDENT_JOBS,
        status: 'pending'
    });

    axios
        .get('/api/jobs', {
            params: {term: term}
        })
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

export const setTerm = Searchterm => dispatch => {
    dispatch({
        type: SET_TERM,
        response: Searchterm
    });
};
