import {FETCH_MY_POSTED_JOBS} from '../constants/action_types.js';
import {DELETE_JOB} from '../constants/action_types.js';

const initialState = {
    jobsRequest: {},
    isDeleted: false
};

export default (state = initialState, action) => {
    switch (action.type) {
    case FETCH_MY_POSTED_JOBS:
        return {
            ...state,
            jobsRequest: {
                status: action.status,
                error: action.error,
                response: action.response
            }
        };

    case DELETE_JOB:
        return {
            ...state,
            isDeleted: true
        };

    default:
        return state;
    }
};
