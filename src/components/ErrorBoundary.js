import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by boundary:', error);
    console.error('Error Info:', errorInfo);
    
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Could send error to logging service here
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    try {
      // Example: Send to error tracking service (Sentry, LogRocket, etc.)
      const errorData = {
        message: error.toString(),
        stack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      };
      
      console.log('Error logged:', errorData);
      // In production, send this to your error tracking service
      // fetch('/api/logs/errors', { method: 'POST', body: JSON.stringify(errorData) })
    } catch (e) {
      console.error('Failed to log error:', e);
    }
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <div className="error-icon">⚠️</div>
            <h1>Oops! Something went wrong</h1>
            
            <div className="error-message">
              <p>We're sorry, but something unexpected happened.</p>
              <p>Our team has been notified and we're working to fix it.</p>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="error-details">
                <summary>Error Details (Development Only)</summary>
                <div className="error-stack">
                  <strong>Error:</strong>
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                  
                  <strong>Component Stack:</strong>
                  <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                </div>
              </details>
            )}

            <div className="error-actions">
              <button onClick={this.handleReset} className="btn-reset">
                Try Again
              </button>
              <button onClick={() => window.location.href = '/'} className="btn-home">
                Go to Home
              </button>
            </div>

            <div className="error-count">
              {this.state.errorCount > 1 && (
                <small>Multiple errors detected ({this.state.errorCount})</small>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
