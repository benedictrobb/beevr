import axios from 'axios';
import {REGISTER_RESIDENT, CHECK_EMAIL} from '../constants/action_types.js';

export const registerResident = resident => dispatch => {
    dispatch({
        type: REGISTER_RESIDENT,
        status: 'pending',
    });

    axios
        .post('api/resident', resident)
        .then(response => {
            dispatch({
                type: REGISTER_RESIDENT,
                status: 'success',
                response: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: REGISTER_RESIDENT,
                status: 'error',
                error: 'I am an ERROR!',
            });
        });
};

export const checkIfResidentExists = email => dispatch => {
    dispatch({
        type: CHECK_EMAIL,
        status: 'pending',
    });

    axios
        .post('api/resident/does-exist', {email})
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
