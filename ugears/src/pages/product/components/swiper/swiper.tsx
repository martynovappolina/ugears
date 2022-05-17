import './swiper.scss';
import 'swiper/css';
import '../../../../../node_modules/swiper/swiper-bundle.css'
import Swiper, { Navigation, Mousewheel, Zoom, Thumbs } from 'swiper';
import React, { useState, DragEvent } from 'react';
import VideoPlayer from './components/videoPlayer';
import VideoPlayerMini from './components/videoPlayerMini';
import productStyle from './addVideo.module.scss'
import ApiStore from '@shared/store/ApiStore';
import { BASE_URL } from '@store/models/baseUrl/baseUrl';
import { HTTPMethod } from '@shared/store/ApiStore/types';

type SwiperProps = {
    images_urls: string[],
    video_url: string, 
    edit: boolean,
}

const SwiperItem: React.FC<SwiperProps> = ({ images_urls, video_url, edit }) => {

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

    const [video, setVideo] = useState(false)
    const changeVideoTrue = () => {
        setVideo(true);
    }
    const changeVideoFalse = () => {
        setVideo(false);
    }

    const hiddenStyle = {
        width: 0,
        height: 0,
    }

    const [dragVideo, setDragVideo] = useState(false);
    const [formDataVideo, setFormDataVideo] = useState<FormData>();
    const [videoName, setVideoName] = useState<string>();;
    const [upVid, setUpVid] = useState(false);


    const dragStartHandlerVideo = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragVideo(true);
    }

    const dragLeaveHandlerVideo = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragVideo(false);
    }

    const apiStore = new ApiStore(BASE_URL);
    const onDropHandlerVideo = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let filesVideo = [...e.dataTransfer.files];
        const formData = new FormData();
        formData.append('video', filesVideo[0]);

        async function editProduct() {
            const response = await apiStore.request( {
                method: HTTPMethod.PUT,
                endpoint: '',
                stringify: true,
                headers: {},
                data: {

                },
                withCredentials: 'include',
            }); 
        };
        editProduct();

        setDragVideo(false);
        setFormDataVideo(formData);
        setVideoName(filesVideo[0].name);
        setUpVid(true);
    }

    return (
        <div className='swiper-body'>
            <div className='mini-slider-box'>
                <div className='image-mini-slider swiper-container'>
                    <div className='swiper-button-prev' />
                    <div className='swiper-button-next' />
                    <div className='image-mini-slider__wrapper swiper-wrapper'>
                        {images_urls.map((url) => 
                            <div onClick={changeVideoFalse} key={url} className='image-mini-slider__slide swiper-slide'>
                                <div className='image-mini-slider__image'>
                                    <img src={url} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {video_url? 
                    <>
                        <VideoPlayerMini url = {video_url} />
                        <div onClick={changeVideoTrue} className='mini-slider-box__video' />
                    </>: 
                    edit? 
                    upVid? 
                        <div className={productStyle.video__downloadBox}>Загруженное видео: {videoName} </div>:
                        <div 
                        onDragStart={e => dragStartHandlerVideo(e)}
                        onDragLeave={e => dragLeaveHandlerVideo(e)}
                        onDragOver={e => dragStartHandlerVideo(e)} 
                        onDrop = {e => onDropHandlerVideo(e)}
                        className={productStyle.video__downloadBox}> 
                        {
                            dragVideo?
                            <div 
                            onDragStart={e => dragStartHandlerVideo(e)}
                            onDragLeave={e => dragLeaveHandlerVideo(e)}
                            onDragOver={e => dragStartHandlerVideo(e)}>
                            Отпустите видео, чтобы загрузить</div>:
                            <div>Перетащите видео, чтобы загрузить</div>
                        }
                        </div>
                    :
                    null
                }
            </div>

            { video? <VideoPlayer url = {video_url}/>:null }
            <div style={video? hiddenStyle: undefined} className='image-slider swiper-container'>
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
