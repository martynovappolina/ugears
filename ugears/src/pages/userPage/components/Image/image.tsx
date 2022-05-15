import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import { BASE_URL } from '@store/models/baseUrl/baseUrl';
import React, { DragEvent, useEffect, useMemo, useState } from 'react';
import imageStyle from './image.module.scss'

type UserImageProps = {
    avatar: string;
}

const UserImage: React.FC<UserImageProps> = ({ avatar }) => {

    const [drag, setDrag] = useState(false);
    const [update, setUpdate] = useState(false);
   
    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    }

    const apiStore = new ApiStore(BASE_URL);

    const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let files = [...e.dataTransfer.files];
        const formData = new FormData();
        formData.append('avatarImage', files[0]);

        async function dropImage() {
            const response = await apiStore.request<FormData>( {
                method: HTTPMethod.PUT,
                endpoint: 'profile/avatar',
                enctype: 'multipart/form-data',
                headers: {},
                data: formData,
                withCredentials: 'include',
            });
        };
        dropImage();
        setDrag(false);
        setUpdate(true);
    }
    
     if(avatar === 'https://storage.yandexcloud.net/gears4us/some_default_path')
    return (<>
    {
         update?
         <div className={imageStyle.ImageDownload}>Обновите страницу, чтобы увидеть изменения</div>:
        <div
        onDragStart={e => dragStartHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e => dragStartHandler(e)} 
        onDrop = {e => onDropHandler(e)}
        className={imageStyle.ImageDownload}>Место для Вашей фотографии<br/> 
        {
            drag?
            <div 
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            className={imageStyle.Image__Link}>Отпустите файл, чтобы загрузить</div>:
            <div className={imageStyle.Image__Link}>Перетащите файл, чтобы загрузить</div>
        }
        </div>}
    </>)
    return (
        <img className={imageStyle.Image} src={avatar} />
    )
};

export default React.memo(UserImage);
