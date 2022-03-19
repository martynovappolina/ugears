import Catalog from "@pages/catalog";
import Product from "@pages/product";
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import appStyle from './App.module.scss'
import Header from "./components/header";
import { useLocalStore } from "mobx-react-lite";
import React from "react";
import Authorization from "@pages/authorization";
import UserStore from "@store/UserStore";


const UserContext = React.createContext({
  userStore: {} as UserStore,
});
const Provider = UserContext.Provider;
export const useUserContext = () => React.useContext(UserContext);

const App = () => {

  const userStore = useLocalStore(() => new UserStore());
  
  return (
    <div className={appStyle.body}>
        <Provider value={{ userStore }}>
          <BrowserRouter>
            <Header />
            <Route path="/products" component={Catalog} />
            <Route path="/product/:id" component={Product} />
            <Route path="/autho" component={Authorization} />
            <Redirect to="/"/>
          </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
