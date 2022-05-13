import { ILocalStore } from "@utils/useLocalStore/useLocalStore";
import { Meta } from "@utils/meta";
import { CollectionModel, getInitialCollectionModel, linearizeCollection, normalizeCollection } from "@store/models/shared/collection";
import { normalizeProduct, ProductApi, ProductModel } from "@store/models/Products";
import ApiStore from "@shared/store/ApiStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { normalizeOrder, OrderApi, OrderModel } from "@store/models/Orders";
import { BASE_URL } from "@store/models/baseUrl/baseUrl";

type PrivateFields = "_list" | "_meta"

export default class OrdersStore implements ILocalStore {
        private readonly _apiStore = new ApiStore(BASE_URL); 

    private _list: CollectionModel<number, OrderModel> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<OrdersStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            getOrdersList: action
        })
    }

    get list(): OrderModel[] {
        return linearizeCollection(this._list);
    }

    get meta(): Meta {
        return this._meta;
    }

    async getOrdersList(): Promise<void> {
        this._meta = Meta.loading;
        this._list = getInitialCollectionModel();

        const response = await this._apiStore.request<OrderApi[]>( {
            method: HTTPMethod.GET,
            endpoint: 'orders',
            headers: {},
            data: null,
            withCredentials: 'include',
        }); 
        
        runInAction(() => {
            if(!response.success) {
                this._meta = Meta.error;
            }

            try {
                const list: OrderModel[] = [];
                for (const item of response.data) {
                    list.push(normalizeOrder(item));
                }
                this._meta = Meta.success;
                this._list = normalizeCollection(list, (listItem) => listItem.id);
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._list = getInitialCollectionModel();
                console.log("OrdersStore:" + e)
            }

        })
    }

    destroy(): void {
        this._meta = Meta.initial;
        this._list = getInitialCollectionModel();
    }
}