import axios from 'axios';
import {REMOVE_AUTH} from '../constants/action_types.js';

export const logout = () => dispatch => {
    dispatch({
        type: REMOVE_AUTH,
        status: 'pending',
    });

    axios
        .get('/api/logout')
        .then(response => {
            dispatch({
                type: REMOVE_AUTH,
                status: 'success',
                response: response.data,
            });
        })
        .catch(error => {
            dispatch({
                type: REMOVE_AUTH,
                status: 'error',
                error: 'You are still logged on BEEVR!',
            });
        });
};
