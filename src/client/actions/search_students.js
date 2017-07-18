import axios from 'axios';
import {SET_TERM} from '../constants/action_types.js';
import {FETCH_STUDENTS} from '../constants/action_types.js';
import {FETCH_SELECTED_STUDENTS} from '../constants/action_types.js';

export const fetchStudents = () => dispatch => {
    dispatch({
        type: FETCH_STUDENTS,
        status: 'pending'
    });

    axios
        .get(
            '/api/students'
            // {
            //     // params: {term: term}
            // }
        )
        .then(response => {
            dispatch({
                type: FETCH_STUDENTS,
                status: 'success',
                response: response.data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_STUDENTS,
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
