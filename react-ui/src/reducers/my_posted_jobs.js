import {FETCH_MY_POSTED_JOBS} from '../constants/action_types.js';

const initialState = {
    jobsRequest: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
    case FETCH_MY_POSTED_JOBS:
        console.log('inside reducer');
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
