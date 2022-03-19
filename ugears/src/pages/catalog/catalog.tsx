import Error from "@components/Error";
import Loading from "@components/Loading";
import ProductsListStore from "@store/ProductsListStore";
import { Meta } from "@utils/meta";
import { observer, useLocalStore } from "mobx-react-lite";
import React, { useEffect } from "react";

import catalogStyle from './catalog.module.scss';
import Category from "./components/category";

const ProductsContext = React.createContext({
  productsListStore: {} as ProductsListStore,
});
const Provider = ProductsContext.Provider;
export const useProductsContext = () => React.useContext(ProductsContext);

const Catalog = () => {
    const productsListStore = useLocalStore (() => new ProductsListStore());

    useEffect(() => {productsListStore.getProductsList()}, []) 
    
    return(
      <Provider value={{ productsListStore }}>
        {
          productsListStore.list.map((el) => <div key={el.id}></div>)
        }
        {productsListStore.meta === Meta.error && <Error />}
        {productsListStore.meta === Meta.loading && <Loading />}
        {productsListStore.meta == Meta.success && 
        <>
            <div className={catalogStyle.catalog}>
              <Category category="Механизмы"/>
            </div>
            <div className={catalogStyle.catalog}>
              <Category category="Машины"/>
            </div>
            <div className={catalogStyle.catalog}>
              <Category category="Поезда"/>
            </div>
        </>
        }

        
      </Provider>
    )
}

export default observer(Catalog);
