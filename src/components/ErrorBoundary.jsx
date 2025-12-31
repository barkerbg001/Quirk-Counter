import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary" style={{
                    padding: '40px',
                    textAlign: 'center',
                    maxWidth: '600px',
                    margin: '100px auto',
                    background: 'var(--card-background)',
                    border: '2px solid var(--border)',
                    borderRadius: '20px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}>
                    <h2 style={{ color: 'var(--accent)', marginBottom: '20px' }}>
                        Something went wrong
                    </h2>
                    <p style={{ color: 'var(--text)', marginBottom: '20px' }}>
                        We're sorry, but something unexpected happened. Your data is safe in localStorage.
                    </p>
                    <details style={{ 
                        marginBottom: '20px', 
                        textAlign: 'left',
                        background: 'rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                        borderRadius: '8px',
                        fontSize: '0.9rem'
                    }}>
                        <summary style={{ cursor: 'pointer', color: 'var(--text)' }}>
                            Error details
                        </summary>
                        <pre style={{ 
                            marginTop: '10px', 
                            overflow: 'auto',
                            color: 'var(--text)',
                            fontSize: '0.85rem'
                        }}>
                            {this.state.error?.toString()}
                        </pre>
                    </details>
                    <button
                        onClick={this.handleReset}
                        style={{
                            padding: '12px 24px',
                            background: 'var(--accent)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

