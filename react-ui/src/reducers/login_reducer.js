import {SET_AUTH} from '../constants/action_types.js';

const initialState = {
    email: '',
    password: '',
    errorMessage: '',
    id: undefined,
    role: undefined,
    loggedIn: false,
    isAuthenticated: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case SET_AUTH:
        console.log('llll',action.response);
        return {
            ...state,
            status: action.status,
            error: action.error,
            response: action.response,
            id: action, 
            loggedIn: true,
            isAuthenticated: true,

        };
    default:
        return state;
    }
};
