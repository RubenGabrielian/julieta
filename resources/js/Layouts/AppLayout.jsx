import { Link } from '@inertiajs/react';

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    display: 'inline-block'
};

export default function AppLayout({ children }) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <main>
                {children}
            </main>
        </div>
    );
}

