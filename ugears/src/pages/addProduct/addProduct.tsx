import { PlusOutlined } from '@ant-design/icons';
import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import { BASE_URL } from '@store/models/baseUrl/baseUrl';
import ProductsListStore from '@store/ProductsListStore';
import { useLocalStore } from '@utils/useLocalStore/useLocalStore';
import { observer } from 'mobx-react-lite';
import { DragEvent, useCallback, useEffect, useState } from 'react';
import productStyle from './addProduct.module.scss'

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const inputTitle = useCallback((e: any) => setTitle(e.target.value), []);
    const [category, setCategory] = useState('');
    const inputCategory = useCallback((e: any) => setCategory(e.target.value), []);
    const [description, setDescription] = useState('');
    const inputDescription = useCallback((e: any) => setDescription(e.target.value), []);
    const [price, setPrice] = useState(0);
    const inputPrice = useCallback((e: any) => setPrice(e.target.value), []);
    const [availability, setAvailability] = useState(true);
    const [numberOfParts, setNumberOfParts] = useState(0);
    const inputNumberOfParts = useCallback((e: any) => setNumberOfParts(e.target.value), []);
    const [size, setSize] = useState('');
    const inputSize = useCallback((e: any) => setSize(e.target.value), []);
    const [assemblyTime, setAssemblyTime] = useState('');
    const inputAssemblyTime = useCallback((e: any) => setAssemblyTime(e.target.value), []);

    const [addImg, setAddImg] = useState(false);
    const [upImg, setUpImg] = useState(false);
    const [addVid, setAddVid] = useState(false);
    const [upVid, setUpVid] = useState(false);

    const addImage = () => {
        setAddImg(true)
    }

    const saveImage = () => {
        setAddImg(false)
    }

    const [dragImg, setDragImg] = useState(false);
    const [formDataImgs, setFormDataImgs] = useState<FormData>();
    const [imgs, setImgs] = useState<string[]>();
   
    const dragStartHandlerImg = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragImg(true);
    }

    const dragLeaveHandlerImg = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragImg(false);
    }

    const onDropHandlerImg = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let filesImg = [...e.dataTransfer.files];
        let i = 1, imgs = [''];
        const formData = new FormData();
        filesImg.map((img) => {
            formData.append(`avatarImage${i}`, img);
            i++;
            imgs.push(img.name);
        })
        formData.append('avatarAmount', String(i-1));
        setDragImg(false);
        setFormDataImgs(formData);
        setImgs(imgs);
        setUpImg(true);
    }


    const addVideo = () => {
        setAddVid(true)
    }

    const saveVideo = () => {
        setAddVid(false)
    }

    const [dragVideo, setDragVideo] = useState(false);
    const [formDataVideo, setFormDataVideo] = useState<FormData>();
    const [video, setVideo] = useState<string>();
   
    const dragStartHandlerVideo = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragVideo(true);
    }

    const dragLeaveHandlerVideo = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragVideo(false);
    }

    const onDropHandlerVideo = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let filesVideo = [...e.dataTransfer.files];
        const formData = new FormData();
        formData.append('avatarVideo', filesVideo[0]);

        setDragVideo(false);
        setFormDataVideo(formData);
        setVideo(filesVideo[0].name);
        setUpVid(true);
    }

    const [save, setSave] = useState(false);

    const apiStore = new ApiStore(BASE_URL);
    const productsStore = useLocalStore(() => new ProductsListStore());
    const [lastID, setLastID] = useState(0);

    useEffect(() => {
        productsStore.getProductsListAll();
    }, [])
    useEffect(() => {
        setLastID(productsStore.list.length)
    }, [productsStore.list])

    const handleClickSave = () => {
        async function postProduct() {
            const response = await apiStore.request( {
                method: HTTPMethod.POST,
                endpoint: 'product',
                stringify: true,
                headers: {},
                data: {
                    "title": title,
                    "price": Number(price),
                    "category": category,
                    'availability': availability,
                    "parts_amount": Number(numberOfParts),
                    "size": size,
                    "assembly_time": Number(assemblyTime),
                    "description": description,
                    "shop_id": 1,
                },
                withCredentials: 'include',
            }); 
        };
        async function dropImage() {
            const response = await apiStore.request( {
                method: HTTPMethod.PUT,
                endpoint: `product/${lastID+1}/avatar`,
                enctype: 'multipart/form-data',
                headers: {},
                data: formDataImgs,
                withCredentials: 'include',
            });
        };
        async function dropVideo() {
            const response = await apiStore.request( {
                method: HTTPMethod.PUT,
                endpoint: `product/${lastID+1}/avatar/video`,
                enctype: 'multipart/form-data',
                headers: {},
                data: formDataVideo,
                withCredentials: 'include',
            });
        };
        postProduct();
        dropImage();
        dropVideo();
        setSave(true);
    };

    return (
        <div className={productStyle.product}>

            <div className={addImg? productStyle.imgActive: productStyle.img}>
                {upImg? 
                    <div className={productStyle.img__downloadBox}>?????????????????????? ??????????????????????: 
                    {imgs?.map((img) => 
                        <div>{img}</div>
                    )}
                    </div>:
                    <div 
                    onDragStart={e => dragStartHandlerImg(e)}
                    onDragLeave={e => dragLeaveHandlerImg(e)}
                    onDragOver={e => dragStartHandlerImg(e)} 
                    onDrop = {e => onDropHandlerImg(e)}
                    className={productStyle.img__downloadBox}> 
                    {
                        dragImg?
                        <div 
                        onDragStart={e => dragStartHandlerImg(e)}
                        onDragLeave={e => dragLeaveHandlerImg(e)}
                        onDragOver={e => dragStartHandlerImg(e)}>
                        ?????????????????? ??????????, ?????????? ??????????????????</div>:
                        <div>???????????????????? ??????????, ?????????? ??????????????????</div>
                    }
                    </div>
                }
                <div className={productStyle.img__button} onClick={saveImage}>??????????????????</div>
            </div>

            <div className={addVid? productStyle.videoActive: productStyle.video}>
                {upVid? 
                    <div className={productStyle.video__downloadBox}>?????????????????????? ??????????: {video} </div>:
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
                        ?????????????????? ????????, ?????????? ??????????????????</div>:
                        <div>???????????????????? ????????, ?????????? ??????????????????</div>
                    }
                    </div>
                }
                <div className={productStyle.img__button} onClick={saveVideo}>??????????????????</div>
            </div>

            <div className={productStyle.product__textLine}>
                <div className={productStyle.product__text}>????????????????:</div>
                <input type='text' className={productStyle.product__input} onChange={inputTitle} />
            </div>

            <div className={productStyle.product__textLine}>
                <div className={productStyle.product__text}>??????????????????:</div>
                <input type='text' className={productStyle.product__input} onChange={inputCategory} />
            </div>

            <div className={productStyle.product__textLine}>
                <div className={productStyle.product__text}>????????????????:</div>
                <textarea className={productStyle.product__textarea} onChange={inputDescription} />
            </div>

            <div className={productStyle.product__textLine}>
                <div className={productStyle.product__text}>????????:</div>
                <input type='text' className={productStyle.product__input} onChange={inputPrice} />
            </div>

            <div className={productStyle.product__textLine}>
                <div className={productStyle.product__text}>?????????? ????????????:</div>
                <input type='text' className={productStyle.product__input} onChange={inputAssemblyTime} />
            </div>

            <div className={productStyle.product__textLine}>
                <div className={productStyle.product__text}>???????????????????? ??????????????:</div>
                <input type='text' className={productStyle.product__input} onChange={inputNumberOfParts} />
            </div>

            <div className={productStyle.product__textLine}>
                <div className={productStyle.product__text}>????????????:</div>
                <input type='text' className={productStyle.product__input} onChange={inputSize} />
            </div>

            <div className={productStyle.product__buttonBox}>
                <div className={productStyle.product__buttonMiniBox}>
                    <div className={productStyle.product__button} onClick={addImage}><PlusOutlined /></div>
                    {upImg? <div className={productStyle.product__buttonText}>?????????????????????? ??????????????????</div>:
                    <div className={productStyle.product__buttonText}>???????????????? ??????????????????????</div>}
                </div>
                
                <div className={productStyle.product__buttonMiniBox}>
                    <div className={productStyle.product__button} onClick={addVideo}><PlusOutlined /></div>
                    {upVid? <div className={productStyle.product__buttonText}>?????????? ????????????????o</div>:
                    <div className={productStyle.product__buttonText}>???????????????? ??????????</div>}
                </div>
            </div>
            
            {
                save? <div className={productStyle.product__textSave}> ?????????????? ????????????????! </div>:
                <div className={productStyle.product__buttonSave} onClick={handleClickSave}>??????????????????</div>
            }    

        </div>
    );
};

export default observer(AddProduct);