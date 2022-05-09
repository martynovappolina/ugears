import catalogStyle from './catalog.module.scss';
import Category from "./components/category";


const Catalog = () => {
    
    return(
        <>
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
