import {combineReducers} from 'redux';

import home from './home';
import studentDashboard from './search_jobs_reducer.js';

export default combineReducers({
    home,
    studentDashboard
});
