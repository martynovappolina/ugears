import { ILocalStore } from "@utils/useLocalStore/useLocalStore";
import { Meta } from "@utils/meta";
import ApiStore from "@shared/store/ApiStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { getInitialUserModel, normalizeUser, UserApi, UserModel } from "@store/models/Users";
import { GetUserParams } from "./types";

const BASE_URL = "http://localhost:8080/api/"

type PrivateFields = "_user" | "_meta"

export default class UsersStore implements ILocalStore {
        private readonly _apiStore = new ApiStore(BASE_URL); 

    private _user: UserModel = getInitialUserModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<UsersStore, PrivateFields>(this, {
            _user: observable.ref,
            _meta: observable,
            user: computed,
            meta: computed,
            getProfileUser: action,
        })
    }

    get user(): UserModel {
        return this._user;
    }

    get meta(): Meta {
        return this._meta;
    } 

    async getProfileUser(): Promise<void> {
        this._meta = Meta.loading;
        this._user = getInitialUserModel();

        const response = await this._apiStore.request<UserApi>( {
            method: HTTPMethod.GET,
            endpoint: 'profile',
            headers: {},
            withCredentials: 'include',
            data: null,
        }); 
        
        runInAction(() => {
            if(!response.success) {
                this._meta = Meta.error;
            }
            try {
                this._user = normalizeUser(response.data);
                this._meta = Meta.success;
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._user = getInitialUserModel();
            }

        })
    }
    
    destroy(): void {
        this._meta = Meta.initial;
        this._user = getInitialUserModel();
    }
}