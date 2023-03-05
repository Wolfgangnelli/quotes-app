import { render, fireEvent, screen } from '@testing-library/react';
import { searchQuote } from '../../../redux/actions/quoteAction';
import SearchBar from './SearchBar';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('SearchBar', () => {
  let store: any;
  let mockDispatch = jest.fn();

  beforeEach(() => {
    store = mockStore({
      data: [],
      loading: false,
      error: null,
    });
    jest.mock('react-redux', () => ({
      useDispatch: () => mockDispatch
    }));
  });

  test('dispatches searchQuote action on input change', () => {
    const searchTerm = 'test';

    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    
    const input = screen.getByPlaceholderText('Enter a keyword');
    fireEvent.change(input, { target: { value: searchTerm } });
    expect(mockDispatch).toHaveBeenCalledWith(searchQuote(searchTerm));
  });
});