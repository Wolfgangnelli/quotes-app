/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';
import FormQuote from './FormQuote';

const mockStore = configureStore([]);

let store: any;

beforeEach(() => {
    store = mockStore({
        quoteAdd: {
            error: null
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
    const addQuoteMock = jest.fn();
    const getQuotesMock = jest.fn(); 

    jest.mock('../../../redux/actions/quoteAction.ts', () => {
        return jest.fn().mockImplementation(() => {
            return {
                addQuote: addQuoteMock,
                getQuotes: getQuotesMock,
            };
        });
    });

    render(
        <Provider store={store}>
            <FormQuote />
        </Provider>
    );

    await act(async () => {
        fireEvent.change(screen.getByPlaceholderText('Whatever you are, be a good one.'), {
            target: { value: 'My new quote'},
        });
        fireEvent.change(screen.getByPlaceholderText('Abraham Lincoln'), {
             target: { value: 'New Author' },
        });
        fireEvent.click(screen.getByText('Submit'));
    });

    expect(addQuoteMock).toHaveBeenCalledTimes(1);
    expect(getQuotesMock).toHaveBeenCalledTimes(1);
   });

   it('should display an error message when there is an error adding a quote', async () => {
    const addQuoteMock = jest.fn();

    jest.mock('../../../redux/actions/quoteAction.ts', () => {
        const addQuoteMock = jest.fn();

        return jest.fn().mockImplementation(() => {
            return {
                addQuote: addQuoteMock,
            };
        });
    });

    const error = {
        code: '500',
        message: 'Internal Server Error',
    };

    store = mockStore({
        error,
    });

    render(
        <Provider store={store}>
            <FormQuote />
        </Provider>
    );

    await act(async () => {
        fireEvent.change(screen.getByPlaceholderText('Whatever you are, be a good one.'), {
            target: { value: 'My new quote'},
        });
        fireEvent.change(screen.getByPlaceholderText('Abraham Lincoln'), {
             target: { value: 'New Author' },
        });
        fireEvent.click(screen.getByText('Submit'));
    });

    expect(addQuoteMock).toHaveBeenCalledTimes(1);
    expect(screen.getByText(error.code)).toBeInTheDocument();
   });
});
