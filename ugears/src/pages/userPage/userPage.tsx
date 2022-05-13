import UserImage from './components/Image/image';
import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import { UserEdit, UserModel } from '@store/models/Users';
import { useCallback, useEffect, useState } from 'react';
import userPageStyle from './userPage.module.scss'
import { BASE_URL } from '@store/models/baseUrl/baseUrl';
import { useLocalStore } from '@utils/useLocalStore/useLocalStore';
import OrdersStore from '@store/OrdersStore';
import Order from './components/order';

type UserPageProps = {
    user: UserModel;
    handleClickExit: ()=>void;
}

const UserPage: React.FC<UserPageProps> = ({ user, handleClickExit }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);

    const [edit, setEdit] = useState(false);

    const [orders, setOrders] = useState(false);

    const handleClickEdit = () => {
        setEdit(true);
    };

    const inputFirstName = useCallback((e: any) => setFirstName(e.target.value), []);
    const inputLastName = useCallback((e: any) => setLastName(e.target.value), []);
    const inputEmail = useCallback((e: any) => setEmail(e.target.value), []);

    const apiStore = new ApiStore(BASE_URL);
    const ordersStore = useLocalStore(() => new OrdersStore());

    const handleClickSave = () => {
        async function editUser() {
            const response = await apiStore.request<UserEdit>( {
                method: HTTPMethod.PUT,
                endpoint: 'profile/edit',
                headers: {},
                data: {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email, 
                },
                withCredentials: 'include',
            }); 
        };
        editUser();
        setEdit(false);
    };

    useEffect(()=>{
        ordersStore.getOrdersList();
        setOrders(true);
    }, [])

    return (
        <div className={userPageStyle.userPage}>
            <UserImage />
            <div className={userPageStyle.userPage__Info}>
                <div className={userPageStyle.userPage__Str}>
                    <div className={userPageStyle.userPage__Str__GrayText}>Имя:&nbsp;</div>
                    {
                        edit?<input type='text' placeholder={user.firstName} onChange={inputFirstName} />:
                        <div className={userPageStyle.userPage__Str__Text}>{user.firstName}</div>
                    }
                </div>
                <div className={userPageStyle.userPage__Str}>
                    <div className={userPageStyle.userPage__Str__GrayText}>Фамилия:&nbsp;</div>
                    {
                        edit?<input type='text' placeholder={user.lastName} onChange={inputLastName} />:
                        <div className={userPageStyle.userPage__Str__Text}>{user.lastName}</div>
                    }
                </div>
                <div className={userPageStyle.userPage__Str}>
                    <div className={userPageStyle.userPage__Str__GrayText}>Логин:&nbsp;</div>
                    <div className={userPageStyle.userPage__Str__Text}>{user.username}</div>
                </div>
                <div className={userPageStyle.userPage__Str}>
                    <div className={userPageStyle.userPage__Str__GrayText}>Электронная почта:&nbsp;</div>
                    {
                        edit?<input type='text' placeholder={user.email} onChange={inputEmail} />:
                        <div className={userPageStyle.userPage__Str__Text}>{user.email}</div>
                    }
                </div>
                {
                    edit?
                    <><div className={userPageStyle.userPage__Button} onClick={handleClickSave}>Сохранить изменения</div>
                    <div className={userPageStyle.userPage__MiniText}>(Для того, чтобы увидеть изменения, обновите страницу.)</div> </>:
                    <div className={userPageStyle.userPage__Button} onClick={handleClickEdit}>Редактировать профиль</div>
                }
                <div className={userPageStyle.userPage__Button} onClick={handleClickExit}>Выйти</div>
                <div className={userPageStyle.userPage__BoldText}>Заказы:</div>
                {orders? ordersStore.list.map((el)=><Order order={el}/>) :
                    <div className={userPageStyle.userPage__Text}>У Вас пока нет ни одного заказа, надо это исправить!</div>}
            </div>
        </div>
    )
};

export default UserPage;
