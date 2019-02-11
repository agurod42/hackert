import { ACTIONS } from '@/app/hackathon/hackathon.actions';

export default function (state = {}, action) {
    switch (action.type) {
        
        case ACTIONS.HACKATHON_CREATE: {
            return { ...state, loading: true }
        }
        
        case ACTIONS.HACKATHON_CREATE_SUCCESS: {
            return { ...state, loading: false, error: false, hackathon: action.payload }
        }
        
        case ACTIONS.HACKATHON_CREATE_FAILURE: {
            return { ...state, loading: false, error: action.payload, hackathon: {} }
        }
        
        case ACTIONS.HACKATHON_LIST: {
            return { ...state, loading: true }
        }
        
        case ACTIONS.HACKATHON_LIST_SUCCESS: {
            return { ...state, loading: false, error: false, hackathons: action.payload }
        }
        
        case ACTIONS.HACKATHON_LIST_FAILURE: {
            return { ...state, loading: false, error: action.payload, hackathon: {} }
        }

        default: {
            return state
        }

    }
}