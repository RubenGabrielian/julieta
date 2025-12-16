import { Head, Link } from '@inertiajs/react';
import Header from '../Components/Header';
import AppLayout from '../Layouts/AppLayout';

export default function LetterFromJuliet() {
    return (
        <>
            <Head title="Նամակ Ջուլիետից" />
            <AppLayout>
                <Header />
                <div className="letter-from-juliet">
                    <div>
                        <img src="/img/letter.png" alt="Letter from Juliet" />
                        <h1>Նամակ Ջուլիետից</h1>
                        <h3>Գին. <span>3000</span> դրամ/ամիս</h3>
                        <div className="content">
                            <p>Ամեն ամիս ցանկացողներին ուղարկվում եմ նամակներ, որտեղ կիսվում արկածներով, էքսպերիմենտներով, սիրո պատմություններով, մտորումներով, հաջողություններով ու ձախողումներով։ Նամակները ներառում են բացառապես իրական պատմություններ ու նաև թեմային համահունչ ժամանակա- կից գրողների պոեմներ և նկարիչների իլուստրացիաներ կամ լուսանկարներ։</p>
                            <p>Առաջնահերթ ընտրում եմ հայ ստեղծագործողներին՝ թեմատիկ համադրությունների համար, և արտասահմանյան ստեղծագործողների գործերից օգտվում եմ միայն եթե տեղական հարթակներում թեմային համապատասխան տարբերակ չեմ գտնում։</p>
                        </div>
                    </div>
                    <Link href="/register" className="button">Գրանցվել</Link>
                </div>
            </AppLayout>
        </>
    );
}

