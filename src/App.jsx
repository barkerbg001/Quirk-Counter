import { useState, lazy, Suspense, useCallback } from 'react';
import { useAppState } from './hooks/useAppState';
import { AppProvider, useApp } from './context/AppContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import Sidebar from './components/Sidebar';
import ToastContainer from './components/ToastContainer';
import Dialog from './components/Dialog';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import './index.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const EventLog = lazy(() => import('./pages/EventLog'));
const Todos = lazy(() => import('./pages/Todos'));
const Settings = lazy(() => import('./pages/Settings'));

function AppContent() {
    const [currentPage, setCurrentPage] = useState('home');
    const { showToast, showDialog, toasts, dialog } = useApp();
    const appState = useAppState();

    // Keyboard shortcuts
    const navigateToPage = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    useKeyboardShortcuts({
        'h': () => navigateToPage('home'),
        'd': () => navigateToPage('dashboard'),
        'e': () => navigateToPage('event-log'),
        't': () => navigateToPage('todos'),
        's': () => navigateToPage('settings'),
        'ctrl+/': () => {
            showToast('Keyboard shortcuts: H=Home, D=Dashboard, E=Event Log, T=Todos, S=Settings');
        }
    });

    const renderPage = () => {
        const pageProps = { appState };
        const pagesWithHandlers = ['home', 'todos', 'settings'];
        
        if (pagesWithHandlers.includes(currentPage)) {
            pageProps.showToast = showToast;
            pageProps.showDialog = showDialog;
        }

        switch (currentPage) {
            case 'home':
                return <Home {...pageProps} />;
            case 'dashboard':
                return <Dashboard {...pageProps} />;
            case 'event-log':
                return <EventLog {...pageProps} />;
            case 'todos':
                return <Todos {...pageProps} />;
            case 'settings':
                return <Settings {...pageProps} />;
            default:
                return <Home {...pageProps} />;
        }
    };

    return (
        <div className="app-layout">
            <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
            <main className="main-content">
                <ToastContainer toasts={toasts} />
                <Dialog 
                    show={dialog.show} 
                    message={dialog.message} 
                    onConfirm={dialog.onConfirm}
                />
                <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
                    {renderPage()}
                </Suspense>
            </main>
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary>
            <AppProvider>
                <AppContent />
            </AppProvider>
        </ErrorBoundary>
    );
}

export default App;

