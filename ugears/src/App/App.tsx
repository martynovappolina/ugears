import Catalog from "@pages/catalog";
import Product from "@pages/product";
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import appStyle from './App.module.scss'
import Header from "./components/header";
import { useLocalStore } from "mobx-react-lite";
import React, { useRef } from "react";
import Authorization from "@pages/authorization";
import UserStore from "@store/UserStore";
import Gears from "./components/gears";
import Cart from "@pages/cart";


const UserContext = React.createContext({
  userStore: {} as UserStore,
});
const Provider = UserContext.Provider;
export const useUserContext = () => React.useContext(UserContext);

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
      <Gears refArrayP={refArrayP} refArrayM={refArrayM}/>
      <Provider value={{ userStore }}>
        <BrowserRouter>
          <Header />
          <Route path="/products" component={Catalog} />
          <Route path="/product/:id" component={Product} />
          <Route path="/autho" component={Authorization} />
          <Route path="/cart" component={Cart} />
          <Redirect to="/products"/>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
