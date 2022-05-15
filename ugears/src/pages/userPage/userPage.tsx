import UserImage from './components/Image/image';
import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import { UserEdit, UserModel } from '@store/models/Users';
import { useCallback, useState } from 'react';
import userPageStyle from './userPage.module.scss'
import { BASE_URL } from '@store/models/baseUrl/baseUrl';
import Orders from './components/order/orders'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

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

    const handleGetOrders = () => {
        setOrders(!orders)
    }

    return (
        <div className={userPageStyle.userPage}>
            <UserImage />
            <div className={userPageStyle.userPage__Info}>
                <div className={userPageStyle.userPage__Str}>
                    <div className={userPageStyle.userPage__Str__GrayText}>Имя:&nbsp;</div>
                    {
                        edit?<input type='text' placeholder={user.firstName} onChange={inputFirstName} />:
                        <div className={userPageStyle.userPage__Str__Text}>{firstName}</div>
                    }
                </div>
                <div className={userPageStyle.userPage__Str}>
                    <div className={userPageStyle.userPage__Str__GrayText}>Фамилия:&nbsp;</div>
                    {
                        edit?<input type='text' placeholder={user.lastName} onChange={inputLastName} />:
                        <div className={userPageStyle.userPage__Str__Text}>{lastName}</div>
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
                <div className={userPageStyle.userPage__BoldText}>Заказы
                    {orders?<CaretUpOutlined  className={userPageStyle.userPage__UpDown} onClick={handleGetOrders}/>: <CaretDownOutlined className={userPageStyle.userPage__UpDown} onClick={handleGetOrders}/>}
                </div>
                <Orders flag={orders}/>
            </div>
        </div>
    )
};

export default UserPage;
