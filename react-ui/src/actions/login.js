import axios from 'axios';
import {SET_AUTH} from '../constants/action_types.js';

export const loginRequest = (email, password) => dispatch => {
    dispatch({
        type: SET_AUTH,
        status: 'pending',
    });

    axios
        .post('/api/auth', {email, password})
        .then(response => {
            dispatch({
                type: SET_AUTH,
                status: 'success',
                response: response.confirm,
            });
        })
        .catch(error => {
            dispatch({
                type: SET_AUTH,
                status: 'error',
                error: 'Invalid credentials',
            });
        });
};
