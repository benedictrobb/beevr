import {FETCH_STUDENTS, SET_TERM} from '../constants/action_types.js';

const initialState = {
    studentsRequest: {},
    searchTerm: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
    case FETCH_STUDENTS:
        return {
            ...state,
            studentsRequest: {
                status: action.status,
                error: action.error,
                response: action.response,
            },
        };

    case SET_TERM:
        return {
            ...state,
            searchTerm: action.response,
        };

    default:
        return state;
    }
};
