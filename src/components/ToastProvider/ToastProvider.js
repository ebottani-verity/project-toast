import React from 'react';
import shelfStyles from '../ToastShelf/ToastShelf.module.css'
import Toast from '../Toast/Toast';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
    const [toasts, setToasts] = React.useState([])


    const addToast = (message, variant) => {
        setToasts(toasts => [...toasts, { message, variant, uuid: crypto.randomUUID() }])
    }

    const removeToast = (uuid) => {
        setToasts(toasts => toasts.filter(t => t.uuid !== uuid))
    }

    return <ToastContext.Provider value={{ addToast }}>
        {children}
        <ol className={shelfStyles.wrapper}>
            {toasts.map(t => (
                <li className={shelfStyles.toastWrapper}>
                    <Toast variant={t.variant} onClose={() => removeToast(t.uuid)}>
                        {t.message}
                    </Toast>
                </li>
            ))}
        </ol></ToastContext.Provider>;
}

export default ToastProvider;
