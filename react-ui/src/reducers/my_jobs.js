import {FETCH_MY_JOBS, DELETE_APPLICATION} from '../constants/action_types.js';

const initialState = {
    jobsApplied: {
        requestStatus: undefined,
        requestError: undefined,
        jobs: [],
    },
    deleteJobRequests: {},
};

const getJobs = (jobsApplied, action) => {
    switch (action.status) {
    case 'pending':
        return {
            ...jobsApplied,
            requestStatus: 'pending',
        };
    case 'error':
        return {
            ...jobsApplied,
            jobs: [],
            requestStatus: 'error',
            requestError: action.error,
        };
    case 'success':
        return {
            ...jobsApplied,
            jobs: action.response,
            requestStatus: 'success',
            requestError: undefined,
        };
    }
};

const deleteJob = (state, action) => {
    const {deleteJobRequests, jobsApplied} = state;
    switch (action.status) {
    case 'pending':
        return {
            ...state,
            deleteJobRequests: {
                ...deleteJobRequests,
                [action.jobId]: {
                    status: 'pending',
                },
            },
        };
    case 'error':
        return {
            ...state,
            deleteJobRequests: {
                ...deleteJobRequests,
                [action.jobId]: {
                    requestStatus: 'error',
                    requestError: action.error,
                },
            },
        };
    case 'success':
        return {
            ...state,
            deleteJobRequests: {
                ...deleteJobRequests,
                [action.jobId]: undefined,
            },
            jobsApplied: {
                ...jobsApplied,
                jobs: jobsApplied.jobs.filter(
                    job => job.jobId !== action.jobId
                ),
            },
        };
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
    case FETCH_MY_JOBS:
        return {
            ...state,
            jobsApplied: getJobs(state.jobsApplied, action),
        };
    case DELETE_APPLICATION: {
        return deleteJob(state, action);
    }

    default:
        return state;
    }
};
