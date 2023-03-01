import { combineReducers } from 'redux';
import { suggestedQuotesReducer as suggestedQuotes } from './suggestedQuotesReducer';
import { 
    quoteAddReducer as quoteAdd, 
    quotesReducer as quotes, 
    quotesFilteredReducer as quotesFiltered,
} from './quoteReducer';
import {     createUserReducer as user, } from './authUserReducer';

const reducers = {
    suggestedQuotes,
    quoteAdd,
    quotes,
    quotesFiltered,
    user,
};

export default combineReducers(reducers);