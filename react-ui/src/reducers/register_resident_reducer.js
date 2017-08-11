import {REGISTER_RESIDENT} from '../constants/action_types.js';

const initialState = {
    errorMessage: '',
    resident: {},
    response: {
        loggedIn: false,
        isAuthenticated: false,
    }
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case REGISTER_RESIDENT:
        return {
            ...state,
            resident: {
                status: action.status,
                error: action.error,
                response: action.response,
            },
        };
    default:
        return state;
    }
};
