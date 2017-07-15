import { FETCH_STUDENT_EMAIL } from "../constants/action_types.js";

const initialState = {
    emailRequest: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENT_EMAIL:
            return {
                ...state,
                emailRequest: {
                    status: action.status,
                    error: action.error,
                    response: action.response
                }
            };
        default:
            return state;
    }
};
