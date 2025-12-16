import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import AppLayout from '../../Layouts/AppLayout';

export default function Show({ post }) {
    const formattedDate = new Date(post.created_at).toLocaleDateString('hy-AM', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => { });
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 0);
    };

    const handleLoadedMetadata = () => {
        if (!audioRef.current) return;
        setDuration(audioRef.current.duration || 0);
    };

    const handleSeek = (e) => {
        if (!audioRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = Math.min(
            Math.max((e.clientX - rect.left) / rect.width, 0),
            1
        );
        const newTime = ratio * (audioRef.current.duration || 0);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleBack15 = () => {
        if (!audioRef.current) return;
        const newTime = Math.max((audioRef.current.currentTime || 0) - 15, 0);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '00:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    const handleShare = () => {
        const url = window.location.href;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).catch(() => {
                // silently fail if clipboard not available
            });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = url;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
            } catch (e) {
                // ignore
            }
            document.body.removeChild(textarea);
        }
    };

    return (
        <AppLayout>
            <div className="blog-single">
                <div className="blog-single-hero">
                    {post.image ? (
                        <img
                            src={`/storage/${post.image}`}
                            alt={post.title}
                            className="blog-single-hero-image"
                        />
                    ) : (
                        <div className="blog-single-hero-placeholder" />
                    )}

                    <div className="blog-single-topbar">
                        <Link href="/blog" className="blog-single-icon-button">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15 18L9 12L15 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>

                        <button
                            type="button"
                            className="blog-single-icon-button"
                            aria-label="Share"
                            onClick={handleShare}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.10306 14.9553C4.71008 16.3482 2.43765 16.3482 1.04469 14.9553C-0.348247 13.5624 -0.348232 11.2899 1.04474 9.89695L4.20624 6.73545C5.53423 5.40746 7.65751 5.33412 9.06207 6.54273C9.19767 6.65867 9.28166 6.82374 9.29555 7.00161C9.30945 7.17948 9.25212 7.35558 9.13618 7.49118C9.02023 7.62678 8.85517 7.71077 8.6773 7.72468C8.49943 7.73858 8.32333 7.68125 8.18773 7.56531C7.30379 6.80472 5.99779 6.84078 5.15468 7.68388L1.99317 10.8454C1.10923 11.7293 1.10923 13.1229 1.99314 14.0069C2.87707 14.8908 4.27067 14.8908 5.15462 14.0068L8.15803 11.0034C8.22003 10.9398 8.29402 10.8892 8.37573 10.8545C8.45743 10.8197 8.54522 10.8015 8.634 10.801C8.72278 10.8004 8.81079 10.8175 8.89291 10.8513C8.97504 10.885 9.04966 10.9347 9.11244 10.9974C9.17521 11.0602 9.2249 11.1348 9.25862 11.217C9.29234 11.2991 9.30941 11.3871 9.30886 11.4759C9.30831 11.5647 9.29013 11.6524 9.25539 11.7341C9.22065 11.8158 9.17003 11.8898 9.10648 11.9518L6.10306 14.9553ZM11.7938 9.26457C10.4658 10.5925 8.34252 10.6659 6.93792 9.45724C6.87035 9.39997 6.81475 9.32991 6.77433 9.25109C6.7339 9.17227 6.70945 9.08624 6.70236 8.99794C6.69527 8.90964 6.70569 8.82082 6.73302 8.73655C6.76035 8.65229 6.80406 8.57426 6.86162 8.50693C6.91919 8.4396 6.98949 8.38431 7.06849 8.34422C7.14748 8.30413 7.23361 8.28003 7.32194 8.27332C7.41027 8.26661 7.49905 8.27742 7.5832 8.30511C7.66734 8.33281 7.74519 8.37684 7.81226 8.4347C8.69621 9.19526 10.0022 9.15921 10.8453 8.31612L14.0068 5.15461C14.8908 4.27066 14.8908 2.87707 14.0069 1.99314C13.1229 1.10922 11.7293 1.10924 10.8454 1.99318L7.84195 4.9966C7.78 5.06034 7.706 5.11111 7.62425 5.146C7.54251 5.18088 7.45464 5.19918 7.36576 5.19981C7.27689 5.20044 7.18877 5.1834 7.10654 5.14968C7.0243 5.11596 6.94959 5.06623 6.88675 5.00338C6.8239 4.94054 6.77417 4.86582 6.74045 4.78359C6.70673 4.70135 6.68969 4.61324 6.69032 4.52437C6.69095 4.43549 6.70924 4.34762 6.74412 4.26587C6.77901 4.18412 6.82979 4.11012 6.89352 4.04817L9.89695 1.04474C11.2899 -0.348233 13.5624 -0.348247 14.9553 1.0447C16.3483 2.43766 16.3482 4.71009 14.9553 6.10307L11.7938 9.26457Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="blog-single-content">
                    <div className="blog-single-card">
                        <h1 className="blog-single-title">{post.title}</h1>
                        <p className="blog-single-meta">
                            Ջուլիետ • {formattedDate}
                        </p>

                        {post.mp3 && (
                            <div className="blog-single-audio">
                                <audio
                                    ref={audioRef}
                                    src={`/storage/${post.mp3}`}
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedMetadata={handleLoadedMetadata}
                                    onEnded={() => {
                                        setIsPlaying(false);
                                        setCurrentTime(0);
                                    }}
                                    style={{ display: 'none' }}
                                />
                                <div className="blog-audio-control">
                                    <button
                                        type="button"
                                        className="blog-audio-play"
                                        onClick={togglePlay}
                                        aria-label={isPlaying ? 'Pause' : 'Play'}
                                    >
                                        {isPlaying ? (
                                            <span className="blog-audio-pause-bars">
                                                <span />
                                                <span />
                                            </span>
                                        ) : (
                                            <svg
                                                width="16"
                                                height="20"
                                                viewBox="0 0 16 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M0 1.62003V18.38C0 19.658 1.3721 20.4345 2.42878 19.7389L15.2666 11.3589C16.2445 10.728 16.2445 9.27201 15.2666 8.62491L2.42878 0.261113C1.3721 -0.434522 0 0.342001 0 1.62003Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        )}
                                    </button>

                                    <div
                                        className="blog-audio-track"
                                        onClick={handleSeek}
                                    >
                                        <div className="blog-audio-track-inner">
                                            <div
                                                className="blog-audio-track-progress"
                                                style={{
                                                    width:
                                                        duration > 0
                                                            ? `${(currentTime /
                                                                duration) *
                                                            100
                                                            }%`
                                                            : '0%',
                                                }}
                                            />
                                            <div
                                                className="blog-audio-thumb"
                                                style={{
                                                    left:
                                                        duration > 0
                                                            ? `${(currentTime /
                                                                duration) *
                                                            100
                                                            }%`
                                                            : '0%',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="blog-audio-time">
                                        {formatTime(duration)}
                                    </div>

                                    <button
                                        type="button"
                                        className="blog-audio-back15"
                                        onClick={handleBack15}
                                        aria-label="Back 15 seconds"
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 5V3L8.5 6.5L12 10V8C14.7614 8 17 10.2386 17 13C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <circle
                                                cx="12"
                                                cy="13"
                                                r="9"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <text
                                                x="12"
                                                y="16"
                                                textAnchor="middle"
                                                fontSize="8"
                                                fill="currentColor"
                                                fontFamily="system-ui, -apple-system, BlinkMacSystemFont"
                                            >
                                                15
                                            </text>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        <div
                            className="blog-single-body"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

