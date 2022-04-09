export type UserSignIn = { 
    username: string;
    password: string;
}

export type UserSignUp = { 
    username: string;
    password: string;
    email: string;
}

export type UserApi = {
    // id: number;
    // name: string;
    // last_name: string;
    username: string;
    password: string;
    // is_manager: boolean;
    // is_admin: boolean;
    // phone_number: string;
    email: string;
}

export type UserModel = {
    // id: number;
    // name: string;
    // lastName: string;
    username: string;
    password: string;
    // isManager: boolean;
    // isAdmin: boolean;
    // phoneNumber: string;
    email: string;
}

export const normalizeUser = (
    from: UserApi
): UserModel => ({
    // id: from.id,
    // name: from.name,
    // lastName: from.last_name,
    username: from.username,
    password: from.password,
    // isManager: from.is_manager,
    // isAdmin: from.is_admin,
    // phoneNumber: from.phone_number,
    email: from.email,
});


export const getInitialUserModel = (): UserModel => ({
    // id: 0,
    // name: '',
    // lastName: '',
    username: '',
    password: '',
    // isManager: false,
    // isAdmin: false,
    // phoneNumber: '',
    email: '',
});

export const getInitialUsersModel = (): UserModel[] => (
    [
        {
            // id: 0,
            // name: '',
            // lastName: '',
            username: '',
            password: '',
            // isManager: false,
            // isAdmin: false,
            // phoneNumber: '',
            email: '',
        }
    ]

);