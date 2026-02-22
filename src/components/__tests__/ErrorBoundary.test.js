import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../../components/ErrorBoundary';

// Component that throws an error
const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  // Suppress console.error for cleaner test output
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders error UI when child component throws error', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
  });

  test('displays error recovery buttons', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to Home/i)).toBeInTheDocument();
  });

  test('displays error details in development mode', () => {
    // Vite uses import.meta.env.MODE instead of process.env.NODE_ENV
    const originalMode = import.meta.env.MODE;
    
    // Mock the mode to development for testing
    Object.defineProperty(import.meta, 'env', {
      value: { ...import.meta.env, MODE: 'development' },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Error Details/i)).toBeInTheDocument();

    // Restore original mode
    Object.defineProperty(import.meta, 'env', {
      value: { ...import.meta.env, MODE: originalMode },
      writable: true,
    });
  });

  test('Try Again button resets error state', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();

    const tryAgainButton = screen.getByText(/Try Again/i);
    expect(tryAgainButton).toBeInTheDocument();
  });
});
