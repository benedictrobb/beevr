import {combineReducers} from 'redux';

import home from './home';
import searchJobs from './search_jobs_reducer.js';

export default combineReducers({
    home,
    searchJobs
});
