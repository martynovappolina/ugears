import Error from '@components/Error';
import Loading from '@components/Loading';
import { ProductModel } from '@store/models/Products';
import ProductsListStore from '@store/ProductsListStore';
import { Meta } from '@utils/meta';
import { observer, useLocalObservable } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import ProductItem from '../productItem';
import categoryStyle from './category.module.scss'

type CategoryProps = {
    category: string;
    i: number;
    totalCount: number;
}

const Category: React.FC<CategoryProps> = ({category, i, totalCount}) => {
    const productsListStore = useLocalObservable(() => new ProductsListStore());
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(false);
    const[sT, setST] = useState(0);

    const scrollHandler = () => {
        let sH = document.querySelectorAll(`.${categoryStyle.category}`)[i]?.scrollHeight;
        let cH = document.querySelectorAll(`.${categoryStyle.category}`)[i]?.clientHeight;
        setST(document.querySelectorAll(`.${categoryStyle.category}`)[i]?.scrollTop);
        let sum: number;

        if(sH !== undefined && cH!== undefined && sT!==undefined && (products.length < totalCount)) {
            sum = sH - (cH + sT)
            if(sum < 30) setFetching(true);
        }
    }

    useEffect(() => {
        setCurrentPage(p => p+1);
        productsListStore.getProductsList({category: category, page: currentPage});
        setFetching(false);
    }, [fetching]);

    useEffect(() => {
        if(productsListStore.meta === 'success') {
            setProducts([...products, ...productsListStore.list]);
            document.querySelectorAll(`.${categoryStyle.category}`)[i].scrollTop = sT;
        }
         
    }, [productsListStore.list])
    
    return(<>
        {productsListStore.meta === Meta.error && <Error />}
        {/* {productsListStore.meta === Meta.loading && <Loading />} */}
        {productsListStore.meta == Meta.success && 
        <div className={categoryStyle.category} onScroll={scrollHandler}> 
            <div className={categoryStyle.category__title}>{category}</div>
            {products.map((product) => <div key={product.id}><ProductItem product={product} /></div>)}
        </div>}
    </>)
};

export default observer(Category);
