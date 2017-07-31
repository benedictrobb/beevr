import {APPLY_JOB} from '../constants/action_types.js';
import axios from 'axios';

export const submitJobApplication = job_id => dispatch => {
  dispatch({
    type: APPLY_JOB,
    status: 'pending'
  });
  axios
    .get('/api/apply', {
            params: {job_id}
        })
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
