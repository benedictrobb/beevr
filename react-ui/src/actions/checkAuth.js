import axios from 'axios';
import {CHECK_AUTH} from '../constants/action_types.js';

export const checkAuth = () => dispatch => {
    dispatch({
        type: CHECK_AUTH,
        status: 'pending',
    });

    axios
        .post('/api/auth')
        .then(response => {
            dispatch({
                type: CHECK_AUTH,
                status: 'success',
                response: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: CHECK_AUTH,
                status: 'error',
                error: 'Invalid credentials',
            });
        });
};
