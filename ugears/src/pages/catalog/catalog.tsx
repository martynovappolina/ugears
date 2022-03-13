import ProductsListStore from "@store/ProductsListStore";
import { observer, useLocalStore } from "mobx-react-lite";
import React, { useCallback, useEffect } from "react";

import catalogStyle from './catalog.module.scss';
import Category from "./components/category";

const ProductsContext = React.createContext({
  productsListStore: {} as ProductsListStore,
});
const Provider = ProductsContext.Provider;
export const useProductsContext = () => React.useContext(ProductsContext);

const Catalog = () => {
    const productsListStore = useLocalStore (() => new ProductsListStore());

    const getProducts = useCallback(() => {   
        const getData = async () => {
            try {
              await productsListStore.getProductsList()
            } catch (err) {}
          };
        getData();         
    }, [productsListStore]);
    
    useEffect(() => getProducts(), []) 
    
    return(
      <Provider value={{ productsListStore }}>
        {
          productsListStore.list.map((el) => <div key={el.id}></div>)
        }
        <div className={catalogStyle.catalog}>
          <Category category="Механизмы"/>
          <Category category="Машины"/>
          <Category category="Поезда"/>
        </div>
      </Provider>
    )
}

export default observer(Catalog);
