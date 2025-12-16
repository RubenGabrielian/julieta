import { useState } from 'react';
import BackArrow from '../Icons/BackArrow';
import BurgerIcon from '../Icons/BurgerIcon';
import MobileMenu from './MobileMenu';

export default function Header({ title }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleBack = () => {
        window.history.back();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header>
                <button
                    onClick={handleBack}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    aria-label="Go back"
                >
                    <BackArrow />
                </button>
                {title && <h1>{title}</h1>}
                <button
                    onClick={toggleMenu}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    aria-label="Open menu"
                >
                    <BurgerIcon />
                </button>
            </header>
            <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
        </>
    );
}