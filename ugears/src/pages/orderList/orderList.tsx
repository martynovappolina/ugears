import { CheckOutlined } from '@ant-design/icons';
import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import { BASE_URL } from '@store/models/baseUrl/baseUrl';
import { role } from '@store/models/role/role';
import OrdersFullStore from '@store/OrdersFullStore';
import RoleStore from '@store/RoleStore';
import UserStore from '@store/UserStore';
import { useLocalStore } from '@utils/useLocalStore/useLocalStore';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import orderListStyle from './orderList.module.scss'

const OrderList = () => {
    const roleStore = useLocalStore(() => new RoleStore());
    const userStore = useLocalStore(() => new UserStore())
    const ordersStore = useLocalStore(() => new OrdersFullStore())
    const [admin, setAdmin] = useState(false);
    const [manager, setManager] = useState(false);

    useEffect(() => {
        roleStore.getRole();
        ordersStore.getOrdersList();
    }, []) 

    useEffect(() => {
      roleStore.roles.map((r) => {
        if(r===role.admin) setAdmin(true);
        if(r===role.manager) setManager(true);
    })
    }, [roleStore.roles])
    
    const apiStore = new ApiStore(BASE_URL);
    const [email, setEmail] = useState('');

    const getEmail = useCallback((id) => {
        async function getUser() {
            const response = await apiStore.request( {
                method: HTTPMethod.GET,
                endpoint:  `profile/${id}`,
                headers: {},
                data: {},
                withCredentials: 'include',
            }); 
            if (response.success) {
                setEmail(response.data.email);
            }
        };
        getUser();
        return(email);
    }, [ordersStore.list])


    if (admin || manager) return (<>
        <div className={orderListStyle.order__table}>
            <div className={orderListStyle.order__item} style={{ fontWeight: '700' }}>№ Заказа</div>
            <div className={orderListStyle.order__item} style={{ fontWeight: '700' }}>ID пользователя</div>
            <div className={orderListStyle.order__item} style={{ fontWeight: '700' }}>email</div>
            <div className={orderListStyle.order__item} style={{ fontWeight: '700' }}>Товары</div>
            <div className={orderListStyle.order__item} style={{ fontWeight: '700' }}>Создан</div>
            <div className={orderListStyle.order__item} style={{ fontWeight: '700' }}>Стоимость</div>
            <div className={orderListStyle.order__item} style={{ fontWeight: '700' }}>Адрес доставки</div>
            <div className={orderListStyle.order__item} style={{ fontWeight: '700' }}>Способ оплаты</div>
            <div className={orderListStyle.order__item} style={{ fontWeight: '700' }}>Звонок менеджера</div>

            {
                ordersStore.list.map((order) => 
                    <div>
                        <div className={orderListStyle.order__item}>{order.id}</div>
                        <div className={orderListStyle.order__item}>{order.userId}</div>
                        <div className={orderListStyle.order__item}>{getEmail(order.userId)}</div>
                        <div className={orderListStyle.order__item}></div>
                        <div className={orderListStyle.order__items}>
                            {
                                order.items.map((item) => <>
                                    <div className={orderListStyle.order__item}>{item.Product.title}</div>
                                    <div className={orderListStyle.order__item}>{item.Quantity}</div>
                                </>)
                            }
                        </div>
                        <div className={orderListStyle.order__item}>{order.createdAt}</div>
                        <div className={orderListStyle.order__item}>{order.totalPrice}</div>
                        <div className={orderListStyle.order__item}>{order.deliveryAddress}</div>
                        <div className={orderListStyle.order__item}>{order.paymentMethod}</div>
                        <div className={orderListStyle.order__item}>
                            {
                                order.callNeeded? <CheckOutlined />: null
                            }
                        </div>
                    </div>
                )
            }


        </div>
        </>);

    return null;
};

export default observer(OrderList);