import { combineReducers } from 'redux';
import { suggestedQuotesReducer as suggestedQuotes } from './suggestedQuotesReducer';
import { 
    quoteAddReducer as quoteAdd, 
    quotesReducer as quotes, 
    quotesFilteredReducer as quotesFiltered,
} from './quoteReducer';
import {     authReducer as auth, } from './authUserReducer';

const reducers = {
    suggestedQuotes,
    quoteAdd,
    quotes,
    quotesFiltered,
    auth,
};

export default combineReducers(reducers);