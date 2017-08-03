import {FETCH_MY_POSTED_JOBS, DELETE_JOB} from '../constants/action_types.js';

const initialState = {
    jobsPosted: {
        requestStatus: undefined,
        requestError: undefined,
        jobs: [],
    },
    deleteJobRequests: {},
};

const getJobs = (jobsPosted, action) => {
    switch (action.status) {
    case 'pending':
        return {
            ...jobsPosted,
            requestStatus: 'pending',
        };
    case 'error':
        return {
            ...jobsPosted,
            jobs: [],
            requestStatus: 'error',
            requestError: action.error,
        };
    case 'success':
        return {
            ...jobsPosted,
            jobs: action.response.myJobsList,
            requestStatus: 'success',
            requestError: undefined,
        };
    }
};

const deleteJob = (state, action) => {
    const {deleteJobRequests, jobsPosted} = state;
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
            jobsPosted: {
                ...jobsPosted,
                jobs: jobsPosted.jobs.filter(function(job) {
                    return job.jobId !== action.jobId;
                }),
            },
        };
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
    case FETCH_MY_JOBS:
        return {
            ...state,
            jobsPosted: getJobs(state.jobsPosted, action),
        };
    case DELETE_APPLICATION: {
        return deleteJob(state, action);
    }

    default:
        return state;
    }
};
