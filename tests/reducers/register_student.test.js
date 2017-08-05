import reducer from '../../react-ui/src/reducers/register_student_reducer.js';
import * as types from '../../react-ui/src/constants/action_types.js';

describe('register student reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            loggedIn: false,
            isAuthenticated: false,
            student: {},
        });
    });

    it('should handle.REGISTER_STUDENT', () => {
        expect(
            reducer(
                {},
                {
                    type: types.REGISTER_STUDENT,
                    status: 'pending',
                }
            )
        ).toEqual({
            student: {
                status: 'pending',
                error: undefined,
                response: undefined,
            },
        });
    });

    it('should handle REGISTER_STUDENT', () => {
        expect(
            reducer(
                {},
                {
                    type: types.REGISTER_STUDENT,
                    status: 'success',
                    response: {
                        first_name: 'Adam',
                        last_name: 'Smith',
                        email: 'adam.smith@gmail.com',
                        dob: '01/01/2000',
                        univ_school: 'Cambridge',
                        bio: 'Lorem Ipsum',
                        phone: '777-77-777',
                        job_cat: '{{coding},{science},{handyman}}',
                    },
                }
            )
        ).toEqual({
            student: {
                status: 'success',
                error: undefined,
                response: {
                    first_name: 'Adam',
                    last_name: 'Smith',
                    email: 'adam.smith@gmail.com',
                    dob: '01/01/2000',
                    univ_school: 'Cambridge',
                    bio: 'Lorem Ipsum',
                    phone: '777-77-777',
                    job_cat: '{{coding},{science},{handyman}}',
                },
            },
        });
    });
});
