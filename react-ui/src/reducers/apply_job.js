import {APPLY_JOB, FETCH_JOBS} from '../constants/action_types.js';

const initialState = {
    applied: [],
    jobsRequest: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
    case APPLY_JOB:
        if (action.status === 'pending') {
            return {
                ...state,
                status: action.status,
            };
        } else {
            console.log('action.response in reducer is ', action.response);
            return {
                ...state,
                status: action.status,
                error: action.error,
                applied: [...state.applied, action.response],
            };
        }

    case FETCH_JOBS:
        return {
            ...state,
            jobsRequest: {
                status: action.status,
                error: action.error,
                response: action.response,
            },
        };
    default:
        return state;
    }
};
