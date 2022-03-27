import { CaretDownOutlined, CaretUpOutlined, HeartOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Rating from '@components/rating';
import ProductStore from '@store/ProductStore';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SwiperItem from './components/swiper';
import productStyle from './product.module.scss'

const Product = () => {
    const { id } = useParams<{ id: string}>();
    const [fullDescription, setFullDescription] = useState(false)
    const [cart, setCart] = useState(false)
    const [favourite, setFavourite] = useState(false)
    const [counter, setCounter] = useState(1)

    const productStore = useLocalStore(() => new ProductStore());
    useEffect(() => {productStore.getProduct({id: id})}, []) 

    const changeDescription = () => {
        setFullDescription(!fullDescription);
    }

    const changeCart = () => {
        setCart(!cart);
    }

    const changeFavourite = () => {
        setFavourite(!favourite);
    }

    const counterPlus = () => {
        setCounter((c) => c=c+1)
    }

    const counterMinus = () => {
        if (counter > 0) setCounter((c) => c=c-1)
    }


    if(productStore.product) return (
        <div className={productStyle.product}>
        <SwiperItem images_urls={productStore.product.imagesUrls} video_url={productStore.product.videoUrl}/> 
        <div className={productStyle.product__Info}>
            <div className={productStyle.product__Title}>{productStore.product.title}</div>
            <div className={productStyle.product__SmallText}>Артикул: {productStore.product.id}</div>
            <Rating stars={productStore.product.rating} />
            <div className={productStyle.product__Price}>{productStore.product.price}руб.</div>
            
            <div className={productStyle.product__TextBox}>Количество деталей:&nbsp; <div className={productStyle.product__Text}>{productStore.product.numberOfParts}</div></div>
            <div className={productStyle.product__TextBox}>Размер:&nbsp; <div className={productStyle.product__Text}>{productStore.product.size}</div></div>
            <div className={productStyle.product__TextBox}>Время сборки:&nbsp; <div className={productStyle.product__Text}>{productStore.product.assemblyTime}</div></div>

            <div className={fullDescription? productStyle.product__DescriptionActive: productStyle.product__Description}>
                <div className={productStyle.product__Description__Button} onClick={changeDescription}>Описание: {
                    fullDescription? <CaretUpOutlined />: <CaretDownOutlined /> 
                }</div>
                {productStore.product.description}
            </div>

            <div className={productStyle.product__CartBox}>
                {
                    productStore.product.availability? 
                    <>{
                        cart? 
                        <div className={productStyle.product__CartActive}>
                            <div className={productStyle.product__CartActive__Button}>В корзине {counter} шт.</div>
                            <div className={productStyle.product__CartActive__Counter}>
                                <MinusOutlined onClick={counterMinus}/>
                                {counter}
                                <PlusOutlined onClick={counterPlus} />
                            </div>
                        </div>:
                        <div className={productStyle.product__Cart} onClick={changeCart}>Добавить в корзину</div>
                    }</>:
                    <div className={productStyle.product__NotAvailable}>Нет в наличии</div>
                }


                <div onClick={changeFavourite}>
                    <HeartOutlined className={favourite? productStyle.product__FavouriteActive: productStyle.product__Favourite} />
                </div>

            </div>
        </div>      
    </div>
    )
    return null;
}

export default observer(Product);
