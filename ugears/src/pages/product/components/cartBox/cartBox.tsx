import { HeartOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import cartBoxStyle from './cartBox.module.scss'

type CartBoxProps = {
    availability: boolean;
    cartActive: boolean;
    favouriteActive: boolean;
}

const CartBox: React.FC<CartBoxProps> = ({ availability, cartActive, favouriteActive }) => {
    const [cart, setCart] = useState(cartActive)
    const [favourite, setFavourite] = useState(favouriteActive)
    const [counter, setCounter] = useState(1)

    const counterPlus = () => {
        setCounter((c) => c=c+1)
    }

    const counterMinus = () => {
        if (counter > 0) setCounter((c) => c=c-1)
    }

    const changeCart = () => {
        setCart(!cart);
    }

    const changeFavourite = () => {
        setFavourite(!favourite);
    }

    return (
        <div className={cartBoxStyle.cartBox}>
        {
            availability? 
            <>{
                cart? 
                <div className={cartBoxStyle.cartBox__CartActive}>
                    <div className={cartBoxStyle.cartBox__CartActive__Button}>В корзине {counter} шт.</div>
                    <div className={cartBoxStyle.cartBox__CartActive__Counter}>
                        <MinusOutlined onClick={counterMinus}/>
                        {counter}
                        <PlusOutlined onClick={counterPlus} />
                    </div>
                </div>:
                <div className={cartBoxStyle.cartBox__Cart} onClick={changeCart}>Добавить в корзину</div>
            }</>:
            <div className={cartBoxStyle.cartBox__NotAvailable}>Нет в наличии</div>
        }


        <div onClick={changeFavourite}>
            <HeartOutlined className={favourite? cartBoxStyle.cartBox__FavouriteActive: cartBoxStyle.cartBox__Favourite} />
        </div>

    </div>
    )
};

export default CartBox;
