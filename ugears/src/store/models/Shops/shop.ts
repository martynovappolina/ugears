import { getInitialUsersModel, normalizeUser, UserApi, UserModel } from "../Users";

export type ShopApi = {
    id: number;
    title: string;
    description: string;
    address: string;
    managers_list: UserApi[];
}

export type ShopModel = {
    id: number;
    title: string;
    description: string;
    address: string;
    managersList: UserModel[];
}

export const normalizeShop = (
    from: ShopApi
): ShopModel => ({
    id: from.id,
    title: from.title,
    description: from.description,
    address: from.address,
    managersList: from.managers_list.map((manager) => normalizeUser(manager)),
});

export const getInitialShopModel = (): ShopModel => ({
    id: 0,
    title: '',
    description: '',
    address: '',
    managersList: getInitialUsersModel(),
})