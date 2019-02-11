import HackathonService from '@/services/hackathon';

const hackathonService = new HackathonService();

export const ACTIONS = {
    HACKATHON_CREATE: 'HACKATHON_CREATE',
    HACKATHON_CREATE_SUCCESS: 'HACKATHON_CREATE_SUCCESS',
    HACKATHON_CREATE_FAILURE: 'HACKATHON_CREATE_FAILURE',
    HACKATHON_LIST: 'HACKATHON_LIST',
    HACKATHON_LIST_SUCCESS: 'HACKATHON_LIST_SUCCESS',
    HACKATHON_LIST_FAILURE: 'HACKATHON_LIST_FAILURE',
    HACKATHON_SET_WINNER_MODAL_HIDE: 'HACKATHON_SET_WINNER_MODAL_HIDE',
    HACKATHON_SET_WINNER_MODAL_SHOW: 'HACKATHON_SET_WINNER_MODAL_SHOW',
};

export function create(hackathon: any) {
    return async (dispatch) => {
        dispatch({ type: ACTIONS.HACKATHON_CREATE });
        try {
            await hackathonService.create(hackathon);
            dispatch({ type: ACTIONS.HACKATHON_CREATE_SUCCESS });
        }
        catch (err) {
            dispatch({ type: ACTIONS.HACKATHON_CREATE_FAILURE, payload: err });
        }
    };
}

export function list() {
    return async (dispatch) => {
        dispatch({ type: ACTIONS.HACKATHON_LIST });
        try {
            dispatch({ type: ACTIONS.HACKATHON_LIST_SUCCESS, payload: await hackathonService.list() });
        }
        catch (err) {
            dispatch({ type: ACTIONS.HACKATHON_LIST_FAILURE, payload: err });
        }
    };
}

export function setWinners(hackathon: any, address: [string]) {
    return async (dispatch) => {
        dispatch({ type: ACTIONS.HACKATHON_LIST });
        try {
            await hackathonService.assignWinner(hackathon, address[0]);
            dispatch({ type: ACTIONS.HACKATHON_LIST_SUCCESS });
        }
        catch (err) {
            dispatch({ type: ACTIONS.HACKATHON_LIST_FAILURE, payload: err });
        }
    };
}
