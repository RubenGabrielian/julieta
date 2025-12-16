import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/posts');
    };

    return (
        <AppLayout>
            <div style={{ padding: 40, maxWidth: '800px', margin: '0 auto' }}>
                <Link
                    href="/admin/dashboard"
                    style={{
                        display: 'inline-block',
                        marginBottom: '2rem',
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontWeight: '500'
                    }}
                >
                    ← Back to Dashboard
                </Link>

                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <h1 style={{
                        fontSize: '2rem',
                        marginBottom: '2rem',
                        color: '#1f2937'
                    }}>
                        Create New Post
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label
                                htmlFor="title"
                                style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#374151'
                                }}
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: errors.title ? '2px solid #ef4444' : '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    boxSizing: 'border-box'
                                }}
                            />
                            {errors.title && (
                                <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label
                                htmlFor="content"
                                style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#374151'
                                }}
                            >
                                Content
                            </label>
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                rows={10}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: errors.content ? '2px solid #ef4444' : '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit',
                                    resize: 'vertical',
                                    boxSizing: 'border-box'
                                }}
                            />
                            {errors.content && (
                                <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                                    {errors.content}
                                </p>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                type="submit"
                                disabled={processing}
                                style={{
                                    backgroundColor: processing ? '#9ca3af' : '#3b82f6',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '6px',
                                    border: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: processing ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (!processing) {
                                        e.target.style.backgroundColor = '#2563eb';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!processing) {
                                        e.target.style.backgroundColor = '#3b82f6';
                                    }
                                }}
                            >
                                {processing ? 'Creating...' : 'Create Post'}
                            </button>
                            <Link
                                href="/admin/dashboard"
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '6px',
                                    border: '1px solid #d1d5db',
                                    textDecoration: 'none',
                                    color: '#374151',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    display: 'inline-block',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

