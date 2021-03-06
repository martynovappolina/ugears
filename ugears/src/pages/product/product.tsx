import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import CartBox from '@pages/product/components/cartBox';
import Rating from '@components/rating';
import ProductStore from '@store/ProductStore';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SwiperItem from './components/swiper';
import productStyle from './product.module.scss'
import Reviews from './components/reviews';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import ApiStore from '@shared/store/ApiStore';
import { BASE_URL } from '@store/models/baseUrl/baseUrl';
import RoleStore from '@store/RoleStore';

const Product = () => {
    const { id } = useParams<{id: string}>();
    
    const roleStore = useLocalStore(() => new RoleStore());
    const [admin, setAdmin] = useState(false);
    const [manager, setManager] = useState(false);

    useEffect(() => {
        roleStore.getRole();
    }, []) 

    useEffect(() => {
      roleStore.roles.map((r) => {
        if(r==='Manager') setManager(true);
        if(r==='Admin') setAdmin(true);
    })
    }, [roleStore.roles])

    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);

    const handleClickEdit = () => {
        setEdit(true);
    };
    
    const [fullDescription, setFullDescription] = useState(false);

    const productStore = useLocalStore(() => new ProductStore());
    const [title, setTitle] = useState(productStore.product.title);
    const inputTitle = useCallback((e: any) => setTitle(e.target.value), []);
    const [price, setPrice] = useState(productStore.product.price);
    const inputPrice = useCallback((e: any) => setPrice(e.target.value), []);
    const [numberOfParts, setNumberOfParts] = useState(productStore.product.numberOfParts);
    const inputNumberOfParts = useCallback((e: any) => setNumberOfParts(e.target.value), []);
    const [size, setSize] = useState(productStore.product.size);
    const inputSize = useCallback((e: any) => setSize(e.target.value), []);
    const [assemblyTime, setAssemblyTime] = useState(0);
    const inputAssemblyTime = useCallback((e: any) => setAssemblyTime(Number(e.target.value)), []);
    const [description, setDescription] = useState(productStore.product.description);
    const inputDescription = useCallback((e: any) => setDescription(e.target.value), []);


    const apiStore = new ApiStore(BASE_URL);
    const handleClickRemove = () => {
        async function remove() {
            const response = await apiStore.request({
                method: HTTPMethod.POST,
                endpoint: `${productStore.product.id}`,
                headers: {},
                data: {},
                withCredentials: 'include',
            });  
        };

        remove();
        setRemove(true);
    }
    
    const handleClickSave = () => {
        async function editProduct() {
            const response = await apiStore.request( {
                method: HTTPMethod.PUT,
                endpoint: `product/${id}`,
                stringify: true,
                headers: {},
                data: {
                    "title": title,
                    "price": price,
                    "parts_amount": numberOfParts,
                    "availability": true,
                    "size": size,
                    "assembly_time": assemblyTime,
                    "description": description,
                },
                withCredentials: 'include',
            }); 
        };

        editProduct();
        setEdit(false);
    };
    
    useEffect(() => {
        productStore.getProduct({id: id})
    }, []); 

    const changeDescription = () => {
        setFullDescription(!fullDescription);
    }

    if(productStore.product) return (<>
        <div className={productStyle.product}>
            {
                (productStore.product.id > 9)?
                <SwiperItem main_url='https://storage.yandexcloud.net/gears4us/' images_urls={productStore.product.imagesUrls} video_url={productStore.product.videoUrl} edit={edit} id={productStore.product.id}/>:
                <SwiperItem main_url='' images_urls={productStore.product.imagesUrls} video_url={productStore.product.videoUrl} edit={edit} id={productStore.product.id}/>
            }
             
            <div className={productStyle.product__Info}>
                {edit?<input type='text' placeholder={productStore.product.title} onChange={inputTitle} />: 
                <div className={productStyle.product__Title}>{productStore.product.title}</div>}
                <div className={productStyle.product__SmallText}>??????????????: {productStore.product.id}</div>
                <Rating stars={productStore.product.rating} />
                {edit?<input type='text' placeholder={String(productStore.product.price)} onChange={inputPrice} />:
                <div className={productStyle.product__Price}>{productStore.product.price}??????.</div>}
                
                {edit?<input type='text' placeholder={String(productStore.product.numberOfParts)} onChange={inputNumberOfParts} />:
                <div className={productStyle.product__TextBox}>???????????????????? ??????????????:&nbsp; <div className={productStyle.product__Text}>{productStore.product.numberOfParts}</div></div>}
                
                {edit?<input type='text' placeholder={productStore.product.size} onChange={inputSize} />:
                <div className={productStyle.product__TextBox}>????????????:&nbsp; <div className={productStyle.product__Text}>{productStore.product.size}</div></div>}
                
                {edit?<input type='text' placeholder='???????????????????? ??????????' onChange={inputAssemblyTime} />:
                <div className={productStyle.product__TextBox}>?????????? ????????????:&nbsp; <div className={productStyle.product__Text}>{productStore.product.assemblyTime}</div></div>}

                {edit?<textarea className={productStyle.edit__textarea} placeholder={productStore.product.description} onChange={inputDescription} />:
                <div className={fullDescription? productStyle.product__DescriptionActive: productStyle.product__Description}>
                    <div className={productStyle.product__Description__Button} onClick={changeDescription}>????????????????: {
                        fullDescription? <CaretUpOutlined />: <CaretDownOutlined /> 
                    }</div>
                    {productStore.product.description}
                </div>}
                {   edit? <>
                    ?????????? ?????????????? ??????????????????, ???????????????? ???????????????? 
                    <div className={productStyle.edit__buttonSave} onClick={handleClickSave} >?????????????????? ??????????????????</div></>:
                    <CartBox availability={productStore.product.availability} cartActive={false} favouriteActive={false} id={id} />}
            </div>      
        </div>

        {
            (admin || manager)? edit? null:
                <div className={productStyle.edit__buttonBox}>
                    <div className={productStyle.edit__button} onClick={handleClickEdit}>??????????????????????????</div>
                    {remove? <div>?????????????? ????????????!</div>: <div className={productStyle.edit__button} onClick={handleClickRemove}>?????????????? ??????????????</div>}
                </div>
                : null
        }

        <Reviews />
    </>)
    return null;
}

export default observer(Product);
