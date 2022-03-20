import './swiper.scss';
import 'swiper/css';
import '../../../../../node_modules/swiper/swiper-bundle.css'
import Swiper, { Navigation, Scrollbar } from 'swiper';
import React from 'react';
import { Pagination } from 'antd';

type SwiperProps = {
    images_urls: string[],
    video_url: string
}

const SwiperItem: React.FC<SwiperProps> = ({ images_urls, video_url }) => {
    new Swiper('.image-slider',
    {
        observer: true,
        observeParents: true,
        parallax:true,
        modules: [Navigation, Pagination, Scrollbar],
        speed: 500,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
    });

    return (
        <div className='swiper-body'>
            <div className='image-slider swiper-container'>
                <div className='image-slider__wrapper swiper-wrapper'>
                    {images_urls.map((url) => 
                        <div key={url} className='image-slider__slide swiper-slide'>
                            <div className='image-slider__image'>
                                <img src={url} alt='ugears' />
                            </div>
                        </div>
                    )}
                </div>
                <div className='swiper-button-prev' />
                <div className='swiper-button-next' />
                <div className='swiper-pagination' />
            </div>
        </div>
    )
};

export default React.memo(SwiperItem);
