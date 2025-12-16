import { Link, router, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';


export default function PostsIndex({ posts }) {
    const { flash } = usePage().props;
    const [deletingId, setDeletingId] = useState(null);
    const { post } = useForm();

    const handleDelete = (postId, postTitle) => {
        if (confirm(`Are you sure you want to delete "${postTitle}"?`)) {
            setDeletingId(postId);
            post(`/admin/delete-posts/${postId}`, {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    return (
        <>
            <Head title="Admin - Posts" />
            <div className="admin-dashboard">
                <aside className="admin-sidebar">
                    <div className="admin-sidebar-header">
                        <h1 className="admin-logo">Admin Panel</h1>
                    </div>
                    <nav className="admin-nav">
                        <Link href="/admin/dashboard" className="admin-nav-item">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 10L10 2L18 10M2 17.5H7.5V12.5H12.5V17.5H18M2 10V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Dashboard
                        </Link>
                        <Link href="/admin/posts" className="admin-nav-item active">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Posts
                        </Link>
                        <Link href="/admin/posts/create" className="admin-nav-item">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2V18M2 10H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            New Post
                        </Link>
                        <Link href="/blog" className="admin-nav-item" target="_blank">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H16V16H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 8H12M8 12H12M6 8H6.01M6 12H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            View Blog
                        </Link>
                    </nav>
                    <div className="admin-sidebar-footer">
                        <button onClick={() => router.post('/admin/logout')} className="admin-logout-btn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </aside>

                <main className="admin-main">
                    <header className="admin-header">
                        <div className="admin-header-content">
                            <h2 className="admin-title">Posts Management</h2>
                            <Link href="/admin/posts/create" className="admin-create-btn">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Create New Post
                            </Link>
                        </div>
                    </header>

                    <div className="admin-content">
                        {flash?.success && (
                            <div className="admin-alert admin-alert-success">
                                {flash.success}
                            </div>
                        )}

                        <div className="admin-table-card admin-table-card-full">
                            <div className="admin-table-header">
                                <h3 className="admin-table-title">All Posts</h3>
                                <span className="admin-table-count">{posts?.length || 0} total</span>
                            </div>
                            <div className="admin-table-container">
                                {posts && posts.length > 0 ? (
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Content Preview</th>
                                                <th>Created</th>
                                                <th>Updated</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {posts.map((post) => (
                                                <tr key={post.id}>
                                                    <td>
                                                        <div className="table-cell-primary">{post.title}</div>
                                                    </td>
                                                    <td>
                                                        <div className="table-cell-primary">
                                                            {post.content.substring(0, 60)}{post.content.length > 60 ? '...' : ''}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="table-cell-primary">
                                                            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </div>
                                                        <div className="table-cell-secondary">
                                                            {new Date(post.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="table-cell-primary">
                                                            {new Date(post.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </div>
                                                        <div className="table-cell-secondary">
                                                            {new Date(post.updated_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="admin-action-buttons">
                                                            <Link
                                                                href={`/posts/${post.id}`}
                                                                className="admin-action-btn admin-action-view"
                                                                target="_blank"
                                                                title="View"
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8 3C4.66667 3 2 5.66667 2 9C2 12.3333 4.66667 15 8 15C11.3333 15 14 12.3333 14 9C14 5.66667 11.3333 3 8 3ZM8 11.6667C6.9 11.6667 6 10.7667 6 9.66667C6 8.56667 6.9 7.66667 8 7.66667C9.1 7.66667 10 8.56667 10 9.66667C10 10.7667 9.1 11.6667 8 11.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </Link>
                                                            <Link
                                                                href={`/admin/posts/${post.id}/edit`}
                                                                className="admin-action-btn admin-action-edit"
                                                                title="Edit"
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11.3333 2.00001C11.5084 1.8249 11.7163 1.68603 11.9457 1.59128C12.1751 1.49653 12.4218 1.44775 12.6713 1.44775C12.9208 1.44775 13.1676 1.49653 13.397 1.59128C13.6264 1.68603 13.8343 1.8249 14.0093 2.00001C14.1844 2.17511 14.3233 2.38303 14.418 2.61242C14.5128 2.84182 14.5616 3.08857 14.5616 3.33801C14.5616 3.58745 14.5128 3.8342 14.418 4.0636C14.3233 4.293 14.1844 4.50092 14.0093 4.67601L5.00933 13.676L1.33333 14.6667L2.32333 11L11.3333 2.00001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(post.id, post.title)}
                                                                className="admin-action-btn admin-action-delete"
                                                                disabled={deletingId === post.id}
                                                                title="Delete"
                                                            >
                                                                {deletingId === post.id ? (
                                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="spinner">
                                                                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
                                                                            <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416;0 31.416" repeatCount="indefinite" />
                                                                            <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416;-31.416" repeatCount="indefinite" />
                                                                        </circle>
                                                                    </svg>
                                                                ) : (
                                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M2 4H14M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2 6 1.33333 6.66667 1.33333H9.33333C10 1.33333 10.6667 2 10.6667 2.66667V4M6.66667 7.33333V11.3333M9.33333 7.33333V11.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="admin-empty-state">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 6V18M6 12H18" stroke="#05435C40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p>No posts yet</p>
                                        <Link href="/admin/posts/create" className="admin-empty-action">
                                            Create your first post
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

