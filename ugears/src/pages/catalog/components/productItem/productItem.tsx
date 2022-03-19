import Rating from "@components/rating";
import { ProductModel } from "@store/models/Products";
import React from "react";
import { NavLink } from "react-router-dom";
import Basket from "./components/basket";
import Favorites from "./components/favorites";
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
                <Favorites />
            </div>
            <div className={productItemStyle.product__Basket}>
                <Basket />
            </div>
        </div>
    )
}

export default React.memo(ProductItem);