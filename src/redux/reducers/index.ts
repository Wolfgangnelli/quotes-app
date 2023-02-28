import { combineReducers } from 'redux';
import { suggestedQuotesReducer as suggestedQuotes } from './suggestedQuotesReducer';
import { quoteAddReducer as quoteAdd, quotesReducer as quotes, quotesFilteredReducer as quotesFiltered } from './quoteReducer';

const reducers = {
    suggestedQuotes,
    quoteAdd,
    quotes,
    quotesFiltered,
};

export default combineReducers(reducers);
