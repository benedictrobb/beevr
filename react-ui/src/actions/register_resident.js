import axios from 'axios';
import {REGISTER_RESIDENT} from '../constants/action_types.js';

export const registerResident = residentObject => dispatch => {
    dispatch({
        type: REGISTER_RESIDENT,
        status: 'pending'
    });

    axios
        .post('api/reg-resident', residentObject)
        .then(response => {
            dispatch({
                type: REGISTER_RESIDENT,
                status: 'success',
                response: response.confirm
            });
        })
        .catch(error => {
            dispatch({
                type: REGISTER_RESIDENT,
                status: 'error',
                error: error
            });
        });
};
