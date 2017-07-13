import {
    CHANGE_FORM,
    SET_AUTH,
    SENDING_REQUEST,
    SET_ERROR_MESSAGE
} from '../constants/AppConstants';

const assign = Object.assign;
import beevrAPI from '../utils/beevrAPI.js';

const initialState = {
    formState: {
        username: '',
        password: ''
    },
    currentlySending: false,
    loggedIn: beevrAPI.loggedIn(),
    errorMessage: ''
};

// Takes care of changing the application state
export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_FORM:
            return {
                ...state,
                formState: action.newState
            };
        case SET_AUTH:
            return {
                ...state,
                loggedIn: action.newState
            };
        case SENDING_REQUEST:
            return {
                ...state,
                currentlySending: action.sending
            };
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.message
            };
        default:
            return state;
        }
    }
