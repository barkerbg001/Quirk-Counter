import './ToastContainer.css';

function ToastContainer({ toasts }) {
    return (
        <div className="toast-container" aria-live="polite">
            {toasts.map(toast => (
                <div key={toast.id} className="toast" role="alert">
                    {toast.message}
                </div>
            ))}
        </div>
    );
}

export default ToastContainer;

