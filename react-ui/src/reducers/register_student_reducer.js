import {REGISTER_STUDENT} from '../constants/action_types.js';

const initialState = {
    student: {
        jobCheckboxes: {},
    },
    errorMessage: '',
    isAuthenticated: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case REGISTER_STUDENT:
        return {
            ...state,
            student: {
                status: action.status,
                error: action.error,
                response: action.response,
            },
        };
    default:
        return state;
    }
};
