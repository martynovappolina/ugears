import CartStore from "@store/CartStore/CartStore";
import { observer, useLocalStore } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ProductItemCart from "./components/productItemCart";
import cartStyle from './cart.module.scss'
import { BASE_URL } from "@store/models/baseUrl/baseUrl";
import ApiStore from "@shared/store/ApiStore";
import { HTTPMethod } from "@shared/store/ApiStore/types";

const Cart = () => {
    const cartStore = useLocalStore(() => new CartStore());
    const [adress, setAdress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<"card"|"cash"|"">("");
    const [callNeeded, setCallNeeded] =useState(false);
    const [card, setCard] = useState(false);
    const [cash, setCash] = useState(false);
    const [order, setOrder] = useState(false);
    const apiStore = new ApiStore(BASE_URL);

    useEffect(() => {
        cartStore.getCart();
    }, [])

    const handleClickCard = () => {
        setCard(true);
        setCash(false);
        setPaymentMethod('card');
    };

    const handleClickCash = () => {
        setCard(false);
        setCash(true);
        setPaymentMethod('cash');
    };

    const handleClickCall = () => {
        setCallNeeded(!callNeeded);
    };

    async function postOrder() {
        const response = await apiStore.request( {
            method: HTTPMethod.POST,
            headers: {},
            endpoint: 'cart/complete',
            data: {
                "pick_up": true,
                "delivery_address": adress,
                "payment_method": paymentMethod,
                "call_needed": callNeeded,
            },
            withCredentials: 'include',
        }); 
        
        if (response.success) {
            setOrder(true);
        }
    };

    const inputAdress = (e: any) => setAdress(e.target.value)
    
    if (cartStore.list.length === 0) return <div className={cartStyle.cart__text}>Здесь пока ничего нет...<br />Или Вы не авторизировались</div>
    else return (
        <div className={cartStyle.cart__main}>
            <div className={cartStyle.cart__itemBox}>
                {cartStore.list.map((product) => <div key={product.Product.id}><ProductItemCart product={product} /></div>)}
            </div>
            <div className={cartStyle.cart__order}>
                <p>
                    <input className={cartStyle.cart__input} type="text" placeholder='Адрес доставки' onChange={inputAdress} value={adress}/>
                </p>
                <div className={cartStyle.cart__methodBox}>
                    <div className={card? cartStyle.cart__buttonMethodBlueActive: cartStyle.cart__buttonMethodBlue} onClick={handleClickCard}>Карта</div>
                    <div className={cash? cartStyle.cart__buttonMethodGreenActive: cartStyle.cart__buttonMethodGreen} onClick={handleClickCash}>Наличные</div>
                </div>
                Требуется ли звонок менеджера для уточнения деталей заказа?
                <div className={cartStyle.cart__switch}>
                    нет
                    <input type="checkbox" onClick={handleClickCall}/>
                    да
                </div>
                {order? <div className={cartStyle.cart__text}>Заказ успешно оформлен!</div>:<div className={cartStyle.cart__buttonOrder} onClick={postOrder}>Оформить заказ</div>}
            </div>
        </div>
    )
};

export default observer(Cart);