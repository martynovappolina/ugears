import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import CartBox from '@pages/product/components/cartBox';
import Rating from '@components/rating';
import ProductStore from '@store/ProductStore';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SwiperItem from './components/swiper';
import productStyle from './product.module.scss'
import Reviews from './components/reviews';

const Product = () => {
    const { id } = useParams<{id: string}>();
    const [fullDescription, setFullDescription] = useState(false);

    const productStore = useLocalStore(() => new ProductStore());
    useEffect(() => {productStore.getProduct({id: id})}, []);

    const changeDescription = () => {
        setFullDescription(!fullDescription);
    }

    if(productStore.product) return (<>
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
                <CartBox availability={productStore.product.availability} cartActive={false} favouriteActive={false} />
            </div>      
        </div>

        <Reviews />
    </>)
    return null;
}

export default observer(Product);
