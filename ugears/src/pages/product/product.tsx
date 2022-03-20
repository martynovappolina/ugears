import ProductStore from '@store/ProductStore';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SwiperItem from './components/swiper';
import productStyle from './product.module.scss'

const Product = () => {
    const { id } = useParams<{ id: string}>();

    const productStore = useLocalStore(() => new ProductStore());
    useEffect(() => {productStore.getProduct({id: id})}, []) 

    if(productStore.product) return <SwiperItem images_urls={productStore.product.imagesUrls} video_url={productStore.product.videoUrl}/>
    return null;
}

export default observer(Product);
