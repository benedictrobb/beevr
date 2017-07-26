import reducer from '../post_job_reducer.js';
import * as types from '../../constants/action_types.js';

describe('post job reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            newJob: {},
            jobData: {}
        });
    });
});
