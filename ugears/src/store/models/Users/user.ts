export type UserApi = {
    id: number;
    name: string;
    last_name: string;
    login: string;
    password: string;
    is_manager: boolean;
    is_admin: boolean;
    phone_number: string;
    mail: string;
}

export type UserModel = {
    id: number;
    name: string;
    lastName: string;
    login: string;
    password: string;
    isManager: boolean;
    isAdmin: boolean;
    phoneNumber: string;
    mail: string;
}

export const normalizeUser = (
    from: UserApi
): UserModel => ({
    id: from.id,
    name: from.name,
    lastName: from.last_name,
    login: from.login,
    password: from.password,
    isManager: from.is_manager,
    isAdmin: from.is_admin,
    phoneNumber: from.phone_number,
    mail: from.mail,
});


export const getInitialUserModel = (): UserModel => ({
    id: 0,
    name: '',
    lastName: '',
    login: '',
    password: '',
    isManager: false,
    isAdmin: false,
    phoneNumber: '',
    mail: '',
});

export const getInitialUsersModel = (): UserModel[] => (
    [
        {
            id: 0,
            name: '',
            lastName: '',
            login: '',
            password: '',
            isManager: false,
            isAdmin: false,
            phoneNumber: '',
            mail: '',
        }
    ]

);