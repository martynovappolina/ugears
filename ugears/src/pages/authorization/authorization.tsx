import React, { useState } from 'react';
import authoStyle from './authorization.module.scss'

const Authorization = () => {   
    const [active, setActive] = useState(true);
    const [color, setColor] = useState(true);

    const signFunction = () => {
        setActive(!active);
        setColor(!color);
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
                    <form action='#' className={active ? 
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__signIn:
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__actSignIn}>
                        <h3 className={authoStyle.formBox__title}>Вход</h3>
                        <p>
                            <input type="text" placeholder='Логин' className={authoStyle.formBox__input}></input>
                        </p>
                        <p>
                        <input type="password" placeholder='Пароль' className={authoStyle.formBox__input}></input>
                        </p>
                        <p>
                            <button className={authoStyle.formBox__button}>Войти</button>
                        </p>
                        <p>
                            <a href='#' className={authoStyle.formBox__forgot}>Восстановить пароль</a>
                        </p>
                    </form>

                    <form action='#' className={active ? 
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__signUp:
                    authoStyle.formBox__form + " " + authoStyle.formBox__form__actSignUp}>
                        <h3 className={authoStyle.formBox__title}>Регистрация</h3>
                        <p>
                            <input type="text" placeholder='Электронная почта' className={authoStyle.formBox__input}></input>
                        </p>
                        <p>
                            <input type="text" placeholder='Номер телефона' className={authoStyle.formBox__input}></input>
                        </p>
                        <p>
                            <input type="text" placeholder='Логин' className={authoStyle.formBox__input}></input>
                        </p>
                        <p>
                        <input type="password" placeholder='Пароль' className={authoStyle.formBox__input}></input>
                        </p>
                        <p>
                        <input type="password" placeholder='Подтвердите пароль' className={authoStyle.formBox__input}></input>
                        </p>
                        <p>
                            <button className={authoStyle.formBox__button + " " + authoStyle.formBox__signUp}>Зарегистрироваться</button>
                        </p>
                    </form>
            </div>

        </article>
    )
};

export default Authorization;
