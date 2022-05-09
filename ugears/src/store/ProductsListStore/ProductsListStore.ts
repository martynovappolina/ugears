import { ILocalStore } from "@utils/useLocalStore/useLocalStore";
import { Meta } from "@utils/meta";
import { CollectionModel, getInitialCollectionModel, linearizeCollection, normalizeCollection } from "@store/models/shared/collection";
import { normalizeProduct, ProductApi, ProductModel } from "@store/models/Products";
import ApiStore from "@shared/store/ApiStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { getProductsListParams } from "./types";

const BASE_URL = "http://localhost:8080/"

type PrivateFields = "_list" | "_meta" | "_totalCount"

export default class ProductsListStore implements ILocalStore {
        private readonly _apiStore = new ApiStore(BASE_URL); 

    private _list: CollectionModel<number, ProductModel> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;
    private _totalCount: number = 0;

    constructor() {
        makeObservable<ProductsListStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            _totalCount: observable,
            list: computed,
            meta: computed,
            totalCount: computed,
            getProductsList: action
        })
    }

    get list(): ProductModel[] {
        return linearizeCollection(this._list);
    }

    get meta(): Meta {
        return this._meta;
    }

    get totalCount(): number {
        return this._totalCount;
    }

    async getProductsList(params: getProductsListParams): Promise<void> {
        this._meta = Meta.loading;
        this._list = getInitialCollectionModel();

        const response = await this._apiStore.request<ProductApi[]>( {
            method: HTTPMethod.GET,
            endpoint: `api/products/feed?category=${params.category}&pageOffset=${params.page}&pageSize=5`,
            headers: {},
            data: null,
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
                console.log("ProductsListStore:" + e)
            }

        })
    }

    destroy(): void {
        this._meta = Meta.initial;
        this._list = getInitialCollectionModel();
    }
}