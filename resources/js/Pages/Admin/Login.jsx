import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ errors: pageErrors }) {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <>
            <Head title="Admin Login" />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F2F0E8',
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                }}>
                    <h1 style={{
                        fontFamily: 'MontserratArm',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#05435C',
                        marginBottom: '32px',
                        textAlign: 'center',
                    }}>
                        Admin Login
                    </h1>

                    <form onSubmit={submit}>
                        <div style={{ marginBottom: '24px' }}>
                            <label htmlFor="username" style={{
                                display: 'block',
                                fontFamily: 'MontserratArm',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#05435C',
                                marginBottom: '8px',
                            }}>
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: errors.username || pageErrors?.credentials ? '2px solid #ef4444' : '1px solid #D6D4CD',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontFamily: 'MontserratArm',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                }}
                                autoFocus
                            />
                            {errors.username && (
                                <p style={{
                                    color: '#ef4444',
                                    fontSize: '12px',
                                    marginTop: '4px',
                                    fontFamily: 'MontserratArm',
                                }}>
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label htmlFor="password" style={{
                                display: 'block',
                                fontFamily: 'MontserratArm',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#05435C',
                                marginBottom: '8px',
                            }}>
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: errors.password || pageErrors?.credentials ? '2px solid #ef4444' : '1px solid #D6D4CD',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontFamily: 'MontserratArm',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                }}
                            />
                            {errors.password && (
                                <p style={{
                                    color: '#ef4444',
                                    fontSize: '12px',
                                    marginTop: '4px',
                                    fontFamily: 'MontserratArm',
                                }}>
                                    {errors.password}
                                </p>
                            )}
                            {pageErrors?.credentials && (
                                <p style={{
                                    color: '#ef4444',
                                    fontSize: '12px',
                                    marginTop: '4px',
                                    fontFamily: 'MontserratArm',
                                }}>
                                    {pageErrors.credentials}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: processing ? '#05435C80' : '#05435C',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontFamily: 'MontserratArm',
                                fontWeight: '600',
                                cursor: processing ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s',
                            }}
                        >
                            {processing ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

