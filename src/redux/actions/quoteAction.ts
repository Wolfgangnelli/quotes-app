import { QuotesType } from '../../utilis/types';
import { ADD_QUOTE_REQUEST, ADD_QUOTE_FAIL, ADD_QUOTE_SUCCESS } from './actionTypes';
import { Dispatch } from 'redux';
import fs from '../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

export const addQuote = (quote: QuotesType) => async (dispatch: Dispatch) => {
    try {
        dispatch({
            type: ADD_QUOTE_REQUEST
        });

        await addDoc(collection(fs, 'quotes'), {
            text: quote.text,
            author: quote.author,
        });

        dispatch({
            type: ADD_QUOTE_SUCCESS,
            payload: quote,
        });
        
    } catch (error: any) {
        dispatch({
            type: ADD_QUOTE_FAIL,
            payload: error,
        });
    }
};