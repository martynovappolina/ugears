import CartStore from "@store/CartStore/CartStore";
import { observer, useLocalStore } from "mobx-react-lite";
import { useEffect } from "react";
import ProductItemCart from "./components/productItemCart";
import cartStyle from './cart.module.scss'

const Cart = () => {
    const cartStore = useLocalStore(() => new CartStore());
    useEffect(() => {
        cartStore.getCart();
    }, [])
    
    if (cartStore.list.length === 0) return <div className={cartStyle.cart__text}>Здесь пока ничего нет...</div>
    else return (
        <div className={cartStyle.cart__main}>
            {cartStore.list.map((product) => <div key={product.Product.id}><ProductItemCart product={product} /></div>)}
        </div>
    )
};

export default observer(Cart);