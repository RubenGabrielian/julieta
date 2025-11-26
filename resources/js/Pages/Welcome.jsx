import AppLayout from '../Layouts/AppLayout';
import RightArrow from '../Icons/RightArrow';
import EmailIcon from '../Icons/EmailIocn';
import InstaIcon from '../Icons/InstaIcon';
import PhoneIcon from '../Icons/PhoneIcon';
import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <AppLayout>
            <div className='welcome-page'>
                <div
                    className='main-img'
                    style={{
                        height: '800px',
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
                            <Link href="/letter-from-juliet">
                                <div>Նամակ Ջուլիետից</div>
                                <RightArrow />
                            </Link>
                        </li>
                        <li>
                            <a href="">
                                <div>Ուղարկել Նամակ</div>
                                <RightArrow />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <div>Բլոգ</div>
                                <RightArrow />
                            </a>
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
                                <a href="">Մեր Մասին</a>
                            </li>
                            <li>
                                <a href="">Դրույթներ</a>
                            </li>
                            <li>
                                <a href="">Գաղտնիություն</a>
                            </li>
                        </ul>
                    </footer>
                </div>
            </div>
        </AppLayout>

    );
}