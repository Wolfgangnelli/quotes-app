import { 
    ADD_QUOTE_REQUEST, 
    ADD_QUOTE_SUCCESS,
    ADD_QUOTE_FAIL,
} from '../actions/actionTypes';
import { ActionType, QuotesType } from '../../utilis/types';

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
            const existQuote = state.data?.find((quote: QuotesType) => quote.text.toLowerCase() === payload.text.toLowerCase() && quote.author?.toLowerCase() === payload.author.toLowerCase());
            
            if(existQuote) {
                return {
                    ...state,
                    data: state.data.map((quote: QuotesType) => quote.author?.toLowerCase() === payload.text.toLowerCase() && quote.author?.toLowerCase() === payload.author.toLowerCase() ? payload : quote)
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