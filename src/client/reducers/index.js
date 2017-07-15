import {combineReducers} from 'redux';

import home from './home';
import postJob from './post_job_reducer.js';

export default combineReducers({
    home,
    postJob
});
