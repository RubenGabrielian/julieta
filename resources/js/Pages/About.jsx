import AppLayout from '../Layouts/AppLayout';

export default function About() {
    return (
        <AppLayout>
            <div style={{ padding: 40 }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About Page</h1>
                <p style={{ fontSize: '1.125rem', lineHeight: '1.75' }}>
                    This is the About page. You can add information about your application here.
                </p>
            </div>
        </AppLayout>
    );
}

