import { OrderModel } from "@store/models/Orders";
import orderStyle from './order.module.scss'

type OrderProps = {
    order: OrderModel;
}

const Order: React.FC<OrderProps> = ({ order }) => {
    return (
        <div className={orderStyle.order__main}>
            <div className={orderStyle.order__info}>
                <div>Заказ №{order.id}</div>
                <div>{order.createdAt}</div>
                <div>{order.totalPrice}p.</div>
                {}
            </div>
            <div className={orderStyle.order__imgs}>
                {
                    order.items.map((item) => <>
                        <img key={item.Product.id} className={orderStyle.order__img} src={item.Product.imagesUrls[0]} />
                        </>)
                }
            </div>
        </div>
    )
};

export default Order;