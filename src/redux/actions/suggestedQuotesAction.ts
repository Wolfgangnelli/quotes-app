import { GET_SUGGESTED_QUOTES_REQUEST, GET_SUGGESTED_QUOTES_SUCCESS, GET_SUGGESTED_QUOTES_FAIL } from './actionTypes';
import { Dispatch } from 'redux';
import axios from 'axios';

export const getSuggestedQuotes = () => async (dispatch: Dispatch) => {
    try {
        dispatch({
            type: GET_SUGGESTED_QUOTES_REQUEST
        });

        const { data } = await axios.get('https://type.fit/api/quotes');

        dispatch({
            type: GET_SUGGESTED_QUOTES_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: GET_SUGGESTED_QUOTES_FAIL,
            payload: error,
        });
    }
};
