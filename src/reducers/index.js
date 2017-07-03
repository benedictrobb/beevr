// import { combineReducers } from 'redux';
//
// const rootReducer = combineReducers({
//   state: (state = {}) => state
// });
//
// export default rootReducer;

import { CHANGE_FORM } from '../constants/AppConstants';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign;
// || require('object.assign');


// The initial application state
const initialState = {
  formState: {
    username: '',
    password: ''
  },
  currentlySending: false,
  errorMessage: ''
};

// Takes care of changing the application state
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return assign({}, state, {
        formState: action.newState
      });
      break;
    default:
      return state;
  }
}
