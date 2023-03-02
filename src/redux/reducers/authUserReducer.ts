import { 
    CREATE_USER_REQUEST, 
    CREATE_USER_SUCCESS, 
    CREATE_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
} from '../actions/actionTypes';
import { ActionType } from '../../utilis/types';

const user = localStorage.getItem('user') ? localStorage.getItem('user') : null;

const initialState = {
    data: user ? JSON.parse(user) : user,
    loading: false,
    isLoggedIn: user ? true : false,
};

export const authReducer = (state = initialState, { type, payload }: ActionType) => {
    switch (type) {
        case CREATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_USER_SUCCESS:
            return {
                loading: false,
                data: payload,
                isLoggedIn: true,
            };
        case CREATE_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
                isLoggedIn: false
            };
        case LOGOUT_USER_REQUEST: 
            return {
                ...state,
                loading: true
            };
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                data: null
            };
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};