import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Ask from './components/ask/ask';
import AskIcon from './components/askIcon';
import User from './components/user';
import headerStyle from './header.module.scss'

const Header = () => {

    return (
        <div className={headerStyle.header}>
            <NavLink className={headerStyle.header__ugears} to={"/"}/>
            <NavLink className={headerStyle.header__link} style={{ textDecoration: 'none', color: 'black' }} to={"/products"}>Каталог</NavLink>
            <NavLink className={headerStyle.header__link} style={{ textDecoration: 'none', color: 'black' }} to={"/favorites"} >Избранное</NavLink>
            <NavLink className={headerStyle.header__link} style={{ textDecoration: 'none', color: 'black' }} to={"/cart"}>Корзина</NavLink>
            <div className={headerStyle.header__icons}>
                <NavLink to={'/ask'} className={headerStyle.header__icon}><AskIcon /></NavLink>
                <NavLink className={headerStyle.header__icon} to={"/autho"}><User /></NavLink>
            </div>
        </div>
    )
};

export default Header;
