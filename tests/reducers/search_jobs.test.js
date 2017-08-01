import reducer from '../../react-ui/src/reducers/search_jobs_reducer.js';
import * as types from '../../react-ui/src/constants/action_types.js';

describe('my_jobs reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            jobsRequest: {},
            term: '',
            selectedJob: ''
        });
    });

    it('should handle FETCH_STUDENT_JOBS', () => {
        expect(
            reducer(
                {},
                {
                    type: types.FETCH_STUDENT_JOBS,
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

    it('should handle FETCH_STUDENT_JOBS', () => {
        expect(
            reducer(
                {},
                {
                    type: types.FETCH_STUDENT_JOBS,
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

    it('should handle SET_TERM', () => {
        expect(
            reducer(
                {},
                {
                    type: types.SET_TERM,
                    response: 'coding'
                }
            )
        ).toEqual({
            searchTerm: 'coding'
        });
    });

    it('should handle SET_SELECTED_JOB', () => {
        expect(
            reducer(
                {},
                {
                    type: types.SET_SELECTED_JOB,
                    response: 2
                }
            )
        ).toEqual({
            selectedJob: 2
        });
    });
});
