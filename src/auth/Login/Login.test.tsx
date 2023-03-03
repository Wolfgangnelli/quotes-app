import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  test('submits login form', () => {
    render(<Login />);
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByTestId('submit-button'));
  });
});