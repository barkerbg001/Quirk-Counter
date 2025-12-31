import { useEffect } from 'react';
import './Dialog.css';

function Dialog({ show, message, onConfirm }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && show && onConfirm) {
                onConfirm(false);
            }
        };
        
        if (show) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [show, onConfirm]);

    return (
        <div 
            className="custom-dialog"
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="dialog-title"
            aria-hidden={!show}
        >
            <div 
                className="dialog-overlay" 
                onClick={() => onConfirm && onConfirm(false)}
            />
            <div className="dialog-content">
                <div className="dialog-header">
                    <h3 id="dialog-title" className="dialog-title">Confirm Deletion</h3>
                    <button 
                        className="dialog-close" 
                        aria-label="Close dialog" 
                        title="Close"
                        onClick={() => onConfirm && onConfirm(false)}
                    >
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <div className="dialog-body">
                    <p id="dialog-message">{message}</p>
                </div>
                <div className="dialog-actions">
                    <button 
                        id="dialog-cancel" 
                        className="dialog-button dialog-button-cancel"
                        onClick={() => onConfirm && onConfirm(false)}
                    >
                        Cancel
                    </button>
                    <button 
                        id="dialog-confirm" 
                        className="dialog-button dialog-button-confirm"
                        onClick={() => onConfirm && onConfirm(true)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dialog;

