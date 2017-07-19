import {FETCH_STUDENT_JOBS} from '../constants/action_types.js';
import {FETCH_SELECTED_JOBS} from '../constants/action_types.js';
import {SET_SELECTED_JOB} from '../constants/action_types.js';
import {SET_TERM} from '../constants/action_types.js';

const initialState = {
    jobsRequest: {},
    term: '',
    selectedJob: ''
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

    case SET_TERM:
        return {
            ...state,
            term: action.response
        };

    case SET_SELECTED_JOB:
        console.log('action response is ', action.response);
        return {
            ...state,
            selectedJob: action.response
        };

    default:
        return state;
    }

    console.log('state in reducer is ', state);
};
