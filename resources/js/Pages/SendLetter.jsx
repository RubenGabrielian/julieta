import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '../Components/Header';
import AppLayout from '../Layouts/AppLayout';

export default function SendLetter() {
    const [selectedOption, setSelectedOption] = useState('self');

    const options = [
        {
            id: 'self',
            title: 'Նամակը կգրեմ ինքս',
            description: 'Այս տարբերակում նամակը ուղարկվում է տվյալ',
            price: 2000,
            priceText: '<span>2000</span> դրամ',
        },
        {
            id: 'juliet',
            title: 'Նամակը կգրի Ջուլիետը',
            description: 'Այս տարբերակում նամակը ուղարկվում է տվյալ',
            price: 5000,
            priceText: '<span>5000</span> դրամ',
        },
    ];

    const selectedOptionData = options.find(opt => opt.id === selectedOption);
    const registerUrl = selectedOptionData
        ? `/register?option=${selectedOptionData.id}&title=${encodeURIComponent(selectedOptionData.title)}&price=${selectedOptionData.price}`
        : '/register';

    return (
        <>
            <Head title="Ուղարկել Նամակ" />
            <AppLayout>
                <Header title="" />
                <div className="send-letter-page">
                    <div className="content">
                        <img src="/img/send-letter.png" alt="Send Letter" />
                        <h1>Ուղարկել Նամակ</h1>
                        <p>Ամեն ամիս ցանկացողներին ուղարկվում եմ նամակներ, որտեղ կիսվում արկածներով, էքսպերիմենտներով, սիրո պատմություններով, մտորումներով, հաջողություններով ու ձախողումներով։ Նամակները ներառում են բացառապես իրական պատմություններ ու նաև թեմային համահունչ ժամանակա- կից գրողների պոեմներ և նկարիչների իլուստրացիաներ կամ լուսանկարներ։</p>

                        <div className="radio-options">
                            {options.map((option) => (
                                <label
                                    key={option.id}
                                    className={`radio-option-card ${selectedOption === option.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedOption(option.id)}
                                >
                                    <div className="radio-option-content">
                                        <div className="radio-button">
                                            {selectedOption === option.id && (
                                                <div className="radio-button-inner"></div>
                                            )}
                                        </div>
                                        <div className="radio-option-text">
                                            <h3>{option.title}</h3>
                                            <p>{option.description}</p>
                                        </div>
                                        <div className="radio-option-price" dangerouslySetInnerHTML={{ __html: option.priceText }} />
                                    </div>
                                </label>
                            ))}
                        </div>
                        <Link href={registerUrl} className="button">Գրանցվել</Link>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}

