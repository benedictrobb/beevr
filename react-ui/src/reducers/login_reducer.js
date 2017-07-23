import {LOGIN_USER} from '../constants/action_types.js';

const initialState = {
    identity: '',
    email: '',
    password: '',
    errorMessage: '',
    loggedIn: false,
    isAuthenticated: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case LOGIN_USER:
        return {
            status: action.status,
            error: action.error,
            response: action.response

        };
    default:
        return state;
    }
};
