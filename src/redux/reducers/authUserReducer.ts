import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAIL } from '../actions/actionTypes';
import { ActionType } from '../../utilis/types';


const initialState = {
    data: {},
    loading: false,
};

export const createUserReducer = (state = initialState, { type, payload }: ActionType) => {
    switch (type) {
        case CREATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_USER_SUCCESS:
            return {
                loading: false,
                data: payload
            };
        case CREATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
};