import Catalog from "@pages/catalog";
import Product from "@pages/product";
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import appStyle from './App.module.scss'
import Header from "./components/header";
import { useLocalStore } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import Authorization from "@pages/authorization";
import UserStore from "@store/UserStore";
import Gears from "./components/gears";
import Cart from "@pages/cart";
import CartStore from "@store/CartStore/CartStore";
import ApiStore from "@shared/store/ApiStore";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { BASE_URL } from "@store/models/baseUrl/baseUrl";
import AddProduct from "@pages/addProduct";
import orderList from "@pages/orderList";
import Ask from "./components/header/components/ask/ask";
import Favorites from "@pages/favorites";


const context = React.createContext({
  cartStore: {} as CartStore,
  userStore: {} as UserStore,
});
const Provider = context.Provider;
export const useUgearsContext = () => React.useContext(context);

const App = () => {
  const scrollRefP1 = useRef<null | HTMLSpanElement>(null);
  const scrollRefM1 = useRef<null | HTMLSpanElement>(null);
  const scrollRefP2 = useRef<null | HTMLSpanElement>(null);
  const scrollRefM2 = useRef<null | HTMLSpanElement>(null);
  const scrollRefP3 = useRef<null | HTMLSpanElement>(null);
  const scrollRefM3 = useRef<null | HTMLSpanElement>(null);
  const scrollRefP4 = useRef<null | HTMLSpanElement>(null);
  const scrollRefM4 = useRef<null | HTMLSpanElement>(null);
  const scrollRefP5 = useRef<null | HTMLSpanElement>(null);
  const scrollRefM5 = useRef<null | HTMLSpanElement>(null);
  const scrollRefP6 = useRef<null | HTMLSpanElement>(null);
  const scrollRefM6 = useRef<null | HTMLSpanElement>(null);
  const scrollRefP7 = useRef<null | HTMLSpanElement>(null);
  const scrollRefM7 = useRef<null | HTMLSpanElement>(null);

  const refArrayP = [scrollRefP1, scrollRefP2, scrollRefP3, scrollRefP4, scrollRefP5, scrollRefP6, scrollRefP7];
  const refArrayM = [scrollRefM1, scrollRefM2, scrollRefM3, scrollRefM4, scrollRefM5, scrollRefM6, scrollRefM7];
  const userStore = useLocalStore(() => new UserStore());
  const cartStore = useLocalStore(() => new CartStore());
  const [autho, setAutho] = useState(false);
  const apiStore = new ApiStore(BASE_URL);

  async function getCheckUser() {
    const response = await apiStore.request( {
        method: HTTPMethod.GET,
        headers: {},
        endpoint: 'auth/check',
        data: {},
        withCredentials: 'include',
    }); 
    
    if (response.success) {
        userStore.getProfileUser();
        setAutho(true);
    }
    else setAutho(false);
  };

  useEffect(() => {
      getCheckUser();
      cartStore.getCart();
  }, [])

  const rotate = () => {
    refArrayP.map((ref) => {
      if(ref.current !== null) ref.current.style.transform = `rotate(${window.scrollY/15}deg)`;
    });
    refArrayM.map((ref) => {
      if(ref.current !== null) ref.current.style.transform = `rotate(${-window.scrollY/15}deg)`;
    });
  }

  return (
    <div className={appStyle.body} onWheel={rotate}>
      {/* {autho? <div></div>: <div className={appStyle.autho}>??????????????????????????????, ?????????? ?????????????????? ??????????????????</div>} */}
      <Gears refArrayP={refArrayP} refArrayM={refArrayM}/>
      <Provider value={{ cartStore, userStore }}>
        <BrowserRouter>
          <Header />
          <Route path="/products" component={Catalog} />
          <Route path="/product/:id" component={Product} />
          <Route path="/autho" component={Authorization} />
          <Route path="/cart" component={Cart} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/orders" component={orderList} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/ask" component={Ask} />
          <Redirect to="/products"/>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
