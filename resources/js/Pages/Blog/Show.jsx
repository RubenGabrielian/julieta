import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Show({ post }) {
    return (
        <AppLayout>
            <div style={{ padding: 40, maxWidth: '800px', margin: '0 auto' }}>
                <Link
                    href="/posts"
                    style={{
                        display: 'inline-block',
                        marginBottom: '2rem',
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontWeight: '500'
                    }}
                >
                    ← Back to Posts
                </Link>

                <article style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        color: '#1f2937'
                    }}>
                        {post.title}
                    </h1>
                    <p style={{
                        color: '#6b7280',
                        marginBottom: '2rem',
                        fontSize: '0.875rem'
                    }}>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                    <div style={{
                        fontSize: '1.125rem',
                        lineHeight: '1.75',
                        color: '#374151',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {post.content}
                    </div>
                </article>
            </div>
        </AppLayout>
    );
}

