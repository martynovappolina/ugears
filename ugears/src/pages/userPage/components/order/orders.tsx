import OrdersStore from "@store/OrdersStore";
import { useLocalStore } from "@utils/useLocalStore/useLocalStore";
import { useEffect } from "react";
import Order from "./order";
import userPageStyle from '../../userPage.module.scss'

type OrdersProps = {
    flag: boolean;
}

const Orders: React.FC<OrdersProps> = ({ flag }) => {
    const ordersStore = useLocalStore(() => new OrdersStore());

    useEffect(()=>{
        ordersStore.getOrdersList();
    }, [])

    if(flag) return(<>
    {ordersStore.list.length!==0 && ordersStore.list.map((el)=><Order order={el}/>)}
    {ordersStore.list.length===0 && <div className={userPageStyle.userPage__Text}>У Вас пока нет ни одного заказа, надо это исправить!</div>}
    </>)

    return null;
};

export default Orders;