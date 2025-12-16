import { Link, useForm, router } from '@inertiajs/react';
import RichTextEditor from '../../../Components/RichTextEditor';

export default function CreatePost() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        image: null,
        mp3: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/posts', {
            forceFormData: true,
        });
    };

    const handleMp3Change = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('mp3', file);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
        }
    };

    return (
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
                        <h2 className="admin-title">Create New Post</h2>
                    </div>
                </header>

                <div className="admin-content">
                    <div className="admin-form-card">
                        <Link href="/admin/posts" className="admin-back-link">
                            ← Back to Posts
                        </Link>

                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="admin-form-group">
                                <label htmlFor="title" className="admin-form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={`admin-form-input ${errors.title ? 'error' : ''}`}
                                    placeholder="Enter post title"
                                />
                                {errors.title && (
                                    <span className="admin-form-error">{errors.title}</span>
                                )}
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="content" className="admin-form-label">
                                    Content
                                </label>
                                <RichTextEditor
                                    value={data.content}
                                    onChange={(content) => setData('content', content)}
                                    placeholder="Start writing your post content here..."
                                    error={!!errors.content}
                                />
                                {errors.content && (
                                    <span className="admin-form-error">{errors.content}</span>
                                )}
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="image" className="admin-form-label">
                                    Thumbnail Image (Optional)
                                </label>
                                <div className="admin-file-upload">
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/jpeg,image/png,image/jpg,image/webp"
                                        onChange={handleImageChange}
                                        className="admin-file-input"
                                    />
                                    <label htmlFor="image" className="admin-file-label">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.16667 3.33333H15.8333C16.2936 3.33333 16.6667 3.70643 16.6667 4.16667V15.8333C16.6667 16.2936 16.2936 16.6667 15.8333 16.6667H4.16667C3.70643 16.6667 3.33333 16.2936 3.33333 15.8333V4.16667C3.33333 3.70643 3.70643 3.33333 4.16667 3.33333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.5 9.16667C8.42047 9.16667 9.16667 8.42047 9.16667 7.5C9.16667 6.57953 8.42047 5.83333 7.5 5.83333C6.57953 5.83333 5.83333 6.57953 5.83333 7.5C5.83333 8.42047 6.57953 9.16667 7.5 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.6667 11.6667L13.3333 8.33333L6.66667 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {data.image ? data.image.name : 'Choose thumbnail image'}
                                    </label>
                                    {data.image && (
                                        <button
                                            type="button"
                                            onClick={() => setData('image', null)}
                                            className="admin-file-remove"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                                {errors.image && (
                                    <span className="admin-form-error">{errors.image}</span>
                                )}
                            </div>

                            <div className="admin-form-group">
                                <label htmlFor="mp3" className="admin-form-label">
                                    MP3 Audio File (Optional)
                                </label>
                                <div className="admin-file-upload">
                                    <input
                                        type="file"
                                        id="mp3"
                                        accept="audio/mpeg,audio/mp3,.mp3"
                                        onChange={handleMp3Change}
                                        className="admin-file-input"
                                    />
                                    <label htmlFor="mp3" className="admin-file-label">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 2.5V12.5M6.66667 7.5H13.3333M2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H15.8333C16.2754 2.5 16.6993 2.67559 17.0118 2.98816C17.3244 3.30072 17.5 3.72464 17.5 4.16667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {data.mp3 ? data.mp3.name : 'Choose MP3 file'}
                                    </label>
                                    {data.mp3 && (
                                        <button
                                            type="button"
                                            onClick={() => setData('mp3', null)}
                                            className="admin-file-remove"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                                {errors.mp3 && (
                                    <span className="admin-form-error">{errors.mp3}</span>
                                )}
                            </div>

                            <div className="admin-form-actions">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="admin-form-submit"
                                >
                                    {processing ? 'Creating...' : 'Create Post'}
                                </button>
                                <Link href="/admin/posts" className="admin-form-cancel">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

