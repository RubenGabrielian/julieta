import { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import CloseIcon from '../Icons/CloseIcon';
import RightArrow from '../Icons/RightArrow';
import InstaIcon from '../Icons/InstaIcon';
import EmailIcon from '../Icons/EmailIocn';
import PhoneIcon from '../Icons/PhoneIcon';

export default function MobileMenu({ isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            {isOpen && <div className="mobile-menu-overlay" onClick={onClose} />}
            <div className={`mobile-menu ${isOpen ? 'mobile-menu-open' : ''}`}>
                <button
                    className="mobile-menu-close"
                    onClick={onClose}
                    aria-label="Close menu"
                >
                    <CloseIcon />
                </button>

                <nav className="mobile-menu-nav">
                    <ul>
                        <li>
                            <Link href="/letter-from-juliet" onClick={onClose}>
                                <span>Նամակ Ջուլիետից</span>
                                <RightArrow />
                            </Link>
                        </li>
                        <li>
                            <Link href="/send-letter" onClick={onClose}>
                                <span>Ուղարկել Նամակ</span>
                                <RightArrow />
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" onClick={onClose}>
                                <span>Բլոգ</span>
                                <RightArrow />
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" onClick={onClose}>
                                <span>Մեր Մասին</span>
                                <RightArrow />
                            </Link>
                        </li>
                        <li>
                            <Link href="/provisions" onClick={onClose}>
                                <span>Դրույթներ</span>
                                <RightArrow />
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" onClick={onClose}>
                                <span>Գաղտնիություն</span>
                                <RightArrow />
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="mobile-menu-contact">
                    <a href="https://instagram.com/_julietic" target="_blank" rel="noopener noreferrer">
                        <InstaIcon />
                        <span>_julietic</span>
                    </a>
                    <a href="mailto:lilyaboyan@gmail.com">
                        <EmailIcon />
                        <span>lilyaboyan@gmail.com</span>
                    </a>
                    <a href="tel:+37491832121">
                        <PhoneIcon />
                        <span>+374 91 832 121</span>
                    </a>
                </div>
            </div>
        </>
    );
}

