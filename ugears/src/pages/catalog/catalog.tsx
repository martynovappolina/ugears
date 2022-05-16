import { NavLink } from 'react-router-dom';
import catalogStyle from './catalog.module.scss';
import Category from "./components/category";


const Catalog = () => {
    const admin = true;  

    return(
        <>
            {admin? 
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

export default Catalog;
