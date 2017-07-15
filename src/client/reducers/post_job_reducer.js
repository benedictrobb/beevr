import {POST_JOB} from '../constants/action_types.js';

const initialState = {
    newJob: {},
    jobData: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
    case POST_JOB:
        return {
            ...state,
            newJob: {
                status: action.status,
                error: action.error,
                response: action.response
            }
        };
    default:
        return state;
    }
};
