/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';
import FormQuote from './FormQuote';
import { ADD_QUOTE_FAIL, GET_QUOTES_FAIL, ADD_QUOTE_SUCCESS, GET_QUOTES_SUCCESS } from '../../../redux/actions/actionTypes';

const mockStore = configureStore();

let store: any;

beforeEach(() => {
    store = mockStore({
        quoteAdd: {
            data: [],
            error: null,
            loading: false
        }
    });
});

describe('FormQuote', () => {

   it('should render the form', () => {
    render(
        <Provider store={store}>
            <FormQuote />
        </Provider>
    );

    expect(screen.getByPlaceholderText('Whatever you are, be a good one.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Abraham Lincoln')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
   });

    it('should display an error message when submitting with invalid inputs', async () => {
    render(
        <Provider store={store}>
            <FormQuote />
        </Provider>
    );

    //const button = screen.getByText('Submit');
    await act(async () => {
        //button.dispatchEvent(new MouseEvent('click'));
        fireEvent.click(screen.getByText('Submit'));
    });

    expect(screen.getByText('Devi inserire una citazione')).toBeInTheDocument(); 
   });

   it('should dispatch addQuote and getQuotes when submitting form with valid inputs', async () => {

    render(
        <Provider store={store}>
            <FormQuote />
        </Provider>
    );

    const addQuoteDispatch = {
        type: ADD_QUOTE_SUCCESS
    };

    const getQuoteDispatch = {
        type: GET_QUOTES_SUCCESS
    };

    fireEvent.change(screen.getByPlaceholderText('Whatever you are, be a good one.'), {
        target: { value: 'My new quote'},
    });
    fireEvent.change(screen.getByPlaceholderText('Abraham Lincoln'), {
        target: { value: 'New Author' },
    });
    fireEvent.click(screen.getByText('Submit'));

    
    // dispatch the action
    store.dispatch(addQuoteDispatch);
    store.dispatch(getQuoteDispatch);

    const actions = store.getActions();
    
    // test if store dispatched the expected actions
    expect(actions).toEqual([
    {
        type: ADD_QUOTE_SUCCESS
    },
    {
        type: GET_QUOTES_SUCCESS
    }
    ]);
    
    expect(actions).not.toEqual([
    {
        type: ADD_QUOTE_FAIL
    },
    {
        type: GET_QUOTES_FAIL
    }
    ]);

   });
});
