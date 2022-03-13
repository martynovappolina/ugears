import { ILocalStore } from "@utils/useLocalStore/useLocalStore";
import { Meta } from "@utils/meta";
import { CollectionModel, getInitialCollectionModel, linearizeCollection, normalizeCollection } from "@store/models/shared/collection";
import { normalizeProduct, ProductApi, ProductModel } from "@store/models/Products";
import ApiStore from "@shared/store/ApiStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { HTTPMethod } from "@shared/store/ApiStore/types";

const BASE_URL = "http://localhost:3000/"

type PrivateFields = "_list" | "_meta"

export default class ProductsListStore implements ILocalStore {
        private readonly _apiStore = new ApiStore(BASE_URL); 

    private _list: CollectionModel<number, ProductModel> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<ProductsListStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            getProductsList: action
        })
    }

    get list(): ProductModel[] {
        return linearizeCollection(this._list);
    }

    get meta(): Meta {
        return this._meta;
    }

    async getProductsList(): Promise<void> {
        this._meta = Meta.loading;
        this._list = getInitialCollectionModel();

        const response = await this._apiStore.request<ProductApi[]>( {
            method: HTTPMethod.GET,
            endpoint: "products/",
            data: {},
        }); 
        
        runInAction(() => {
            if(!response.success) {
                this._meta = Meta.error;
            }

            try {
                const list: ProductModel[] = [];
                for (const item of response.data) {
                    list.push(normalizeProduct(item));
                }
                this._meta = Meta.success;
                this._list = normalizeCollection(list, (listItem) => listItem.id);
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._list = getInitialCollectionModel();
            }

        })
    }

    destroy(): void {
        this._meta = Meta.initial;
        this._list = getInitialCollectionModel();
    }
}