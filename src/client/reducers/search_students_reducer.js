import {FETCH_STUDENTS} from '../constants/action_types.js';
import {FETCH_SELECTED_STUDENTS} from '../constants/action_types.js';
import {SET_TERM} from '../constants/action_types.js';

const initialState = {
    studentsRequest: {},
    term: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
    case FETCH_STUDENTS:
        console.log('inside small reducer');
        return {
            ...state,
            studentsRequest: {
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

    default:
        return state;
    }
};
