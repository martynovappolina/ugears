import { role } from '@store/models/role/role';
import RoleStore from '@store/RoleStore';
import { useLocalStore } from '@utils/useLocalStore/useLocalStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import catalogStyle from './catalog.module.scss';
import Category from "./components/category";


const Catalog = () => {
    const roleStore = useLocalStore(() => new RoleStore());
    const [admin, setAdmin] = useState(false);
    const [manager, setManager] = useState(false);

    useEffect(() => {
        roleStore.getRole();
    }, []) 

    useEffect(() => {
      roleStore.roles.map((r) => {
        if(r===role.manager) setManager(true);
        if(r===role.admin) setAdmin(true);
    })
    }, [roleStore.roles])

    return(
        <>
            {(admin || manager)? 
              <NavLink className={catalogStyle.catalog__button} style={{ textDecoration: 'none', color: 'white' }} to={'/addproduct'}> 
                  Добавить продукт
              </NavLink>: 
            null}
            <div className={catalogStyle.catalog}>
              <Category category="Механизмы" i={0} totalCount={6}/>
            </div>
            <div className={catalogStyle.catalog}>
              <Category category="Машины" i={1} totalCount={6}/>
            </div>
            {/* <div className={catalogStyle.catalog}>
              <Category category="Поезда" i={2} totalCount={4}/>
            </div> */}
        </>       
    )
}

export default observer(Catalog);
