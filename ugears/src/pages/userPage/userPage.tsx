import UserImage from './components/Image/image';
import ApiStore from '@shared/store/ApiStore';
import { HTTPMethod } from '@shared/store/ApiStore/types';
import { UserModel } from '@store/models/Users';
import { useCallback, useEffect, useState } from 'react';
import userPageStyle from './userPage.module.scss'
import { BASE_URL } from '@store/models/baseUrl/baseUrl';
import Orders from './components/order/orders'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useLocalStore } from '@utils/useLocalStore/useLocalStore';
import RoleStore from '@store/RoleStore';
import { NavLink } from 'react-router-dom';

type UserPageProps = {
    user: UserModel;
    handleClickExit: ()=>void;
}

const UserPage: React.FC<UserPageProps> = ({ user, handleClickExit }) => {
    const apiStore = new ApiStore(BASE_URL);
    const roleStore = useLocalStore(() => new RoleStore());
    const [admin, setAdmin] = useState(false);
    const [manager, setManager] = useState(false);

    useEffect(() => {
        roleStore.getRole();
    }, []) 

    useEffect(() => {
      roleStore.roles.map((r) => {
        if(r==='Manager') setManager(true);
        if(r==='Admin') setAdmin(true);
    })
    }, [roleStore.roles])
    
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

    const handleClickSave = () => {
        async function editUser() {
            const response = await apiStore.request( {
                method: HTTPMethod.PUT,
                endpoint: 'profile/edit',
                headers: {},
                stringify: true,
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

    const [roleForm, setRoleForm] = useState(false);
    const [role, setRole] = useState<'Client' | 'Admin' | 'Manager'>('Client');
    const [id, setId] = useState(0);
    const [clickClient, setClickClient] = useState(false);
    const [clickAdmin, setClickAdmin] = useState(false);
    const [clickManager, setClickManager] = useState(false);

    const handleClickClient = () => {
        setClickClient(true);
        setClickAdmin(false);
        setClickManager(false);
        setRole("Client");
    }
    const handleClickAdmin = () => {
        setClickClient(false);
        setClickAdmin(true);
        setClickManager(false);
        setRole("Admin");
    }
    const handleClickManager = () => {
        setClickClient(false);
        setClickAdmin(false);
        setClickManager(true);
        setRole("Manager");
    }

    const addRole = () => {
        setRoleForm(true);
    }

    const saveRole = () => {
        setRoleForm(false);

        async function putRole() {
            const response = await apiStore.request( {
                method: HTTPMethod.PUT,
                endpoint: 'profile/role',
                stringify: true,
                headers: {},
                data: {
                    "user_id": Number(id),
                    "role": role,
                },
                withCredentials: 'include',
            }); 
        };
        putRole();

    }

    const inputId = useCallback((e: any) => setId(e.target.value), []);

    return (
        <div className={userPageStyle.userPage}>
            <UserImage avatar={"https://storage.yandexcloud.net/gears4us/" + user.avatar}/>
            <div className={userPageStyle.userPage__Info}>
                <div className={userPageStyle.userPage__Str}>
                    <div className={userPageStyle.userPage__Str__GrayText}>ID:&nbsp;</div>
                    <div className={userPageStyle.userPage__Str__Text}>{user.userID}</div>
                </div>
                <div className={userPageStyle.userPage__Str}>
                    <div className={userPageStyle.userPage__Str__GrayText}>Имя:&nbsp;</div>
                    {
                        edit?<input type='text' value={user.firstName} onChange={inputFirstName} />:
                        <div className={userPageStyle.userPage__Str__Text}>{firstName}</div>
                    }
                </div>
                <div className={userPageStyle.userPage__Str}>
                    <div className={userPageStyle.userPage__Str__GrayText}>Фамилия:&nbsp;</div>
                    {
                        edit?<input type='text' value={user.lastName} onChange={inputLastName} />:
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
                        edit?<input type='text' value={user.email} onChange={inputEmail} />:
                        <div className={userPageStyle.userPage__Str__Text}>{user.email}</div>
                    }
                </div>
                {
                    edit?
                    <><div className={userPageStyle.userPage__Button} onClick={handleClickSave}>Сохранить изменения</div>
                    {/* <div className={userPageStyle.userPage__MiniText}>(Для того, чтобы увидеть изменения, обновите страницу.)</div>  */}
                    </>:
                    <div className={userPageStyle.userPage__Button} onClick={handleClickEdit}>Редактировать профиль</div>
                }
                {
                    admin? roleForm?
                    <div className={userPageStyle.add__roleForm}>
                        <div className={userPageStyle.add__textBox}>
                            ID пользователя:
                            <input type='text' className={userPageStyle.add__input} onChange={inputId} />
                        </div>
                        <div className={userPageStyle.add__roleBox}>
                            <div className={clickClient? userPageStyle.add__buttonRoleGreenActive: userPageStyle.add__buttonRoleGreen} onClick={handleClickClient}>Клиент</div>
                            <div className={clickAdmin? userPageStyle.add__buttonRoleGreenActive: userPageStyle.add__buttonRoleGreen} onClick={handleClickAdmin}>Администратор</div>
                            <div className={clickManager? userPageStyle.add__buttonRoleGreenActive: userPageStyle.add__buttonRoleGreen} onClick={handleClickManager}>Менеджер</div>
                        </div>
                        <div className={userPageStyle.add__button} onClick={saveRole}>Сохранить</div>
                    </div>:
                    <div className={userPageStyle.add__buttonBox}>
                        <div className={userPageStyle.add__button} onClick={addRole}>Добавить роль пользователю</div>
                    </div>:
                    null
                }
                {
                    (admin || manager)? 
                    <NavLink to={'/orders'} style={{ textDecoration: 'none' }} className={userPageStyle.add__button}>Перейти к базе с заказами</NavLink>: null
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
