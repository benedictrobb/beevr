import {CHECK_AUTH} from '../constants/action_types.js';
import {SET_AUTH} from '../constants/action_types.js';
import {REMOVE_AUTH} from '../constants/action_types.js';

const initialState = {
    email: '',
    password: '',
    errorMessage: '',
    loggedIn: false,
    isAuthenticated: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case CHECK_AUTH:
        return {
            ...state,
            status: action.status,
            error: action.error,
            response: action.response,
        };
    case SET_AUTH:
        return {
            ...state,
            status: action.status,
            error: action.error,
            response: action.response,
            loggedIn: true,
            isAuthenticated: true,

        };
    case REMOVE_AUTH:
        return {
            ...state,
            status: action.status,
            error: action.error,
            response: action.response,
            loggedIn: false,
            isAuthenticated: false,
        };
    default:
        return state;
    }
};
