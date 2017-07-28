import {FETCH_MY_JOBS, DELETE_APPLICATION} from '../constants/action_types.js';

const initialState = {
    jobsRequest: {},
    applicationDeleted: false
};

export default (state = initialState, action) => {
    switch (action.type) {
    case FETCH_MY_JOBS:
        return {
            ...state,
            jobsRequest: {
                status: action.status,
                error: action.error,
                response: action.response
            }
        };

    case DELETE_APPLICATION:
        return {
            ...state,
            applicationDeleted: true
        };

    default:
        return state;
    }
};
