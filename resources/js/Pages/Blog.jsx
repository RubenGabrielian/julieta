import { Head, Link } from '@inertiajs/react';
import Header from '../Components/Header';
import AppLayout from '../Layouts/AppLayout';
import ExternalLinkIcon from '../Icons/ExternalLinkIcon';
import InstaIcon from '../Icons/InstaIcon';
import EmailIcon from '../Icons/EmailIocn';
import PhoneIcon from '../Icons/PhoneIcon';

export default function Blog({ posts }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    return (
        <>
            <Head title="Բլոգ" />
            <AppLayout>
                <Header title="Բլոգ" />
                <div className="blog-page">
                    {posts && posts.length === 0 ? (
                        <div className="blog-empty">
                            <p>Գրառումներ դեռ չկան։</p>
                        </div>
                    ) : (
                        <div className="blog-posts">
                            {posts && posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/posts/${post.id}`}
                                    className="blog-post-card"
                                >
                                    <div className="blog-post-image-container">
                                        {post.image ? (
                                            <img
                                                src={`/storage/${post.image}`}
                                                alt={post.title}
                                                className="blog-post-image"
                                            />
                                        ) : (
                                            <div className="blog-post-placeholder">
                                                <div className="blog-post-placeholder-text">
                                                    {post.title.charAt(0)}
                                                </div>
                                            </div>
                                        )}
                                        <div className="blog-post-overlay">
                                            <div className="blog-post-overlay-content">
                                                <div className="blog-post-overlay-text">
                                                    <h2>{post.title}</h2>
                                                    <span className="blog-post-date">
                                                        {formatDate(post.created_at)}
                                                    </span>
                                                </div>
                                                <div className="blog-post-icon">
                                                    <ExternalLinkIcon />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                <div className="welcome-page-footer">
                    <ul>
                        <li>
                            <a href="">
                                <InstaIcon />
                                <p>_julietic</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <EmailIcon />
                                <p>lilyaboyan@gmail.com</p>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <PhoneIcon />
                                <p>+374 91 832 121</p>
                            </a>
                        </li>
                    </ul>
                    <footer>
                        <ul>
                            <li>
                                <Link href="/about">Մեր Մասին</Link>
                            </li>
                            <li>
                                <Link href="/provisions">Դրույթներ</Link>
                            </li>
                            <li>
                                <Link href="/privacy">Գաղտնիություն</Link>
                            </li>
                        </ul>
                    </footer>
                </div>
            </AppLayout>
        </>
    );
}

