import { render, screen } from '@testing-library/react';
import SectionContainer from './SectionContainer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

const mockStore = configureStore([thunk]);

let store: any;

afterEach(() => {
    store = mockStore({
        auth: {
          data: {},
          loading: false,
          isLoggedIn: true
        }
    });
});

describe('SectionContainer Component', () => {

    const jsxElement = <div>test</div>;

    it('should render section container correctly', () => {
        const props = {
            children: jsxElement,
            title: 'Test Title',
            searchBar: false,
        };

        render(<SectionContainer {...props} />);
    });


    it('should render section container with search bar', () => {
        const props = {
            children: jsxElement,
            title: 'Test Title',
            searchBar: true,
        };
        render(
        <Provider store={store}>
            <SectionContainer {...props} />
        </Provider>
        );

        const searchBar = screen.getByTestId('test-searchbar');
        expect(searchBar).toBeInTheDocument();
    });

});
