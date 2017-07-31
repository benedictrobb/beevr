import reducer from '../my_jobs.js';
import * as types from '../../constants/action_types.js';

describe('my_jobs reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            jobsRequest: {}
        });
    });

    it('should handle FETCH_MY_JOBS', () => {
        expect(
            reducer(
                {},
                {
                    type: types.FETCH_MY_JOBS,
                    status: 'pending'
                }
            )
        ).toEqual({
            jobsRequest: {
                status: 'pending',
                error: undefined,
                response: undefined
            }
        });
    });

    it('should handle FETCH_MY_JOBS', () => {
        expect(
            reducer(
                {},
                {
                    type: types.FETCH_MY_JOBS,
                    status: 'success',
                    response: [
                        {
                            start_date: '01/12/90',
                            start_time: '12:00',
                            end_date: '12/12/12',
                            end_time: '07:00',
                            job_title: 'Hello Chello',
                            description: 'Lorem Ipsum',
                            rate: '100',
                            category: 'photography'
                        },
                        {
                            start_date: '01/12/90',
                            start_time: '12:00',
                            end_date: '12/12/12',
                            end_time: '07:00',
                            job_title: 'Dog walking',
                            description: 'Lorem Ipsum',
                            rate: '10',
                            category: 'dog walking'
                        }
                    ]
                }
            )
        ).toEqual({
            jobsRequest: {
                status: 'success',
                error: undefined,
                response: [
                    {
                        start_date: '01/12/90',
                        start_time: '12:00',
                        end_date: '12/12/12',
                        end_time: '07:00',
                        job_title: 'Hello Chello',
                        description: 'Lorem Ipsum',
                        rate: '100',
                        category: 'photography'
                    },
                    {
                        start_date: '01/12/90',
                        start_time: '12:00',
                        end_date: '12/12/12',
                        end_time: '07:00',
                        job_title: 'Dog walking',
                        description: 'Lorem Ipsum',
                        rate: '10',
                        category: 'dog walking'
                    }
                ]
            }
        });
    });
});
