import React from 'react';
import imageStyle from './image.module.scss'

type ImageProps = {
    src: string,
    alt: string,
}

const Image: React.FC<ImageProps> = ({src, alt}) => {
    return <img className={imageStyle.image} src={src} alt = {alt}/>;
}

export default React.memo(Image)