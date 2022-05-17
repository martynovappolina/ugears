import { ClockCircleOutlined, HomeOutlined, MailFilled, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import askStyle from './ask.module.scss'

const Ask = () => {
    return (
        <div className={askStyle.ask}>
            <div className={askStyle.ask__infoBox}>
                <PhoneOutlined className={askStyle.ask__icon} />
                <div className={askStyle.ask__title}>Телефон</div>
                <div className={askStyle.ask__text}>8-495-120-11-67</div>
            </div>
            <div className={askStyle.ask__infoBox}>
                <HomeOutlined className={askStyle.ask__icon} />
                <div className={askStyle.ask__title}>Адрес</div>
                <div className={askStyle.ask__text}>
                    г. Москва, м. Таганская,
                    ул. Большие Каменщики, д. 6, стр. 1
                    Справа от свадебного салона «Дом Весты»
                    Ступеньки вниз, красная вывеска
                    «АРБА Дистрибьюшн»
                </div>
            </div>
            <div className={askStyle.ask__infoBox}>
                <ClockCircleOutlined className={askStyle.ask__icon} />
                <div className={askStyle.ask__title}>Время работы</div>
                <div className={askStyle.ask__text}>
                    Ежедневно <br />
                    с 9:00 до 21:00
                </div>
            </div>
            <div className={askStyle.ask__infoBox}>
                <MailOutlined className={askStyle.ask__icon} />
                <div className={askStyle.ask__title}>Розничная почта</div>
                <div className={askStyle.ask__text}>order@ugearsshop.ru</div>
            </div>
            <div className={askStyle.ask__infoBox}>
                <MailFilled className={askStyle.ask__icon} />
                <div className={askStyle.ask__title}>Оптовая почта</div>
                <div className={askStyle.ask__text}>opt@ugearsshop.ru</div>
            </div>
        </div>
    )
};

export default Ask;
