import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Singup from './Singup';

const mockStore = configureStore([]);
let store: any;

beforeEach(() => {
    store = mockStore({
        auth: {
            isLoggedIn: false,
            error: null,
            loading: false
        }
    });
});

describe('Singup component', () => {
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Singup />
            </MemoryRouter>
        </Provider>
    );

    it('renders registration form', () => {
        const heading = screen.getByRole('heading', { level: 1, name: /registration/i});
        expect(heading).toBeInTheDocument();

        const emailInput = screen.getByPlaceholderText('Email');
        expect(emailInput).toBeInTheDocument();

        const usernameInput = screen.getByPlaceholderText('Username');
        expect(usernameInput).toBeInTheDocument();

        const passwordInput = screen.getByPlaceholderText('Password');
        expect(passwordInput).toBeInTheDocument();

        const confirmPassword = screen.getByPlaceholderText('Confirm password');
        expect(confirmPassword).toBeInTheDocument();

        const termsCheckbox = screen.getByLabelText('I have read and agree to the Terms');
        expect(termsCheckbox).toBeInTheDocument();

        const submitButton = screen.getByRole('button', { name: /submit/i});
        expect(submitButton).toBeInTheDocument();

        const resetButton = screen.getByRole('button', { name: /reset/i});
        expect(resetButton).toBeInTheDocument();

        const loginLink = screen.getByRole('link', { name: /login/i});
        expect(loginLink).toBeInTheDocument();
    });

    it('submits registration form successfully', async () => {
        const emailInput = screen.getByPlaceholderText('Email');
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPassword = screen.getByPlaceholderText('Confirm password');
        const termsCheckbox = screen.getByLabelText('I have read and agree to the Terms');
        const submitButton = screen.getByRole('button', { name: /submit/i});

        fireEvent.change(emailInput, { target: { value: 'text@example.com' } });
        fireEvent.change(usernameInput, { target: { value: 'testUser'} });
        fireEvent.change(passwordInput, { target: { value: 'password'} });
        fireEvent.change(confirmPassword, { target: { value: 'password'} });
        fireEvent.click(termsCheckbox);
        fireEvent.click(submitButton);

        await waitFor(() => expect(store.getActions()).toEqual([{ type: 'CREATE_USER_SUCCESS' }]));
    });

    jest.mock('../../redux/actions/authUserAction', () => ({
        createUser: jest.fn(() => {
          throw new Error('createUser failed');
        }),
      }));

    it('should display error message on form submit failure', async () => {
        render(<Singup />);

        const submitButton = screen.getByRole('button', { name: 'SUMBIT'} );
        expect(submitButton).toBeInTheDocument();
        
        fireEvent.click(submitButton);

        const errorMessage = await screen.findByText('createUser failed');
        expect(errorMessage).toBeInTheDocument();
    });

});
