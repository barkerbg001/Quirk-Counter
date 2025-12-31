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
const About = lazy(() => import('./pages/About'));
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const EventLog = lazy(() => import('./pages/EventLog'));
const Todos = lazy(() => import('./pages/Todos'));
const Settings = lazy(() => import('./pages/Settings'));

function AppContent() {
    // Check if user has seen about page, default to 'about' for first-time visitors
    const [currentPage, setCurrentPage] = useState(() => {
        const hasSeenAbout = localStorage.getItem('hasSeenAbout');
        return hasSeenAbout ? 'home' : 'about';
    });
    const { showToast, showDialog, toasts, dialog } = useApp();
    const appState = useAppState();

    // Keyboard shortcuts
    const navigateToPage = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    useKeyboardShortcuts({
        'a': () => navigateToPage('about'),
        'h': () => navigateToPage('home'),
        'd': () => navigateToPage('dashboard'),
        'e': () => navigateToPage('event-log'),
        't': () => navigateToPage('todos'),
        's': () => navigateToPage('settings'),
        'ctrl+/': () => {
            showToast('Keyboard shortcuts: A=About, H=Home, D=Dashboard, E=Event Log, T=Todos, S=Settings');
        }
    });

    const renderPage = () => {
        const pageProps = { appState };
        const pagesWithHandlers = ['home', 'todos', 'settings'];
        
        if (pagesWithHandlers.includes(currentPage)) {
            pageProps.showToast = showToast;
            pageProps.showDialog = showDialog;
        }

        // About page needs navigation function
        if (currentPage === 'about') {
            pageProps.onNavigate = setCurrentPage;
        }

        switch (currentPage) {
            case 'about':
                return <About {...pageProps} />;
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
                return <About {...pageProps} />;
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

