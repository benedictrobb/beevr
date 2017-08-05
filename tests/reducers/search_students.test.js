import reducer from '../../react-ui/src/reducers/search_students_reducer.js';
import * as types from '../../react-ui/src/constants/action_types.js';

describe('search students reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            studentsRequest: {},
            searchTerm: '',
        });
    });

    it('should handle FETCH_STUDENTS', () => {
        expect(
            reducer(
                {},
                {
                    type: types.FETCH_STUDENTS,
                    status: 'pending',
                }
            )
        ).toEqual({
            studentsRequest: {
                status: 'pending',
                error: undefined,
                response: undefined,
            },
        });
    });

    it('should handle FETCH_STUDENTS', () => {
        expect(
            reducer(
                {},
                {
                    type: types.FETCH_STUDENTS,
                    status: 'success',
                    response: [
                        {
                            first_name: 'Adam',
                            last_name: 'Smith',
                            univ_school: 'Cambridge',
                            bio: 'Lorem Ipsum',
                            job_cat: '{{coding},{science},{handyman}}',
                        },
                        {
                            first_name: 'Jane',
                            last_name: 'Smith',
                            univ_school: 'Cambridge',
                            bio: 'Lorem Ipsum',
                            job_cat: '{{coding},{dog walking},{handyman}}',
                        },
                    ],
                }
            )
        ).toEqual({
            studentsRequest: {
                status: 'success',
                error: undefined,
                response: [
                    {
                        first_name: 'Adam',
                        last_name: 'Smith',
                        univ_school: 'Cambridge',
                        bio: 'Lorem Ipsum',
                        job_cat: '{{coding},{science},{handyman}}',
                    },
                    {
                        first_name: 'Jane',
                        last_name: 'Smith',
                        univ_school: 'Cambridge',
                        bio: 'Lorem Ipsum',
                        job_cat: '{{coding},{dog walking},{handyman}}',
                    },
                ],
            },
        });
    });

    it('should handle SET_TERM', () => {
        expect(
            reducer(
                {},
                {
                    type: types.SET_TERM,
                    response: 'coding',
                }
            )
        ).toEqual({
            searchTerm: 'coding',
        });
    });
});
