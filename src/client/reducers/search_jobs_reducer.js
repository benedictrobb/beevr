import {FETCH_STUDENT_JOBS} from '../constants/action_types.js';
import {FETCH_SELECTED_JOBS} from '../constants/action_types.js';

const initialState = {
    jobsRequest: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
    case FETCH_STUDENT_JOBS:
        return {
            ...state,
            jobsRequest: {
                status: action.status,
                error: action.error,
                response: action.response
            }
        };
    case FETCH_SELECTED_JOBS:
        return {
            ...state,
            jobsRequest: {
                status: action.status,
                error: action.error,
                response: action.response
            }
        };

    default:
        return state;
    }
};
