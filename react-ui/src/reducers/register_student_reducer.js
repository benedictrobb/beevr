import {REGISTER_STUDENT} from '../constants/action_types.js';

const initialState = {
    loggedIn: false,
    isAuthenticated: false,
    studentObject: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case REGISTER_STUDENT:
        return {
            ...state,
            studentObject: {
                status: action.status,
                error: action.error,
                response: action.response
            }
        };
    default:
        return state;
    }
};
