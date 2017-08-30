import {FETCH_RESIDENTS, SET_TERM} from '../constants/action_types.js';

const initialState = {
    residentsRequest: {},
    searchTerm: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
    case FETCH_RESIDENTS:
        return {
            ...state,
            studentsRequest: {
                status: action.status,
                error: action.error,
                response: action.response,
            },
        };

    default:
        return state;
    }
};
