import {  
    GET_SUGGESTED_QUOTES_REQUEST, 
    GET_SUGGESTED_QUOTES_SUCCESS, 
    GET_SUGGESTED_QUOTES_FAIL 
} from '../actions/actionTypes';
import { ActionType, SuggestedQuotesState } from '../../utilis/types';


const initialState: SuggestedQuotesState = {
    loading: true,
    data: []
};

export const suggestedQuotesReducer = ( state = initialState, { type, payload }: ActionType) => {
    switch (type) {
        case GET_SUGGESTED_QUOTES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_SUGGESTED_QUOTES_SUCCESS:
            return {
                loading: false,
                data: payload
            };
        case GET_SUGGESTED_QUOTES_FAIL:
            return {
                loading: false,
                error: payload
            };
        default:
            return state;
    }
};