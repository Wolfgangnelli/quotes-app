import { QuoteType } from '../../utilis/types';
import { 
    ADD_QUOTE_REQUEST, 
    ADD_QUOTE_FAIL, 
    ADD_QUOTE_SUCCESS,
    GET_QUOTES_REQUEST,
    GET_QUOTES_SUCCESS,
    GET_QUOTES_FAIL,
    SEARCH_QUOTE,
 } from './actionTypes';
import { Dispatch } from 'redux';
import fs from '../../config/firebase';
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export const getQuotes = () => async (dispatch: Dispatch) => {
    try {
        dispatch({
            type: GET_QUOTES_REQUEST
        });

        const queryQuotes = await getDocs(query(collection(fs, 'quotes'), orderBy('createdAt', 'desc')));
        console.log(queryQuotes);
        if(queryQuotes.docs.length > 0) {
            const quotesArray: QuoteType[] = [];

            queryQuotes.forEach((quote: any) => {
                quotesArray.push(quote.data());
            });

            dispatch({
                type: GET_QUOTES_SUCCESS,
                payload: quotesArray
            });
        }

    } catch (error) {
        dispatch({
            type: GET_QUOTES_FAIL,
            payload: error
        });
    }
};

export const addQuote = (quote: QuoteType) => async (dispatch: Dispatch) => {
    try {
        dispatch({
            type: ADD_QUOTE_REQUEST
        });

        await addDoc(collection(fs, 'quotes'), {
            text: quote.text,
            author: quote.author,
            createdAt: serverTimestamp(),
            id: uuidv4()
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

export const searchQuote = (searchTerm: string) => async (dispatch: Dispatch, getState: any) => {

    const { quotes: { data } } = getState();

    dispatch({
        type: SEARCH_QUOTE,
        payload: {searchTerm, quotes: data}
    });
};