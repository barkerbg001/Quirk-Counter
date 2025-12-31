import { useState } from 'react';
import { useAppState } from './hooks/useAppState';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EventLog from './pages/EventLog';
import Todos from './pages/Todos';
import Settings from './pages/Settings';
import ToastContainer from './components/ToastContainer';
import Dialog from './components/Dialog';
import './index.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [toasts, setToasts] = useState([]);
    const [dialog, setDialog] = useState({ show: false, message: '', onConfirm: null });
    
    const appState = useAppState();

    const showToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    };

    const showDialog = (message) => {
        return new Promise((resolve) => {
            setDialog({
                show: true,
                message,
                onConfirm: (confirmed) => {
                    setDialog({ show: false, message: '', onConfirm: null });
                    resolve(confirmed);
                }
            });
        });
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home appState={appState} showToast={showToast} showDialog={showDialog} />;
            case 'dashboard':
                return <Dashboard appState={appState} />;
            case 'event-log':
                return <EventLog appState={appState} />;
            case 'todos':
                return <Todos appState={appState} showToast={showToast} showDialog={showDialog} />;
            case 'settings':
                return <Settings appState={appState} showToast={showToast} showDialog={showDialog} />;
            default:
                return <Home appState={appState} showToast={showToast} showDialog={showDialog} />;
        }
    };

    return (
        <div className="container">
            <Header currentPage={currentPage} onNavigate={setCurrentPage} />
            <ToastContainer toasts={toasts} />
            <Dialog 
                show={dialog.show} 
                message={dialog.message} 
                onConfirm={dialog.onConfirm}
            />
            {renderPage()}
        </div>
    );
}

export default App;

