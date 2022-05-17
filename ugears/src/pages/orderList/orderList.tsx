import RoleStore from '@store/RoleStore';
import { useLocalStore } from '@utils/useLocalStore/useLocalStore';
import { useEffect, useState } from 'react';
import orderListStyle from './orderList.module.scss'

const OrderList = () => {
    const roleStore = useLocalStore(() => new RoleStore());
    const [admin, setAdmin] = useState(true);
    const [manager, setManager] = useState(false);

    useEffect(() => {
        roleStore.getRole();
        roleStore.roles.map((r) => {
            if(r==="Manager") setManager(true);
            if(r==="Admin") setAdmin(true);
        })
    })

    if (admin) return null;
    if (manager) return null;
    return null;
};

export default OrderList;