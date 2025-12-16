import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ orders, posts }) {
    const { flash } = usePage().props;
    const [cancellingId, setCancellingId] = useState(null);

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    const handleCancelOrder = (orderId, customerName) => {
        if (confirm(`Are you sure you want to cancel the subscription for "${customerName}"? This will prevent future payments from being processed.`)) {
            setCancellingId(orderId);
            router.post(`/admin/orders/${orderId}/cancel`, {}, {
                onFinish: () => setCancellingId(null),
            });
        }
    };

    const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0;
    const totalRevenue = orders?.reduce((sum, order) => sum + (parseFloat(order.total_price) || 0), 0) || 0;

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="admin-dashboard">
                <aside className="admin-sidebar">
                    <div className="admin-sidebar-header">
                        <h1 className="admin-logo">Admin Panel</h1>
                    </div>
                    <nav className="admin-nav">
                        <Link href="/admin/dashboard" className="admin-nav-item active">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 10L10 2L18 10M2 17.5H7.5V12.5H12.5V17.5H18M2 10V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Dashboard
                        </Link>
                        <Link href="/admin/posts" className="admin-nav-item">
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
                        <button onClick={handleLogout} className="admin-logout-btn">
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
                            <h2 className="admin-title">Dashboard Overview</h2>
                            <div className="admin-header-actions">
                                <span className="admin-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </header>

                    <div className="admin-content">
                        {flash?.success && (
                            <div className="admin-alert admin-alert-success">
                                {flash.success}
                            </div>
                        )}

                        <div className="admin-stats-grid">
                            <div className="admin-stat-card stat-card-primary">
                                <div className="stat-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="stat-card-content">
                                    <p className="stat-card-label">Total Orders</p>
                                    <h3 className="stat-card-value">{orders?.length || 0}</h3>
                                </div>
                            </div>

                            <div className="admin-stat-card stat-card-warning">
                                <div className="stat-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="stat-card-content">
                                    <p className="stat-card-label">Pending Orders</p>
                                    <h3 className="stat-card-value">{pendingOrders}</h3>
                                </div>
                            </div>

                            <div className="admin-stat-card stat-card-success">
                                <div className="stat-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="stat-card-content">
                                    <p className="stat-card-label">Total Posts</p>
                                    <h3 className="stat-card-value">{posts?.length || 0}</h3>
                                </div>
                            </div>

                            <div className="admin-stat-card stat-card-info">
                                <div className="stat-card-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="stat-card-content">
                                    <p className="stat-card-label">Total Revenue</p>
                                    <h3 className="stat-card-value">{totalRevenue.toLocaleString()} ֏</h3>
                                </div>
                            </div>
                        </div>

                        <div className="admin-table-card admin-table-card-full">
                            <div className="admin-table-header">
                                <h3 className="admin-table-title">Recent Orders</h3>
                                <span className="admin-table-count">{orders?.length || 0} total</span>
                            </div>
                            <div className="admin-table-container">
                                {orders && orders.length > 0 ? (
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Customer</th>
                                                <th>Email</th>
                                                <th>Type</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.slice(0, 8).map((order) => {
                                                const isSubscription = order.monthly_price > 0;
                                                return (
                                                    <tr key={order.id}>
                                                        <td>
                                                            <div className="table-cell-primary">{order.name}</div>
                                                            <div className="table-cell-secondary">{order.phone}</div>
                                                        </td>
                                                        <td>
                                                            <div className="table-cell-primary">{order.email}</div>
                                                        </td>
                                                        <td>
                                                            <span className={`type-badge type-${isSubscription ? 'subscription' : 'onetime'}`}>
                                                                {isSubscription ? (
                                                                    <>
                                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
                                                                            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                        Subscription
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
                                                                            <path d="M7 1L13 7L7 13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                        One-time
                                                                    </>
                                                                )}
                                                            </span>
                                                            {isSubscription && order.monthly_price && (
                                                                <div className="table-cell-secondary" style={{ marginTop: '4px' }}>
                                                                    {order.monthly_price} ֏/month
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <div className="table-cell-primary">
                                                                {isSubscription
                                                                    ? (order.monthly_price ? `${order.monthly_price} ֏/month` : '—')
                                                                    : (order.total_price ? `${order.total_price} ֏` : '—')
                                                                }
                                                            </div>
                                                            {!isSubscription && order.quantity && (
                                                                <div className="table-cell-secondary" style={{ marginTop: '4px' }}>
                                                                    Qty: {order.quantity}
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <span className={`status-badge status-${order.status}`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="table-cell-primary">
                                                                {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                            </div>
                                                            <div className="table-cell-secondary">
                                                                {new Date(order.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {isSubscription && (order.status === 'pending' || order.status === 'active') && (
                                                                <button
                                                                    onClick={() => handleCancelOrder(order.id, order.name)}
                                                                    disabled={cancellingId === order.id}
                                                                    className="admin-cancel-order-btn"
                                                                    title="Cancel subscription to stop future payments"
                                                                >
                                                                    {cancellingId === order.id ? (
                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="spinner">
                                                                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
                                                                                <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416;0 31.416" repeatCount="indefinite" />
                                                                                <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416;-31.416" repeatCount="indefinite" />
                                                                            </circle>
                                                                        </svg>
                                                                    ) : (
                                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                    )}
                                                                    Cancel
                                                                </button>
                                                            )}
                                                            {order.status === 'cancelled' && (
                                                                <span className="admin-cancelled-badge">Cancelled</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="admin-empty-state">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="#05435C40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p>No orders yet</p>
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
