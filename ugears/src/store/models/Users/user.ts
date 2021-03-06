export type UserSignIn = { 
    username: string;
    password: string;
}

export type UserSignUp = { 
    username: string;
    password: string;
    email: string;
}

export type UserEdit = {
    firstName: string;
    lastName: string;
    email: string;
}

export type UserApi = {
    user_id: number;
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    // is_manager: boolean;
    // is_admin: boolean;
    // phone_number: string;
    email: string;
}

export type UserModel = {
    userID: number;   
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
    // isManager: boolean;
    // isAdmin: boolean;
    // phoneNumber: string;
    email: string;
}

export const normalizeUser = (
    from: UserApi
): UserModel => ({
    username: from.username,
    userID: from.user_id,
    firstName: from.firstName,
    lastName: from.lastName,
    avatar: from.avatar,
    // isManager: from.is_manager,
    // isAdmin: from.is_admin,
    // phoneNumber: from.phone_number,
    email: from.email,
});


export const getInitialUserModel = (): UserModel => ({
    userID: 0,
    username: '',
    firstName: '',
    lastName: '',
    avatar: '',
    // isManager: false,
    // isAdmin: false,
    // phoneNumber: '',
    email: '',
});

export const getInitialUsersModel = (): UserModel[] => (
    [
        {
            userID: 0,
            username: '',
            firstName: '',
            lastName: '',
            avatar: '',
            // isManager: false,
            // isAdmin: false,
            // phoneNumber: '',
            email: '',
        }
    ]

);