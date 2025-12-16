import AppLayout from '../Layouts/AppLayout';
import RightArrow from '../Icons/RightArrow';
import EmailIcon from '../Icons/EmailIocn';
import InstaIcon from '../Icons/InstaIcon';
import PhoneIcon from '../Icons/PhoneIcon';
import { Link, usePage } from '@inertiajs/react';
import Toast from '../Components/Toast';
import { route } from 'ziggy-js';

export default function Welcome() {
    const { successMessage, email } = usePage().props;

    return (
        <AppLayout>
            {successMessage && (
                <Toast
                    message={successMessage}
                    email={email}
                    onClose={() => { }}
                />
            )}
            <div className='welcome-page'>
                <div
                    className='main-img'
                    style={{
                        height: '400px',
                        backgroundImage: "url('/img/welcome.png')",
                        backgroundSize: 'contain',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <img src="/img/logo.png" alt="Logo" className='logo' />
                    <p>Ջուլիետը ուղարկում է թղթային նամակներ, որոնք ունեն այնպիսի տեսք ինչպիսի նամակներ միշտ երազել եմ ստանալ</p>
                </div>
                <div className='welcome-page-menu'>
                    <ul>
                        <li>
                            <Link href={route('letter-from-juliet')}>
                                <div>Նամակ Ջուլիետից</div>
                                <RightArrow />
                            </Link>
                        </li>
                        <li>
                            <Link href="/send-letter">
                                <div>Ուղարկել Նամակ</div>
                                <RightArrow />
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog">
                                <div>Բլոգ</div>
                                <RightArrow />
                            </Link>
                        </li>
                    </ul>
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
            </div>
        </AppLayout>

    );
}