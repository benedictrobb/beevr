import reducer from '../../react-ui/src/reducers/post_job_reducer.js';
import * as types from '../../react-ui/src/constants/action_types.js';

describe('post job reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            newJob: {},
            jobData: {},
        });
    });

    it('should handle POST_JOB', () => {
        expect(
            reducer(
                {},
                {
                    type: types.POST_JOB,
                    status: 'pending',
                }
            )
        ).toEqual({
            newJob: {
                status: 'pending',
                error: undefined,
                response: undefined,
            },
        });
    });

    it('should handle POST_JOB', () => {
        expect(
            reducer(
                {},
                {
                    type: types.POST_JOB,
                    status: 'success',
                    response: {
                        start_date: '01/12/90',
                        start_time: '12:00',
                        end_date: '12/12/12',
                        end_time: '07:00',
                        job_title: 'Hello Chello',
                        description: 'Lorem Ipsum',
                        rate: '100',
                        resident_id: '1',
                        category: 'photography',
                    },
                }
            )
        ).toEqual({
            newJob: {
                status: 'success',
                error: undefined,
                response: {
                    start_date: '01/12/90',
                    start_time: '12:00',
                    end_date: '12/12/12',
                    end_time: '07:00',
                    job_title: 'Hello Chello',
                    description: 'Lorem Ipsum',
                    rate: '100',
                    resident_id: '1',
                    category: 'photography',
                },
            },
        });
    });
});
