import { useState } from 'react';
import Ask from './components/ask/ask';
import AskIcon from './components/askIcon';
import User from './components/user';
import headerStyle from './header.module.scss'

const Header = () => {
    const [askVisible, setAskVisible] = useState(false);

    const askClick = () => setAskVisible(!askVisible);

    return (
        <div className={headerStyle.header}>
            <div className={headerStyle.header__ugears} />
            <div className={headerStyle.header__link}>Каталог</div>
            <div className={headerStyle.header__link}>Избранное</div>
            <div className={headerStyle.header__link}>Корзина</div>
            <div className={headerStyle.header__icons}>
                <div className={headerStyle.header__icon} onClick={askClick}><AskIcon /></div>
                <div className={headerStyle.header__icon}><User /></div>
            </div>
            <Ask visible={askVisible}/>
        </div>
    )
};

export default Header;
