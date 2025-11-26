import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ posts }) {
    return (
        <AppLayout>
            <div style={{ padding: 40 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', margin: 0 }}>Blog Posts</h1>
                    <Link
                        href="/posts/create"
                        style={{
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                    >
                        Create New Post
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <div style={{
                        padding: '3rem',
                        textAlign: 'center',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px'
                    }}>
                        <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
                            No posts yet. Create your first post!
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/posts/${post.id}`}
                                style={{
                                    display: 'block',
                                    padding: '1.5rem',
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    transition: 'box-shadow 0.2s, transform 0.2s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '0.5rem',
                                    color: '#1f2937'
                                }}>
                                    {post.title}
                                </h2>
                                <p style={{
                                    color: '#6b7280',
                                    marginBottom: '0.75rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical'
                                }}>
                                    {post.content}
                                </p>
                                <span style={{
                                    fontSize: '0.875rem',
                                    color: '#9ca3af'
                                }}>
                                    {new Date(post.created_at).toLocaleDateString()}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

