import { useProductsContext } from '@pages/catalog/catalog';
import React from 'react';
import ProductItem from '../productItem';
import categoryStyle from './category.module.scss'

type CategoryProps = {
    category: string;
}

const Category: React.FC<CategoryProps> = ({category}) => {
    const Context = useProductsContext();

    return(
        <div className={categoryStyle.category}> 
            <div className={categoryStyle.category__title}>{category}</div>
            {
                Context.productsListStore.list.filter((product) => product.category === category)
                .map((product) => <div key={product.id}><ProductItem product={product} /></div>)
            }
        </div>
    )
};

export default React.memo(Category);
