import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Ask from './components/ask/ask';
import AskIcon from './components/askIcon';
import User from './components/user';
import headerStyle from './header.module.scss'

const Header = () => {
    const [askVisible, setAskVisible] = useState(false);

    const askClick = () => setAskVisible(!askVisible);

    return (
        <div className={headerStyle.header}>
            <NavLink className={headerStyle.header__ugears} to={"/"}/>
            <NavLink className={headerStyle.header__link} style={{ textDecoration: 'none', color: 'black' }} to={"/products"}>Каталог</NavLink>
            <div className={headerStyle.header__link}>Избранное</div>
            <div className={headerStyle.header__link}>Корзина</div>
            <div className={headerStyle.header__icons}>
                <div className={headerStyle.header__icon} onClick={askClick}><AskIcon /></div>
                <NavLink className={headerStyle.header__icon} to={"/autho"}><User /></NavLink>
            </div>
            <Ask visible={askVisible}/>
        </div>
    )
};

export default Header;
