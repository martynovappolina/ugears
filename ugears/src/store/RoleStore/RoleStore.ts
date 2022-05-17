import { ILocalStore } from "@utils/useLocalStore/useLocalStore";
import { Meta } from "@utils/meta";
import ApiStore from "@shared/store/ApiStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { BASE_URL } from "@store/models/baseUrl/baseUrl";
import { role } from "@store/models/role/role";

type PrivateFields = "_roles" | "_meta"

export default class RoleStore implements ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL); 

    private _roles: role[] = [role.client];
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<RoleStore, PrivateFields>(this, {
            _roles: observable.ref,
            _meta: observable,
            roles: computed,
            meta: computed,
            getRole: action,
        })
    }

    get roles(): role[] {
        return this._roles;
    }

    get meta(): Meta {
        return this._meta;
    } 

    async getRole(): Promise<void> {
        this._meta = Meta.loading;
        this._roles = [role.client];

        const response = await this._apiStore.request<role[]>( {
            method: HTTPMethod.GET,
            endpoint: 'profile/roles',
            headers: {},
            withCredentials: 'include',
            data: null,
        }); 
        
        runInAction(() => {
            if(!response.success) {
                this._meta = Meta.error;
            }
            try {
                this._roles = response.data;
                this._meta = Meta.success;
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._roles = [role.client];
            }

        })
    }
    
    destroy(): void {
        this._meta = Meta.initial;
        this._roles = [role.client];
    }
}