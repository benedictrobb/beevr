import {APPLY_JOB} from '../constants/action_types.js';

const initialState = {
    applied: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case APPLY_JOB:

            return {
                ...state,
                status: action.status,
                error: action.error,
                applied: [...state.applied, action.response]
            };
        }
    default:
        return state;
    }
};
