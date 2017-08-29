import axios from 'axios';
import {SET_TERM, FETCH_STUDENTS} from '../constants/action_types.js';

export const fetchStudents = searchTerm => dispatch => {
    console.log('inside actions');
    dispatch({
        type: FETCH_STUDENTS,
        status: 'pending',
    });

    axios
        .get('/api/get-students', {
            params: {searchTerm: searchTerm},
        })
        .then(response => {
            dispatch({
                type: FETCH_STUDENTS,
                status: 'success',
                response: response.data,
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_STUDENTS,
                status: 'error',
                error: err,
            });
        });
};

export const setTerm = Searchterm => dispatch => {
    dispatch({
        type: SET_TERM,
        response: Searchterm,
    });
};
