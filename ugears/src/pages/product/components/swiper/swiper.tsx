import './swiper.scss';
import 'swiper/css';
import '../../../../../node_modules/swiper/swiper-bundle.css'
import Swiper, { Navigation, Lazy, Mousewheel, Zoom, Thumbs } from 'swiper';
import React from 'react';

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
        modules: [Zoom, Thumbs],
        speed: 500,

        // preloadImages: false,
        // lazy: {
        //     loadOnTransitionStart: false,
        //     loadPrevNext: true,
        // },
        // watchSlidesProgress: true,

        zoom: {
            maxRatio: 5,
            minRatio: 1,
        },

        thumbs: {
            swiper: {
                observer: true,
                observeParents: true,
                el: '.image-mini-slider',
                slidesPerView: 3,
                direction: 'vertical',
                modules: [Navigation, Mousewheel],

                mousewheel: {
                    invert: false,
                },

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  },
            },
        }
    });

    return (
        <div className='swiper-body'>
            <div className='image-mini-slider swiper-container'>
                <div className='swiper-button-prev' />
                <div className='swiper-button-next' />
                <div className='image-mini-slider__wrapper swiper-wrapper'>
                    {images_urls.map((url) => 
                        <div key={url} className='image-mini-slider__slide swiper-slide'>
                            <div className='image-mini-slider__image'>
                                <img src={url} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='image-slider swiper-container'>
                <div className='image-slider__wrapper swiper-wrapper'>
                    {images_urls.map((url) => 
                        <div key={url} className='image-slider__slide swiper-slide'>
                            <div className='image-slider__image swiper-zoom-container'>
                                <img src={url} />
                                {/* className='swiper-lazy' */}
                                {/* <div className='swiper-lazy-preloader' /> */}
                            </div>
                        </div>
                    )}
                </div>    
            </div>
        </div>
    )
};

export default React.memo(SwiperItem);
