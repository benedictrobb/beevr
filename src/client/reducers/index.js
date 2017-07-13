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

import { combineReducers } from 'redux'

import home from './home'
import studentDashboard from './student_dashboard'

export default combineReducers({
  // home,
  // studentDashboard
})


// before
// {
//     formState: {
//         username: '',
//         password: ''
//     },
//     currentlySending: false,
//     loggedIn: beevrAPI.loggedIn(),
//     errorMessage: ''
// };
// after
// {
//     home: {
//         formState: {
//             username: '',
//             password: ''
//         },
//         currentlySending: false,
//         loggedIn: beevrAPI.loggedIn(),
//         errorMessage: ''
//     },
//     studentDashboard: {
//         jobsRequest: {}
//     }
// }
