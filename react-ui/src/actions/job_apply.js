import {APPLY_JOB} from '../constants/action_types.js';
import axios from 'axios';

export const submitJobApplication = job_id => dispatch => {
  dispatch({
    type: APPLY_JOB,
    status: 'pending'
  });
  axios
<<<<<<< HEAD
    .put('/api/apply',{'job_id': job_id})
=======
    .get('/api/apply', {
            params: {job_id}
        })
>>>>>>> ce72015bf62b41fe41e63c8a94e04452278c040e
    .then(response => {
      dispatch({
        type: APPLY_JOB,
        status: 'success',
        response: job_id
      });
    })
    .catch(error => {
      dispatch({
        type: APPLY_JOB,
        status: 'error',
        error: error
      });
    });
};
