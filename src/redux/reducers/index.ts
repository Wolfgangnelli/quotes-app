import { combineReducers } from 'redux';
import { suggestedQuotesReducer as suggestedQuotes } from './suggestedQuotesReducer';
import { quoteAddReducer as quoteAdd, quotesReducer as quotes } from './quoteReducer';

const reducers = {
    suggestedQuotes,
    quoteAdd,
    quotes,
};

export default combineReducers(reducers);
