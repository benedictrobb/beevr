import {REGISTER_RESIDENT} from '../constants/action_types.js';

const initialState = {
    loggedIn: false,
    isAuthenticated: false,
    residentObject: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case REGISTER_RESIDENT:
        return {
            ...state,
            residentObject: {
                status: action.status,
                error: action.error,
                response: action.response
            }
        };
    default:
        return state;
    }
};
