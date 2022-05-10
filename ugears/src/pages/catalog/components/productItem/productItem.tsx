import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Rating from "@components/rating";
import ApiStore from "@shared/store/ApiStore";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { ProductModel } from "@store/models/Products";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Image from "./components/image";

import productItemStyle from './productItem.module.scss'

type ProductItemProps = {
    product: ProductModel;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const linkStyle = {
        textDecoration: 'none', 
        color: 'black'
    }

    const [favourite, setFavourite] = useState(false)
    const changeFavourite = () => {
        setFavourite(!favourite);
    }

    const [cart, setCart] = useState(false)
    const apiStore = new ApiStore('http://localhost:8080/api/');
    //const apiStore = new ApiStore('http://gears4us.ru/api/');
    const changeCart = () => {
        setCart(!cart);
        async function addCart() {
            const response = await apiStore.request( {
                method: HTTPMethod.POST,
                endpoint: `cart/add/${product.id}`,
                headers: {},
                data: {},
                withCredentials: 'include',
            }); 
        };
        async function removeCart() {
            const response = await apiStore.request( {
                method: HTTPMethod.POST,
                endpoint: `cart/remove/${product.id}`,
                headers: {},
                data: {},
                withCredentials: 'include',
            }); 
            
        };
        (cart===false)? addCart(): removeCart();
    }

    return(
        <div className={productItemStyle.product}>
            <Image src={product.imagesUrls[0]} alt={product.title}/>
            <div className={productItemStyle.product__Info}>
                <NavLink to={`/product/${product.id}`} style={linkStyle} className={productItemStyle.product__Title}>{product.title}</NavLink>
                <div className={productItemStyle.product__Price}>{product.price} руб</div>
                <Rating stars={product.rating} />
                <div className={productItemStyle.product__Text1}>Количество деталей: 
                    <div className={productItemStyle.product__Text2}> {product.numberOfParts} шт </div>
                </div>
                <div className={productItemStyle.product__Text1}>Размер: 
                    <div className={productItemStyle.product__Text2}> {product.size} </div>
                </div>
                <div className={productItemStyle.product__Text1}>Время сборки: 
                    <div className={productItemStyle.product__Text2}> {product.assemblyTime}</div>
                </div>
            </div>
            <div className={productItemStyle.product__Favorites}>
                <div onClick={changeFavourite}>
                    <HeartOutlined className={favourite? productItemStyle.product__IconActive: productItemStyle.product__Icon} /> 
                </div>
            </div>
            <div className={productItemStyle.product__Cart}>
                <div onClick={changeCart}>
                    <ShoppingCartOutlined className={cart? productItemStyle.product__IconActiveCart: productItemStyle.product__Icon} /> 
                </div>
                </div>
        </div>
    )
}

export default React.memo(ProductItem);