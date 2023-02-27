import { 
    ADD_QUOTE_REQUEST, 
    ADD_QUOTE_SUCCESS,
    ADD_QUOTE_FAIL,
    GET_QUOTES_REQUEST,
    GET_QUOTES_SUCCESS,
    GET_QUOTES_FAIL,
} from '../actions/actionTypes';
import { ActionType, QuoteType } from '../../utilis/types';

const initialState = {
        data: [],
        loading: false,
};

export const quoteAddReducer = ( state = initialState, { type, payload }: ActionType) => {
    switch (type) {
        case ADD_QUOTE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_QUOTE_SUCCESS:
            // check if quote already exist in the list
            const existQuote = state.data?.find((quote: QuoteType) => quote.text.toLowerCase() === payload.text.toLowerCase() && quote.author?.toLowerCase() === payload.author.toLowerCase());
            
            if(existQuote) {
                return {
                    ...state,
                    data: state.data.map((quote: QuoteType) => quote.author?.toLowerCase() === payload.text.toLowerCase() && quote.author?.toLowerCase() === payload.author.toLowerCase() ? payload : quote)
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    data: [...state.data, payload]
                };
            }
        case ADD_QUOTE_FAIL:
            return {
                loading: false,
                error: payload
            };

        default:
            return state;
    }
};

export const quotesReducer = (state = initialState, { type, payload}: ActionType) => {
    switch (type) {
        case GET_QUOTES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_QUOTES_SUCCESS:
            return {
                loading: false,
                data: payload
            };
        case GET_QUOTES_FAIL:
            return {
                loading: false,
                error: payload
            };
    
        default:
            return state;
    }
};