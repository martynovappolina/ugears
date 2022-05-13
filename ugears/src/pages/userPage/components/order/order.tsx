import { OrderModel } from "@store/models/Orders";
import orderStyle from './order.module.scss'

type OrderProps = {
    order: OrderModel;
}

const Order: React.FC<OrderProps> = ({ order }) => {

    return (
        <div className={orderStyle.order__main}>
            {
                order.items.map((item) => {
                    <img className={orderStyle.order__img} src={item.Product.imagesUrls[0]} />
                })
            }
        </div>
    );
};

export default Order;