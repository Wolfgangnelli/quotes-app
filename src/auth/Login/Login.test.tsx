import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('Login component', () => {

  it('renders login form', () => {
    const initState = {
      data: {},
      loading: false,
      isLoggedIn: false,
    };
    const mockStore = configureStore();
    const authStore = mockStore(initState);

    render(
    <Provider store={authStore}>
      <Login />
    </Provider>
    );
    
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  it('submits login form', async () => {
    render(<Login />);

    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });
});