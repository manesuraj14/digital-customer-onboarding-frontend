import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AuthProvider, AuthContext } from '../../services/AuthContext';

// Test component that uses AuthContext
const TestComponent = () => {
  const { user, login, logout } = React.useContext(AuthContext);
  
  return (
    <div>
      <div data-testid="user-display">{user ? `User: ${user.id}` : 'No user'}</div>
      <button onClick={() => login({ id: '123', token: 'test-token' })}>
        Login
      </button>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders without crashing', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('user-display')).toBeInTheDocument();
  });

  test('user is initially null', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByText('No user')).toBeInTheDocument();
  });

  test('login sets user and saves to localStorage', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await userEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('User: 123')).toBeInTheDocument();
    });

    const storedUser = JSON.parse(localStorage.getItem('user'));
    expect(storedUser).toEqual({ id: '123', token: 'test-token' });
  });

  test('logout clears user and removes from localStorage', async () => {
    // Setup: login first
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await userEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('User: 123')).toBeInTheDocument();
    });

    // Test: logout
    await userEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(screen.getByText('No user')).toBeInTheDocument();
    });

    expect(localStorage.getItem('user')).toBeNull();
  });

  test('loads user from localStorage on mount', () => {
    const mockUser = { id: '456', token: 'stored-token' };
    localStorage.setItem('user', JSON.stringify(mockUser));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('User: 456')).toBeInTheDocument();
  });
});
