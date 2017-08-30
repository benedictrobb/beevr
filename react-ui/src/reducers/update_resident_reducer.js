import {UPDATE_RESIDENT} from '../constants/action_types.js';

const initialState = {
    errorMessage: '',
    resident: {},
    response: {
        isLogged: false,
        isAuthenticated: false,
    },
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case UPDATE_RESIDENT:
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
