import CartStore from "@store/CartStore/CartStore";
import { observer, useLocalStore } from "mobx-react-lite";
import { useEffect } from "react";
import ProductItemCart from "./components/productItemCart";
import cartStyle from './cart.module.scss'
import { useUgearsContext } from "../../App/App";

const Cart = () => {
    const cartContext = useUgearsContext();
    
    if (cartContext.cartStore.list.length === 0) return <div className={cartStyle.cart__text}>Здесь пока ничего нет...<br />Или Вы не авторизировались</div>
    else return (
        <div className={cartStyle.cart__main}>
            <div className={cartStyle.cart__itemBox}>
                {cartContext.cartStore.list.map((product) => <div key={product.Product.id}><ProductItemCart product={product} /></div>)}
            </div>
            <div className={cartStyle.cart__order}></div>
        </div>
    )
};

export default observer(Cart);