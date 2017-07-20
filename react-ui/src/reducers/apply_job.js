import {APPLY_JOB} from '../constants/action_types.js';

const initialState = {
    applied: false
};

export default (state = initialState, action) => {
    console.log('inside reducer');
    switch (action.type) {
    case APPLY_JOB:
        return {
            ...state,
            applied: true
        };
    default:
        return state;
    }
};
