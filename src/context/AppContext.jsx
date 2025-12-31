import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const [dialog, setDialog] = useState({ show: false, message: '', onConfirm: null });
    const toastTimeouts = useRef(new Map());

    const showToast = useCallback((message, duration = 3000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message }]);
        
        // Clear existing timeout if any
        const timeout = setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
            toastTimeouts.current.delete(id);
        }, duration);
        
        toastTimeouts.current.set(id, timeout);
    }, []);

    const removeToast = useCallback((id) => {
        const timeout = toastTimeouts.current.get(id);
        if (timeout) {
            clearTimeout(timeout);
            toastTimeouts.current.delete(id);
        }
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showDialog = useCallback((message) => {
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
    }, []);

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            toastTimeouts.current.forEach(timeout => clearTimeout(timeout));
            toastTimeouts.current.clear();
        };
    }, []);

    return (
        <AppContext.Provider value={{ showToast, removeToast, showDialog, toasts, dialog }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
}

