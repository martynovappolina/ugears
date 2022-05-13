import Error from '@components/Error';
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
    const [currentPage, setCurrentPage] = useState(0);
    const [fetching, setFetching] = useState(false);
    const[sT, setST] = useState(0);

    const scrollHandler = () => {
        let sH = document.querySelectorAll(`.${categoryStyle.category}`)[i]?.scrollHeight;
        let cH = document.querySelectorAll(`.${categoryStyle.category}`)[i]?.clientHeight;
        setST(document.querySelectorAll(`.${categoryStyle.category}`)[i]?.scrollTop);
        let sum: number;

        if(sH !== undefined && cH!== undefined && sT!==undefined && productsListStore.list.length > 0) {
            sum = sH - (cH + sT)
            if(sum < 30) setFetching(true);
        }
    }

    useEffect(() => {  
        productsListStore.getProductsList({category: category, page: currentPage});
        setCurrentPage(p => p+1);
        setFetching(false);
    }, [fetching]);

    useEffect(() => {
        if(productsListStore.meta === 'success' && productsListStore.list.length > 0) {
            setProducts([...products, ...productsListStore.list]);
        }  
    }, [productsListStore.list])


    return(<>
        {productsListStore.meta === Meta.error && <Error />}
        {productsListStore.meta == Meta.success && 
        <div className={categoryStyle.category} onScroll={scrollHandler}> 
            <div className={categoryStyle.category__title}>{category}</div>
            {products.map((product) => <div key={product.id}><ProductItem product={product} /></div>)}
        </div>}
    </>)
};

export default observer(Category);
