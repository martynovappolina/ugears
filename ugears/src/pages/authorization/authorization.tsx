import React, { useState, useCallback, useEffect } from 'react';

import authoStyle from './authorization.module.scss'
import Input from './components/input';
import { observer, useLocalStore } from 'mobx-react-lite';
import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import {  UserSignIn, UserSignUp } from '@store/models/Users';
import UserStore from '@store/UserStore';
import UserPage from '@pages/userPage';
import { BASE_URL } from '@store/models/baseUrl/baseUrl';

const Authorization = () => {   
    const [active, setActive] = useState(true);
    const [color, setColor] = useState(true);

    const signFunction = () => {
        setActive(!active);
        setColor(!color);
    }

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')

    const inputLogin = useCallback((e: any) => setLogin(e.target.value), []);
    const inputPassword = useCallback((e: any) => setPassword(e.target.value), []);
    
    const apiStore = new ApiStore(BASE_URL);
    const userStore = useLocalStore(() => new UserStore());

    const [autho, setAutho] = useState(false);
    
    async function getCheckUser() {
        const response = await apiStore.request( {
            method: HTTPMethod.GET,
            headers: {},
            endpoint: 'auth/check',
            data: {},
            withCredentials: 'include',
        }); 
        
        if (response.success) {
            userStore.getProfileUser();
            setAutho(true);
        }
        else setAutho(false);
    };

    useEffect(() => {
        getCheckUser();
    }, [])

    const handleClickExit = () => {
        async function logoutUser() {
            const response = await apiStore.request( {
                method: HTTPMethod.POST,
                endpoint: 'auth/logout',
                headers: {},
                data: {},
                withCredentials: 'include',
            }); 
        };
        logoutUser();
        setAutho(false);
    }

    const signInClick = useCallback(() => {
        async function postUser() {
            const response = await apiStore.request<UserSignIn>( {
                method: HTTPMethod.POST,
                endpoint: 'auth/login',
                stringify: true,
                headers: {},
                data: {
                    "username": login,
                    "password": password,
                },
                withCredentials: 'include',
            }); 
            
        };
        postUser();
        getCheckUser();
    }, [login, password])

    const [newLogin, setNewLogin] = useState('');
    const [newPassword, setNewPassword] = useState('')
    const [newRepeatPassword, setNewRepeatPassword] = useState('')
    const [newEmail, setNewEmail] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const inputNewLogin = useCallback((e: any) => setNewLogin(e.target.value), []);
    const inputNewPassword = useCallback((e: any) => setNewPassword(e.target.value), []);
    const inputNewRepeatPassword = useCallback((e: any) => setNewRepeatPassword(e.target.value), []);
    const inputNewEmail = useCallback((e: any) => setNewEmail(e.target.value), []);
    const inputNewPhoneNumber = useCallback((e: any) => setNewPhoneNumber(e.target.value), []);

    const [passNotMatch, setPassNotMatch] = useState(false);
    const signUpClick = useCallback(() => {
        async function postUser() {
            const response = await apiStore.request<UserSignUp>( {
                method: HTTPMethod.POST,
                endpoint: 'auth/signup',
                stringify: true,
                headers: {},
                data: {
                    "username": newLogin,
                    "password": newPassword,
                    "email": newEmail,
                },
                withCredentials: 'include',
            });
            if (response.success) {
                setLogin(newLogin);
                setPassword(newPassword);
                signInClick();
            } 
        }
        if(newPassword === newRepeatPassword) {
            setPassNotMatch(false);
            postUser();
        }
        else setPassNotMatch(true);
    }, [newLogin, newPassword, newRepeatPassword, newEmail])
    
    if(autho) return (
        <UserPage user={userStore.user} handleClickExit={handleClickExit} />
    );

    return (
        <article className={authoStyle.container}>
            <div className={color? authoStyle.block : authoStyle.block__active}>
                <section className={authoStyle.block__item}>
                    <h2 className={authoStyle.block__title}>?? ?????? ?????? ???????? ???????????????</h2>
                    <button className={authoStyle.block__button} onClick={signFunction}>??????????</button>
                </section >
                <section className={authoStyle.block__item}>
                    <h2 className={authoStyle.block__title}>?? ?????? ?????? ?????????????????</h2>
                    <button className={authoStyle.block__button} onClick={signFunction}>????????????????????????????????????</button>
                </section >
            </div>

            <div className={active ? authoStyle.formBox : authoStyle.formBox__active}>
                    <div className={active ? 
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__signIn:
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__actSignIn}>
                        <h3 className={authoStyle.formBox__title}>????????</h3>
                        <p>
                            <Input type='text' placeholder='??????????' onChange={inputLogin} />
                        </p>
                        <p>
                            <Input type="password" placeholder='????????????' onChange={inputPassword} />
                        </p>
                        <p>
                            <button className={authoStyle.formBox__button} onClick={signInClick}>??????????</button>
                        </p>
                        <p>
                            <a href='#' className={authoStyle.formBox__forgot}>???????????????????????? ????????????</a>
                        </p>
                    </div>

                    <div className={active ? 
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__signUp:
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__actSignUp}>
                        <h3 className={authoStyle.formBox__title}>??????????????????????</h3>
                        <p>
                            <Input type="text" placeholder='?????????????????????? ??????????' onChange={inputNewEmail} value={newEmail} />
                        </p>
                        <p>
                            <Input type="text" placeholder='?????????? ????????????????' onChange={inputNewPhoneNumber} value={newPhoneNumber} />
                        </p>
                        <p>
                            <Input type="text" placeholder='??????????' onChange={inputNewLogin} value={newLogin} />
                        </p>
                        <p>
                            <Input type="password" placeholder='????????????' onChange={inputNewPassword} value={newPassword} />
                        </p>
                        <p>
                            <Input type="password" placeholder='?????????????????????? ????????????' onChange={inputNewRepeatPassword} value={newRepeatPassword} />
                        </p>
                        { passNotMatch ? <div className={authoStyle.formBox__text}> ???????????? ???? ??????????????????</div>:null }
                        <p>
                            <button className={authoStyle.formBox__button + " " + authoStyle.formBox__signUp}onClick={signUpClick}>????????????????????????????????????</button>
                        </p>
                    </div>
            </div>

        </article>
    )
};

export default observer(Authorization);
