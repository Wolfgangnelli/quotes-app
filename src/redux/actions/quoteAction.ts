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
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { enableIndexedDbPersistence } from "firebase/firestore"; 

enableIndexedDbPersistence(fs)
  .catch((err) => {
      if (err.code === 'failed-precondition') {
          console.log('multiple tabs opened');
      } else if (err.code === 'unimplemented') {
          console.log('browser not support');
      }
  });

const collectionRef = collection(fs, 'quotes');

export const getQuotes = () => async (dispatch: Dispatch) => {
    try {
        dispatch({
            type: GET_QUOTES_REQUEST
        });

        //const queryQuotes = await getDocs(query(collection(fs, 'quotes'), orderBy('createdAt', 'desc')));
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

/*         onSnapshot(q, (querySnapshot) => {
            const quotesArray: QuoteType[] = [];

            querySnapshot.forEach((quote: any) => {
                quotesArray.push(quote.data());
            });
            dispatch({
                type: GET_QUOTES_SUCCESS,
                payload: quotesArray
            });
        }); */
        console.log('FIRST');
        onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
            const quotesArray: QuoteType[] = [];
            console.log(querySnapshot);
            console.log(1);
            querySnapshot.docChanges().forEach((change: any) => {
                console.log(change.doc.data());
                console.log(change.type);
                if (change.type === "added" || change.type === 'modified') {
                    quotesArray.push(change.doc.data());
                }
            });
            console.log(12);
            if(querySnapshot.metadata.fromCache) {
                dispatch({
                    type: GET_QUOTES_SUCCESS,
                    payload: quotesArray
                });
            }
        });

        /* if(queryQuotes.docs.length > 0) {
            const quotesArray: QuoteType[] = [];

            queryQuotes.forEach((quote: any) => {
                quotesArray.push(quote.data());
            }); */

       /*  }
 */
    } catch (error) {
        dispatch({
            type: GET_QUOTES_FAIL,
            payload: error
        });
    }
};

export const addQuote = (quote: QuoteType) => async (dispatch: Dispatch) => {
    const newQuote = {
        text: quote.text,
        author: quote.author,
        createdAt: serverTimestamp(),
        id: uuidv4()
    };

    try {
        dispatch({
            type: ADD_QUOTE_REQUEST
        });

        const quoteRef = doc(collectionRef, newQuote.id);
        await setDoc(quoteRef, newQuote);
/*         await addDoc(collectionRef, newQuote); */

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

export const searchQuote = (searchTerm: string) => (dispatch: Dispatch, getState: any) => {

    const { quotes: { data } } = getState();

    dispatch({
        type: SEARCH_QUOTE,
        payload: {searchTerm, quotes: data}
    });
};