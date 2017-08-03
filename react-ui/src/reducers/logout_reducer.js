import {REMOVE_AUTH} from '../constants/action_types.js';

const initialState = {
    errorMessage: '',
    loggedIn: true,
    isAuthenticated: true,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case REMOVE_AUTH:
        return {
            status: action.status,
            error: action.error,
            response: action.response,
            state: initialState,
            loggedIn: false,
            isAuthenticated: false,
        };
    default:
        return state;
    }
};
