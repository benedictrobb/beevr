import axios from 'axios';
import {UPDATE_STUDENT, CHECK_EMAIL} from '../constants/action_types.js';

export const registerStudent = student => dispatch => {
    dispatch({
        type: UPDATE_STUDENT,
        status: 'pending',
    });

    axios
        .post('api/student', student)
        .then(response => {
            dispatch({
                type: UPDATE_STUDENT,
                status: 'success',
                response: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: UPDATE_STUDENT,
                status: 'error',
                error: error.message,
            });
        });
};

export const checkIfStudentExists = email => dispatch => {
    dispatch({
        type: CHECK_EMAIL,
        status: 'pending',
    });

    axios
        .post('api/student/does-exist', {email})
        .then(response => {
            dispatch({
                type: CHECK_EMAIL,
                status: 'success',
                response: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: CHECK_EMAIL,
                status: 'error',
                error: error.message,
            });
        });
};

export const updateStudent = student => dispatch => {
    dispatch({
        type: UPDATE_STUDENT,
        student: student,
    });
};
