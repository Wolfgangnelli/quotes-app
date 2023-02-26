import { combineReducers } from 'redux';
import { suggestedQuotesReducer as suggestedQuotes } from './suggestedQuotesReducer';
import { quoteAddReducer as quoteAdd } from './quoteReducer';

const reducers = {
    suggestedQuotes,
    quoteAdd,
};

export default combineReducers(reducers);
