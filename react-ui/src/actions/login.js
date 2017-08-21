import axios from 'axios';
import {SET_AUTH} from '../constants/action_types.js';

export const loginRequest = (email, password, onError) => dispatch => {
    dispatch({
        type: SET_AUTH,
        status: 'pending',
    });

    axios
        .post('/api/login', {email, password})
        .then(response => {
            dispatch({
                type: SET_AUTH,
                status: 'success',
                response: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: SET_AUTH,
                status: 'error',
                error: 'Invalid credentials',
            });
            onError();
        });
};
