import { useState, useCallback } from 'react';

import authoStyle from './authorization.module.scss'
import Input from './components/input';
import { observer } from 'mobx-react-lite';
import { useUserContext } from '../../App/App';
import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import { UserApi } from '@store/models/Users';

const Authorization = () => {   
    const [active, setActive] = useState(true);
    const [color, setColor] = useState(true);

    const apiStore = new ApiStore('http://51.250.76.99:8080/api/');
    
    async function getUser() {
        const response = await apiStore.request<UserApi>( {
            method: HTTPMethod.POST,
            endpoint: `auth/login/`,
            data: {
                username: login,
                password: password,
            },
        }); 
        console.log(response.data)
    }

    useCallback(() => {
        getUser();
    }, []);

    const signFunction = () => {
        setActive(!active);
        setColor(!color);
    }

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')

    const inputLogin = useCallback((e: any) => setLogin(e.target.value), []);
    const inputPassword = useCallback((e: any) => setPassword(e.target.value), []);

    const userContext = useUserContext();
    const signInClick = useCallback(() => {
        userContext.userStore.getUser({
            login: login
        })
    }, [login])

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
    const signUpClick = () => {
        if(newPassword === newRepeatPassword) setPassNotMatch(false);
        else setPassNotMatch(true);
    }

    return (
        <article className={authoStyle.container}>

            <div className={color? authoStyle.block : authoStyle.block__active}>
                <section className={authoStyle.block__item}>
                    <h2 className={authoStyle.block__title}>У Вас уже есть аккаунт?</h2>
                    <button className={authoStyle.block__button} onClick={signFunction}>Войти</button>
                </section >
                <section className={authoStyle.block__item}>
                    <h2 className={authoStyle.block__title}>У Вас нет аккаунта?</h2>
                    <button className={authoStyle.block__button} onClick={signFunction}>Зарегистрироваться</button>
                </section >
            </div>

            <div className={active ? authoStyle.formBox : authoStyle.formBox__active}>
                    <div className={active ? 
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__signIn:
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__actSignIn}>
                        <h3 className={authoStyle.formBox__title}>Вход</h3>
                        <p>
                            <Input type='text' placeholder='Логин' onChange={inputLogin} value={login} />
                        </p>
                        <p>
                            <Input type="password" placeholder='Пароль' onChange={inputPassword} value={password} />
                        </p>
                        <p>
                            <button className={authoStyle.formBox__button} onClick={signInClick}>Войти</button>
                        </p>
                        <p>
                            <a href='#' className={authoStyle.formBox__forgot}>Восстановить пароль</a>
                        </p>
                    </div>

                    <div className={active ? 
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__signUp:
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__actSignUp}>
                        <h3 className={authoStyle.formBox__title}>Регистрация</h3>
                        <p>
                            <Input type="text" placeholder='Электронная почта' onChange={inputNewEmail} value={newEmail} />
                        </p>
                        <p>
                            <Input type="text" placeholder='Номер телефона' onChange={inputNewPhoneNumber} value={newPhoneNumber} />
                        </p>
                        <p>
                            <Input type="text" placeholder='Логин' onChange={inputNewLogin} value={newLogin} />
                        </p>
                        <p>
                            <Input type="password" placeholder='Пароль' onChange={inputNewPassword} value={newPassword} />
                        </p>
                        <p>
                            <Input type="password" placeholder='Подтвердите пароль' onChange={inputNewRepeatPassword} value={newRepeatPassword} />
                        </p>
                        { passNotMatch ? <div className={authoStyle.formBox__text}> Пароли не совпадают</div>:null }
                        <p>
                            <button className={authoStyle.formBox__button + " " + authoStyle.formBox__signUp}onClick={signUpClick}>Зарегистрироваться</button>
                        </p>
                    </div>
            </div>

        </article>
    )
};

export default observer(Authorization);
