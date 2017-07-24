import axios from 'axios';
import {LOGIN_USER} from '../constants/action_types.js';

export const login = user => dispatch => {
    dispatch({
        type: LOGIN_USER,
        status: 'pending'
    });

    axios
        .get('/api/login', user)
        .then(response => {
            dispatch({
                type: LOGIN_USER,
                status: 'succes',
                response: response.confirm
            });
        })
        .catch(error => {
            dispatch({
                type: LOGIN_USER,
                status: 'error',
                //error: error
                error: 'Login Invalid'
            });
        });
};
