import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import { DropImageProps } from '@store/models/Users';
import { DragEvent, useState } from 'react';
import imageStyle from './image.module.scss'

const UserImage = () => {

    const [drag, setDrag] = useState(false);

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    }

    const apiStore = new ApiStore('http://localhost:8080/api/');

    const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let files = [...e.dataTransfer.files];
        const formData = new FormData();
        formData.append('file', files[0]);

        async function dropImage() {
            const response = await apiStore.request<DropImageProps>( {
                method: HTTPMethod.POST,
                endpoint: '',
                headers: {},
                data: {
                     formData: formData,
                },
                withCredentials: 'include',
            }); 
        };
        dropImage();
        setDrag(false);
    }

    return (<>
        <div
        onDragStart={e => dragStartHandler(e)}
        onDragLeave={e => dragLeaveHandler(e)}
        onDragOver={e => dragStartHandler(e)} 
        onDrop = {e => onDropHandler(e)}
        className={imageStyle.Image}>Место для Вашей фотографии<br/> 
        {
            drag?
            <div 
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            className={imageStyle.Image__Link}>Отпустите файл, чтобы загрузить</div>:
            <div className={imageStyle.Image__Link}>Перетащите файл, чтобы загрузить</div>
        }
        </div>
    </>)
};

export default UserImage;