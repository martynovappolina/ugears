import { observer } from "mobx-react-lite";
import ProductItem from "@pages/catalog/components/productItem";
import favoritesStyle from "./favorites.module.scss";
import { useEffect, useState } from "react";
import ApiStore from "@shared/store/ApiStore";
import { BASE_URL } from "@store/models/baseUrl/baseUrl";
import { useLocalStore } from "@utils/useLocalStore/useLocalStore";
import RoleStore from "@store/RoleStore";
import ProductStore from "@store/ProductStore";

const Favorites = () => {
    const apiStore = new ApiStore(BASE_URL);
    const roleStore = useLocalStore(() => new RoleStore());
    const productStore = useLocalStore(() => new ProductStore());
    const [admin, setAdmin] = useState(false);
    const [manager, setManager] = useState(false);

    useEffect(() => {
        roleStore.getRole();
        productStore.getProduct({id: String(6)});
    }, []) 

    useEffect(() => {
      roleStore.roles.map((r) => {
        if(r==='Manager') setManager(true);
        if(r==='Admin') setAdmin(true);
    })
    }, [roleStore.roles])
    

    return <div>Здесь пока ничего нет(</div>;

    // return (
    //     <div className={favoritesStyle.fav}>
    //         <ProductItem product={productStore.product}/>
    //     </div>
    // )
};

export default observer(Favorites)
