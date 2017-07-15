import axios from 'axios';
import {POST_JOB} from '../constants/action_types.js';

export const postJob = () => dispatch => {
    console.log('iside PostJOb');
    dispatch({
        type: POST_JOB,
        status: 'pending'
    });

    axios
        .post('/api/jobs', {
            start_date: '03/07/2017',
            start_time: '12:00',
            end_date: '12/12/12',
            end_time: '07:00',
            job_title: 'Hello Chello',
            description: 'Lorem Ipsum',
            rate: '100.00',
            resident_id: '1',
            category: 'fishing'
        })
        .then(response => {
            console.log('iside then response');
            dispatch({
                type: POST_JOB,
                status: 'success',
                response: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: POST_JOB,
                status: 'error',
                error: error
            });
        });
};
