import { ILocalStore } from "@utils/useLocalStore/useLocalStore";
import { Meta } from "@utils/meta";
import { CollectionModel, getInitialCollectionModel, linearizeCollection, normalizeCollection } from "@store/models/shared/collection";
import { normalizeProduct, ProductApi, ProductModel } from "@store/models/Products";
import ApiStore from "@shared/store/ApiStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { CartApi, CartModel, normalizeCart } from "@store/models/Cart";

const BASE_URL = "http://localhost:8080/"

type PrivateFields = "_list" | "_meta" | "_totalCount"

export default class CartStore implements ILocalStore {
        private readonly _apiStore = new ApiStore(BASE_URL); 

    private _list: CollectionModel<number, CartModel> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;
    private _totalCount: number = 0;

    constructor() {
        makeObservable<CartStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            _totalCount: observable,
            list: computed,
            meta: computed,
            totalCount: computed,
            getCart: action
        })
    }

    get list(): CartModel[] {
        return linearizeCollection(this._list);
    }

    get meta(): Meta {
        return this._meta;
    }

    get totalCount(): number {
        return this._totalCount;
    }

    async getCart(): Promise<void> {
        this._meta = Meta.loading;
        this._list = getInitialCollectionModel();

        const response = await this._apiStore.request<CartApi[]>( {
            method: HTTPMethod.GET,
            endpoint: 'api/cart',
            headers: {},
            data: null,
            withCredentials: 'include',
        }); 
        
        runInAction(() => {
            if(!response.success) {
                this._meta = Meta.error;
            }

            try {
                const list: CartModel[] = [];
                for (const item of response.data) {
                    list.push(normalizeCart(item));
                }
                this._meta = Meta.success;
                this._list = normalizeCollection(list, (listItem) => listItem.Product.id);
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._list = getInitialCollectionModel();
                console.log("Cart:" + e)
            }

        })
    }

    destroy(): void {
        this._meta = Meta.initial;
        this._list = getInitialCollectionModel();
    }
}