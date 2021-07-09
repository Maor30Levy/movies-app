import React, { useState } from 'react';
import { subscribeUser } from '../../server/login';
import LoginForm from './LoginForm';
import SubscribeForm from './SubscribeForm';


const LoginPage = (props) => {

    const errorMessage = props?.location?.state?.needToLogin ?
        "You need to login" : "";
    const [isLoginMode, setIsLoginMode] = useState(true);
    return (
        <div className={"login-page"}>
            <div className="login-page__form">
                {isLoginMode ?
                    <LoginForm setIsLoginMode={setIsLoginMode} errorMessage={errorMessage} /> :
                    <SubscribeForm setIsLoginMode={setIsLoginMode} partOfLogin={true} subscribeFunc={subscribeUser} />}
            </div>
        </div>
    )
};

export default LoginPage;