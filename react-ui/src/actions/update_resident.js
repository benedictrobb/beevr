import axios from 'axios';
import {
    UPDATE_RESIDENT,
    CHECK_EMAIL,
    FETCH_RESIDENTS,
} from '../constants/action_types.js';

export const registerResident = resident => dispatch => {
    dispatch({
        type: UPDATE_RESIDENT,
        status: 'pending',
    });

    axios
        .post('api/resident', resident)
        .then(response => {
            dispatch({
                type: UPDATE_RESIDENT,
                status: 'success',
                response: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: UPDATE_RESIDENT,
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

export const fetchResidents = () => dispatch => {
    dispatch({
        type: FETCH_RESIDENTS,
        status: 'pending',
    });

    axios
        .get('/api/get-residents')
        .then(response => {
            console.log(response.data);
            dispatch({
                type: FETCH_RESIDENTS,
                status: 'success',
                response: response.data,
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_RESIDENTS,
                status: 'error',
                error: err,
            });
        });
};
