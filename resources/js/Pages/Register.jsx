import { Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import AppLayout from '../Layouts/AppLayout';
import Toast from '../Components/Toast';
import UserIcon from '../Icons/UserIcon';
import PhoneInputIcon from '../Icons/PhoneInputIcon';
import EmailInputIcon from '../Icons/EmailInputIcon';
import InstaInputIcon from '../Icons/InstaInputIcon';

export default function Register() {
    const { flash, option_id, option_title, option_price } = usePage().props;
    const [quantity, setQuantity] = useState(1);

    const unitPrice = option_price ? parseInt(option_price) : 3000;
    const totalPrice = quantity * unitPrice;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        instagram_username: '',
        quantity: option_title ? 1 : null,
        total_price: option_title ? totalPrice : null,
        option_id: option_id || null,
        option_title: option_title || null,
    });

    const [toastMessage, setToastMessage] = useState(null);

    // Initialize form data when option_title is present
    useEffect(() => {
        if (option_title) {
            setData('quantity', quantity);
            setData('total_price', totalPrice);
            setData('option_id', option_id);
            setData('option_title', option_title);
        }
    }, [option_title]);

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(true);
            reset();
            setQuantity(1);
        }
    }, [flash?.success, reset]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register', {
            onSuccess: () => {
                setToastMessage(true);
                reset();
            },
        });
    };

    // Check if all required fields are filled
    const isFormValid = data.name.trim() !== '' &&
        data.phone.trim() !== '' &&
        data.email.trim() !== '' &&
        data.instagram_username.trim() !== '';

    const isButtonDisabled = processing || !isFormValid;

    return (
        <AppLayout>
            <Header title="Ձեր տվյալները" />
            {toastMessage && (
                <Toast
                    message="success"
                    onClose={() => setToastMessage(null)}
                />
            )}
            <div className="register-page">
                <div className="register-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">
                                <UserIcon />
                                <div></div>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Անուն Ազգանուն"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">
                                <PhoneInputIcon />
                                <div></div>
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="+374 XX XXX XXX"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className={errors.phone ? 'error' : ''}
                            />
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">
                                <EmailInputIcon />
                                <div></div>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Էլ. Հասցե"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="instagram_username">
                                <InstaInputIcon />
                                <div></div>
                            </label>
                            <input
                                type="text"
                                id="instagram_username"
                                name="instagram_username"
                                placeholder="Instagram username"
                                value={data.instagram_username}
                                onChange={(e) => setData('instagram_username', e.target.value)}
                                className={errors.instagram_username ? 'error' : ''}
                            />
                            {errors.instagram_username && <span className="error-message">{errors.instagram_username}</span>}
                        </div>
                    </form>
                    <div className='register-form-footer'>
                        {option_title && (
                            <div className="payment-info">
                                <div className="payment-info-row">
                                    <h3>Քանակ</h3>
                                    <div className="quantity-controls">
                                        <button
                                            type="button"
                                            className="quantity-btn"
                                            onClick={() => {
                                                const newQuantity = Math.max(1, quantity - 1);
                                                setQuantity(newQuantity);
                                                setData('quantity', newQuantity);
                                                setData('total_price', newQuantity * unitPrice);
                                            }}
                                        >
                                            −
                                        </button>
                                        <span className="quantity-value">{quantity}</span>
                                        <button
                                            type="button"
                                            className="quantity-btn"
                                            onClick={() => {
                                                const newQuantity = quantity + 1;
                                                setQuantity(newQuantity);
                                                setData('quantity', newQuantity);
                                                setData('total_price', newQuantity * unitPrice);
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="payment-info-row">
                                    <h3>Վճարման ենթակա</h3>
                                    <h4>{totalPrice} դրամ</h4>
                                </div>
                            </div>
                        )}
                        {!option_title && (
                            <div className="register-form-footer-items">
                                <div className='register-form-footer-item'>
                                    <h3>Տեսակ</h3>
                                    <h5>Նամակ Ջուլիետից</h5>
                                </div>
                                <div className='register-form-footer-item'>
                                    <h3>ամսական վճար</h3>
                                    <h5><span>3000</span> դրամ/ամիս</h5>
                                </div>
                            </div>
                        )}
                        <button type="button" className="button" disabled={isButtonDisabled} onClick={handleSubmit}>
                            {processing ? 'սպասեք ...' : 'Վճարել'}
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

