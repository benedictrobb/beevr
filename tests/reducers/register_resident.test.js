import reducer from '../../react-ui/src/reducers/register_resident_reducer.js';
import * as types from '../../react-ui/src/constants/action_types.js';

describe('register resident reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            loggedIn: false,
            isAuthenticated: false,
            resident: {},
        });
    });

    it('should handle.REGISTER_RESIDENT', () => {
        expect(
            reducer(
                {},
                {
                    type: types.REGISTER_RESIDENT,
                    status: 'pending',
                }
            )
        ).toEqual({
            resident: {
                status: 'pending',
                error: undefined,
                response: undefined,
            },
        });
    });

    it('should handle REGISTER_RESIDENT', () => {
        expect(
            reducer(
                {},
                {
                    type: types.REGISTER_RESIDENT,
                    status: 'success',
                    response: {
                        first_name: 'Adam',
                        last_name: 'Smith',
                        email: 'adam.smith@gmail.com',
                        dob: '01/01/2000',
                        address: '123 Pretty Street',
                        bio: 'Lorem Ipsum',
                        phone: '777-77-777',
                    },
                }
            )
        ).toEqual({
            resident: {
                status: 'success',
                error: undefined,
                response: {
                    first_name: 'Adam',
                    last_name: 'Smith',
                    email: 'adam.smith@gmail.com',
                    dob: '01/01/2000',
                    address: '123 Pretty Street',
                    bio: 'Lorem Ipsum',
                    phone: '777-77-777',
                },
            },
        });
    });
});
