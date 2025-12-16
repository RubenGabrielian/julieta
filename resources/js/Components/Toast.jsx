import { useEffect, useState, useCallback } from 'react';
import SuccessIcon from '../Icons/SuccessIcon';
import CloseIcon from '../Icons/CloseIcon';

export default function Toast({ message, email, onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose?.();
        }, 300); // Wait for fade out animation
    }, [onClose]);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            // Auto-hide after 5 seconds
            const timer = setTimeout(() => {
                handleClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message, handleClose]);

    if (!message) return null;

    return (
        <div className={`toast ${isVisible ? 'toast-visible' : ''}`}>
            <div className='toast-content'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <SuccessIcon />
                    <h3>Վճարումը ստացվեց 🥰</h3>
                </div>
                <div onClick={() => handleClose()}>
                    <CloseIcon />
                </div>
            </div>
            <p>Հաստատումը ուղարկել ենք {email || '[email.address]'} հասցեին։  </p>
        </div>
    );
}

