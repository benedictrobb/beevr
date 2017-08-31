import {combineReducers} from 'redux';

import searchJobs from './search_jobs_reducer.js';
import postJob from './post_job_reducer.js';
import registerStudent from './register_student_reducer.js';
import registerResident from './register_resident_reducer.js';
import auth from './auth_reducer.js';
import searchStudents from './search_students_reducer.js';
import searchResidents from './search_residents_reducer.js';
import applyJob from './apply_job.js';
import fetchMyPostedJobs from './my_posted_jobs.js';
import fetchMyJobs from './my_jobs.js';
import updateStudent from './update_student_reducer.js';
import updateResident from './update_resident_reducer.js';

export default combineReducers({
    searchJobs,
    postJob,
    applyJob,
    registerStudent,
    registerResident,
    auth,
    searchStudents,
    fetchMyPostedJobs,
    fetchMyJobs,
    updateStudent,
    updateResident,
    searchResidents,
});
