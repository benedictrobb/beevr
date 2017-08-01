import {APPLY_JOB, FETCH_JOBS} from '../constants/action_types.js';

const initialState = {
    applied: [],
    isLoading= false,
    jobsRequest: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
    case APPLY_JOB:
        return {
            ...state,
            status: action.status,
            error: action.error,
            applied: [...state.applied, action.response],
        };
    case FETCH_JOBS:
        if (action.status === 'pending') {
            return {
                ...state,
                status: action.status,
                isLoading: true,
            };
        } else {
            return {
                ...state,
                status: action.status,
                error: action.error,
                applied: [...state.applied, action.response],
                isLoading: false,
            };
        }
    default:
        return state;
    }
};
