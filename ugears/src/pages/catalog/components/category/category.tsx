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
}

const Category: React.FC<CategoryProps> = ({category}) => {
    const productsListStore = useLocalObservable(() => new ProductsListStore());
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [fetching, setFetching] = useState(false);

    const scrollHandler = () => {
        let sH = document.querySelector(`.${categoryStyle.category}`)?.scrollHeight;
        let cH = document.querySelector(`.${categoryStyle.category}`)?.clientHeight;
        let sT = document.querySelector(`.${categoryStyle.category}`)?.scrollTop;
        let sum: number;

        if(sH !== undefined && cH!== undefined && sT!==undefined) {
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
        if(productsListStore.meta === 'success') setProducts([...products, ...productsListStore.list]);
    }, [productsListStore.list])
    
    return(<>
        {productsListStore.meta === Meta.error && <Error />}
        {productsListStore.meta === Meta.loading && <Loading />}
        {productsListStore.meta == Meta.success && 
        <div className={categoryStyle.category} onScroll={scrollHandler}> 
            <div className={categoryStyle.category__title}>{category}</div>
            {products.map((product) => <div key={product.id}><ProductItem product={product} /></div>)}
        </div>}
    </>)
};

export default observer(Category);
