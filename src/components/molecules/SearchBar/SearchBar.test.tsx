import { render, fireEvent, screen } from '@testing-library/react';
import { SEARCH_QUOTE } from '../../../redux/actions/actionTypes';
import SearchBar from './SearchBar';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('SearchBar', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      quotes: {
        data: [],
        loading: false,
        error: null,
      }
    });
  });

  it('dispatches searchQuote action on input change', () => {
    const searchTerm = 'test';

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const searchQuoteDispatch = {
      type: SEARCH_QUOTE,
    };
    
    const input = screen.getByPlaceholderText('Enter a keyword');
    fireEvent.change(input, { target: { value: searchTerm } });

    store.dispatch(searchQuoteDispatch);
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: SEARCH_QUOTE,
        payload: {
          searchTerm,
          quotes: [],
        }
      },
      { type: SEARCH_QUOTE }
    ]);

  });
});