import axios from 'axios';
import {REGISTER_STUDENT} from '../constants/action_types.js';
import {CHECK_EMAIL} from '../constants/action_types.js';

export const registerStudent = student => dispatch => {
    dispatch({
        type: REGISTER_STUDENT,
        status: 'pending',
    });

    axios
        .post('api/reg-student', student)
        .then(response => {
            dispatch({
                type: REGISTER_STUDENT,
                status: 'success',
                response: response.data.confirm,
            });
        })
        .catch(error => {
            dispatch({
                type: REGISTER_STUDENT,
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
        .post('api/student', {email})
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
