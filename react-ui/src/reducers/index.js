import {combineReducers} from 'redux';

import home from './home';
import searchJobs from './search_jobs_reducer.js';
import postJob from './post_job_reducer.js';
import registerStudent from './register_student_reducer.js';
import registerResident from './register_resident_reducer.js';
import login from './login_reducer.js';
import searchStudents from './search_students_reducer.js';
import applyJob from './apply_job.js';
import fetchMyJobs from './my_jobs.js';

export default combineReducers({
    home,
    searchJobs,
    postJob,
    applyJob,
    registerStudent,
    registerResident,
    login,
    searchStudents,
    searchStudents,
    fetchMyJobs
});
