import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {

  it('renders login form', () => {
    render(<Login />);
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