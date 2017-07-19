/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import {
    CHANGE_FORM,
    SET_AUTH,
    SENDING_REQUEST,
    SET_ERROR_MESSAGE
} from '../constants/action_types.js';
import beevrAPI from '../utils/beevrAPI.js';

const assign = Object.assign;

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
        break;
    case SET_AUTH:
        return {
            ...state,
            loggedIn: action.newState
        };
        break;
    case SENDING_REQUEST:
        return {
            ...state,
            currentlySending: action.sending
        };
        break;
    case SET_ERROR_MESSAGE:
        return {
            ...state,
            errorMessage: action.message
        };
    default:
        return state;
    }
}
