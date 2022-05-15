import { HeartOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import CartStore from '@store/CartStore/CartStore';
import { BASE_URL } from '@store/models/baseUrl/baseUrl';
import { useLocalStore } from '@utils/useLocalStore/useLocalStore';
import { useEffect, useState } from 'react';
import { useUgearsContext } from '../../../../App/App';
import cartBoxStyle from './cartBox.module.scss'

type CartBoxProps = {
    availability: boolean;
    cartActive: boolean;
    favouriteActive: boolean;
    id: string;
}

const CartBox: React.FC<CartBoxProps> = ({ availability, cartActive, favouriteActive, id }) => {
    const cartContext = useUgearsContext();
    const [cart, setCart] = useState(cartActive)
    const [favourite, setFavourite] = useState(favouriteActive)
    const [counter, setCounter] = useState(1)

    useEffect(()=>{
        cartContext.cartStore.list.map((el) => 
            {if(el.Product.id == Number(id)) {
                setCart(true);
                setCounter(el.Quantity);
            }}  
        );
    }, []);

    const apiStore = new ApiStore(BASE_URL);

    async function remove() {
        const response = await apiStore.request({
            method: HTTPMethod.POST,
            endpoint: `cart/remove/${id}`,
            headers: {},
            data: {},
            withCredentials: 'include',
        });  
    };
    async function add() {
        const response = await apiStore.request( {
            method: HTTPMethod.POST,
            endpoint: `cart/add/${id}`,
            headers: {},
            data: {},
            withCredentials: 'include',
        }); 
    };

    const counterPlus = () => {
        add();
        setCounter((c) => c=c+1)
    }

    const counterMinus = () => {
        remove();
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
