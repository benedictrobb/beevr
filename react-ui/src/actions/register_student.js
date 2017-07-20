import axios from 'axios';
import {REGISTER_STUDENT} from '../constants/action_types.js';

export const registerStudent = studentObject => dispatch => {
    dispatch({
        type: REGISTER_STUDENT,
        status: 'pending'
    });

    axios
        .post('api/reg-student', studentObject)
        .then(response => {
            dispatch({
                type: REGISTER_STUDENT,
                status: 'success',
                response: response.confirm
            });
        })
        .catch(error => {
            dispatch({
                type: REGISTER_STUDENT,
                status: 'error',
                error: error
            });
        });
};
