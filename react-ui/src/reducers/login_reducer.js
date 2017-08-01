import {SET_AUTH} from '../constants/action_types.js';

const initialState = {
    email: '',
    password: '',
    errorMessage: '',
    loggedIn: false,
    isAuthenticated: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case SET_AUTH:
        return {
            status: action.status,
            error: action.error,
            response: action.response

        };
    default:
        return state;
    }
};
