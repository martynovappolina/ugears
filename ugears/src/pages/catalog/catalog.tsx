import catalogStyle from './catalog.module.scss';
import Category from "./components/category";


const Catalog = () => {
    
    return(
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
    )
}

export default Catalog;
