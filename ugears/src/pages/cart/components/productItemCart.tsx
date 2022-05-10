import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Rating from '@components/rating';
import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import CartStore from '@store/CartStore/CartStore';
import { CartModel } from '@store/models/Cart';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cartStyle from './productItemCart.module.scss'

type ProductItemCartProps = {
    product: CartModel;
}

const ProductItemCart: React.FC<ProductItemCartProps> = ({ product }) => {
    const linkStyle = {
        textDecoration: 'none', 
        color: 'black'
    }

    const [counter, setCounter] = useState(product.Quantity)

    async function remove() {
        const response = await apiStore.request( {
            method: HTTPMethod.POST,
            endpoint: `cart/remove/${product.Product.id}`,
            headers: {},
            data: {},
            withCredentials: 'include',
        });  
    };
    async function add() {
        const response = await apiStore.request( {
            method: HTTPMethod.POST,
            endpoint: `cart/add/${product.Product.id}`,
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

    const apiStore = new ApiStore('http://localhost:8080/api/');
    //const apiStore = new ApiStore('http://gears4us.ru/api/');
    const removeItem = () => {
        while (product.Quantity > 0) remove();
    }

    return (
    <div className={cartStyle.cart__item}>
        <img className={cartStyle.cart__image} src={product.Product.imagesUrls[0]} alt={product.Product.title}/>
        <div className={cartStyle.cart__info}>
            <NavLink to={`/product/${product.Product.id}`} style={linkStyle} className={cartStyle.cart__title}>{product.Product.title}</NavLink>
            <Rating stars={product.Product.rating} />
            <div className={cartStyle.cart__text1}>Количество деталей: 
                <div className={cartStyle.cart__text2}> {product.Product.numberOfParts} шт </div>
            </div>
            <div className={cartStyle.cart__text1}>Размер: 
                <div className={cartStyle.cart__text2}> {product.Product.size} </div>
            </div>
            <div className={cartStyle.cart__text1}>Время сборки: 
                <div className={cartStyle.cart__text2}> {product.Product.assemblyTime}</div>
            </div>
            <div className={cartStyle.cart__link} onClick={removeItem}>Удалить</div>
        </div>

        <div className={cartStyle.cart__counter}>
                <MinusOutlined onClick={counterMinus}/>
                {counter}
                <PlusOutlined onClick={counterPlus} />
            </div>
    </div>)
};

export default ProductItemCart;