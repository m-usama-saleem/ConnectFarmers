import { LocalStorageContext } from '../../context';
//import BackgroundImage from '../../contents/Images/login_bg.png';
import React, { useState, useEffect, useContext, useRef } from "react";
import { useTranslation } from 'react-i18next';
import '../../i18n'
import { AuthenticationService } from '../../services/AuthenticationService';
import { useNavigate } from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

//import { useLoading, ThreeDots } from '@agney/react-loading';
export const LoginView = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isBackgroundImageLoaded, setisBackgroundImageLoaded] = useState(true);
    const { t } = useTranslation();
    const { culture, updateCulture, user } = useContext(LocalStorageContext)
    let navigate = useNavigate();
    let loginBtnRef = useRef();
    let regissterBtnRef = useRef();
    const [showLogin, setShowLogin] = useState(false);

    const [loginId, setloginId] = useState('')
    const [password, setPassword] = useState('')
    const [registerId, setregisterId] = useState('')
    const [registerPassword, setregisterPassword] = useState('')
    const [error, setError] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const { Login,Register } = AuthenticationService();

    useEffect(() => {
        if (user.isSessionExpired == false) {
            setError(t('Session Expired'));
        }
    }, []);

    const onLanguageChange = (event) => {

        const language = event.target.value;

        updateCulture("language", language);
        localStorage.setItem("culture", language);

        if (language == "en") {
            updateCulture("textDirection", "ltr");
        } else if (language == "ar") {
            updateCulture("textDirection", "rtl");
        }
    };
    const onloginIdKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await onLogin()
        }
    }
    const onPasswordKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await onLogin()
        }
    }
    const onRegisterIdKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await onRegister()
        }
    }
    const onRegisterPasswordKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await onRegister()
        }
    }
    const onLogin = async () => {
        setIsLoading(true);
        setError("");
        setSuccessMsg("");
        if (loginId === "" || password === "") {
            setError(t('PleaseenteraloginIdandpassword'));
            setIsLoading(false);
            return;
        }

        if (loginBtnRef.current) {
            loginBtnRef.current.setAttribute("disabled", "disabled");
        }
        var loginModel = { loginId, password }
        var result = await Login(loginModel);
        if (result.isError === false) {
            if (document.referrer == "") {
                navigate('/');
            } else {
                return (navigate(-1));
            }
        } else {
            setTimeout(function () {
                setIsLoading(false);
                setError(result.data.message);
                if (loginBtnRef.current) {
                    loginBtnRef.current.removeAttribute("disabled");
                }
            }, 2000);
        }
    }
    const onRegister = async (e) => {

        setIsLoading(true);
        setError("");
        setSuccessMsg("");
        if (registerId === "" || registerPassword === "") {
            setError(t('PleaseenteraloginIdandpassword'));
            setIsLoading(false);
            return;
        }

        if (regissterBtnRef.current) {
            regissterBtnRef.current.setAttribute("disabled", "disabled");
        }
        var registerModel = { loginId: registerId, password: registerPassword }
        var result = await Register(registerModel);
        if (result.isError === false) {
            if (document.referrer == "") {
                setSuccessMsg("Registered Successfully. Please Login")
                setIsLoading(false);
                setShowLogin(e,true);
            } else {
                return (navigate(-1));
            }
        } else {
            setTimeout(function () {
                setIsLoading(false);
                debugger;
                setError(result.data.message);
                if (regissterBtnRef.current) {
                    regissterBtnRef.current.removeAttribute("disabled");
                }
            }, 2000);
        }
    }
    const onShowLogin = (e, isLogin) => {
        setShowLogin(isLogin);
        e.preventDefault();
    }
    return (
        <div className="login-body" dir={culture.textDirection}>
            <div className="login-wrapper">
                <div className="login-panel">
                    <img src="assets/layout/images/logo-white.png" className="logo" alt="diamond-layout" />
                    {
                        showLogin ?
                            <div className="login-form">
                                {isLoading === true ? <ProgressSpinner /> : null}
                                {error !== "" ? <span class="p-error p-d-block">{error}</span> : null}
                                {successMsg !== "" ? <span class="p-success p-d-block">{successMsg}</span> : null}        
                                <h2>Login</h2>
                                <p><a onClick={(e) => onShowLogin(e,false)}>Create New Account</a></p>
                                <InputText id="loginId" placeholder={t('Email')} onChange={e => setloginId(e.target.value)} onKeyDown={onloginIdKeyDown} />
                                <Password id="Password" placeholder={t('Password')} onChange={e => setPassword(e.target.value)} onKeyDown={onPasswordKeyDown} />
                                <Button label="CONTINUE" type="button" ref={loginBtnRef} variant="contained" onClick={onLogin}></Button>
                            </div> :
                            <div className="login-form">
                                {isLoading === true ? <ProgressSpinner /> : null}
                                {error !== "" ? <span class="p-error p-d-block">{error}</span> : null}
                                {successMsg !== "" ? <span class="p-success p-d-block">{successMsg}</span> : null}
                                <h2>Register</h2>
                                <p><a onClick={(e) => onShowLogin(e, true)}>Already a member, please Login</a></p>

                                <InputText id="regiserId" placeholder={t('Email')} onChange={e => setregisterId(e.target.value)} onKeyDown={onRegisterIdKeyDown} />
                                <Password id="registerPassword" placeholder={t('Password')} onChange={e => setregisterPassword(e.target.value)} onKeyDown={onRegisterPasswordKeyDown} />
                                <Password id="registerConfirmPassword" placeholder={t('ConfirmPassword')} onChange={e => setregisterPassword(e.target.value)} onKeyDown={onRegisterPasswordKeyDown} />
                                <Button label="CONTINUE" type="button" ref={regissterBtnRef} variant="contained" onClick={onRegister}></Button>
                            </div>
                    }
                    <p>A problem? <a href="/">Click here</a> and let us help you.</p>
                </div>
                <div className="login-image">
                    <div className="login-image-content">
                        <h1>Access to your</h1>
                        <h1>Connect Farmer</h1>
                        <h1>Account</h1>
                        <h3>
                            {t('LoginNote')}
                        </h3>
                    </div>
                    <div className="image-footer">
                        <p>{t('FollowNote')}.</p>
                        <div className="icons">
                            <i className="pi pi-github"></i>
                            <i className="pi pi-twitter"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}