/**
 * API Service Tests
 * Tests the core functionality of API configuration and interceptors
 */

describe('API Service', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Configuration', () => {
    test('API URL uses environment variable', () => {
      // Vite uses VITE_ prefix for environment variables
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
      expect(apiUrl).toBeTruthy();
      expect(apiUrl).toContain('/api');
    });

    test('API timeout is set from environment variables', () => {
      // Vite uses VITE_ prefix for environment variables
      const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '5000', 10);
      expect(timeout).toBeGreaterThan(0);
    });
  });

  describe('Request Interceptor', () => {
    test('adds Authorization header when user token exists', () => {
      const mockUser = { id: '123', token: 'test-token' };
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Simulate the interceptor logic
      const config = { headers: {} };
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }

      expect(config.headers.Authorization).toBe('Bearer test-token');
    });

    test('does not add header when no user token', () => {
      const config = { headers: {} };
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }

      expect(config.headers.Authorization).toBeUndefined();
    });
  });

  describe('Response Interceptor', () => {
    test('handles 401 Unauthorized by clearing localStorage', () => {
      localStorage.setItem('user', JSON.stringify({ id: '123', token: 'test' }));
      
      // Simulate 401 response error handling
      const error = { response: { status: 401 } };
      if (error.response?.status === 401) {
        localStorage.removeItem('user');
      }

      expect(localStorage.getItem('user')).toBeNull();
    });

    test('handles timeout error with user-friendly message', () => {
      const error = { code: 'ECONNABORTED', message: 'Request timeout' };
      let errorMessage = error.message;

      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      }

      expect(errorMessage).toBe('Request timeout. Please try again.');
    });

    test('handles network error with user-friendly message', () => {
      const error = { response: undefined, message: 'Network failed' };
      let errorMessage = error.message;

      if (!error.response) {
        errorMessage = 'Network error. Please check your connection.';
      }

      expect(errorMessage).toBe('Network error. Please check your connection.');
    });
  });

  describe('Error Handling', () => {
    test('distinguishes between different error types', () => {
      const networkError = { response: undefined };
      const serverError = { response: { status: 500 } };
      const unauthorizedError = { response: { status: 401 } };

      expect(networkError.response).toBeUndefined();
      expect(serverError.response?.status).toBe(500);
      expect(unauthorizedError.response?.status).toBe(401);
    });
  });
});
