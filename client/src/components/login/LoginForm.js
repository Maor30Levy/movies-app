import React, { useContext, useEffect, useState } from 'react';
import { clearModalAction } from '../../actions/ModalActions';
import { loginAction } from '../../actions/UserActions';
import { ModalContext } from '../../contexts/ModalContext';
import { UserContext } from '../../contexts/UserContext';
import { loginUser } from '../../server/login';


const LoginForm = (props) => {
    const { userDataDispatch } = useContext(UserContext);
    const { modalDataDispatch } = useContext(ModalContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailInputValid, setIsEmailInputValid] = useState(true);
    const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (props.errorMessage !== "") {
            setErrorMessage(props.errorMessage)
        }
    }, [props.errorMessage])
    const isFormInvalid = () => {
        return email === '' || password === '';
    };

    const onBlurEmailInput = (event) => {
        const theEmail = event.target.value.trim();
        if (theEmail === '') {
            setEmail('');
            setIsEmailInputValid(false);
        } else {
            setEmail(theEmail);
            setIsEmailInputValid(true);
        }
    }

    const onBlurPasswordInput = (event) => {
        const thePassword = event.target.value.trim();
        setPassword(thePassword === '' ? '' : thePassword);
        setIsPasswordInputValid(thePassword === '' ? false : true);
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const resUserData = await loginUser({ email, password });
            userDataDispatch(loginAction(resUserData));
            modalDataDispatch(clearModalAction());
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    const onClickSubscribe = () => {
        props.setIsLoginMode(false);
    };
    return (
        <div className="login-form">
            <h3>Login</h3>
            {
                errorMessage !== '' && <div className="error-message">{errorMessage}</div>
            }
            <form className="login-form" onSubmit={onSubmitForm}>
                <input placeholder="Email" onBlur={onBlurEmailInput} />
                {!isEmailInputValid && <div className="invalid-message">You must enter your Email.</div>}
                <input type="password" placeholder="Password" onBlur={onBlurPasswordInput} />
                {!isPasswordInputValid && <div className="invalid-message">You must enter your password.</div>}
                <div className="login-form__nav">
                    <button type="submit" disabled={isFormInvalid()}>Submit</button>
                    <div className="login-or-subscribe" onClick={onClickSubscribe}>Subscribe</div>
                </div>


            </form>
        </div>
    )
};


export default LoginForm;