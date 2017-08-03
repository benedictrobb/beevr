import reducer from '../../react-ui/src/reducers/apply_job.js';
import * as types from '../../react-ui/src/constants/action_types.js';

describe('apply job reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            applied: []
        });
    });

    it('should handle APPLY_JOB sending first job', () => {
        expect(
            reducer(undefined, {
                type: types.APPLY_JOB,
                status: 'success',
                response: 2
            })
        ).toEqual({
            applied: [2],
            status: 'success',
            error: undefined
        });
    });

    it('should handle APPLY_JOB sending more jobs', () => {
        expect(
            reducer(
                {
                    applied: [2]
                },
                {
                    type: types.APPLY_JOB,
                    status: 'success',
                    response: 4
                }
            )
        ).toEqual({
            applied: [2, 4],
            status: 'success',
            error: undefined
        });
    });
});
