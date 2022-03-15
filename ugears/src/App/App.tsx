import Catalog from "../pages/catalog";
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import appStyle from './App.module.scss'
import Header from "./components/header";
import { observer, useLocalStore } from "mobx-react-lite";
import React, { useCallback, useEffect } from "react";
import UsersStore from "@store/UsersStore";
import Authorization from "@pages/authorization";

const UsersContext = React.createContext({
  usersStore: {} as UsersStore,
});
const Provider = UsersContext.Provider;
export const useUsersContext = () => React.useContext(UsersContext);

const App = () => {
  const usersStore = useLocalStore (() => new UsersStore());

  const getUsers = useCallback(() => {   
      const getData = async () => {
          try {
            await usersStore.getUsers()
            console.log(usersStore.list)
          } catch (err) {}
        };
      getData();         
  }, []);
  
  useEffect(() => getUsers(), []) 
  
  return (
    <div className={appStyle.body}>
        <Provider value={{ usersStore }}>
          <BrowserRouter>
            <Header />
            <Route path="/catalog" component={Catalog} />
            <Route path="/autho" component={Authorization} />
            <Redirect to="/" />
          </BrowserRouter>
        </Provider>
    </div>
  );
}

export default observer(App);
