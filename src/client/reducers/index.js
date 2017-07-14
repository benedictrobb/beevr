import {combineReducers} from 'redux';

import home from './home';
import search_jobs_reducer from './search_jobs_reducer.js';

export default combineReducers({
    home,
    studentDashboard
});
