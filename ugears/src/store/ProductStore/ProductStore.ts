import { ILocalStore } from "@utils/useLocalStore/useLocalStore";
import { Meta } from "@utils/meta";
import { getInitialProductModel, normalizeProduct, ProductApi, ProductModel } from "@store/models/Products";
import ApiStore from "@shared/store/ApiStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { HTTPMethod } from "@shared/store/ApiStore/types";
import { GetProductParams } from "./types";
import { BASE_URL } from "@store/models/baseUrl/baseUrl";

type PrivateFields = "_product" | "_meta"

export default class ProductStore implements ILocalStore {
        private readonly _apiStore = new ApiStore(BASE_URL); 

    private _product: ProductModel = getInitialProductModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<ProductStore, PrivateFields>(this, {
            _product: observable.ref,
            _meta: observable,
            product: computed,
            meta: computed,
            getProduct: action
        })
    }

    get product(): ProductModel {
        return this._product;
    }

    get meta(): Meta {
        return this._meta;
    }

    async getProduct(params: GetProductParams): Promise<void> {
        this._meta = Meta.loading;
        this._product = getInitialProductModel();

        const response = await this._apiStore.request<ProductApi[]>( {
            method: HTTPMethod.GET,
            endpoint: `product/${params.id}`,
            headers: {},
            data: null,
            withCredentials:'include',
        }); 
        
        runInAction(() => {
            if(!response.success) {
                this._meta = Meta.error;
            }

            try {
                this._meta = Meta.success;
                this._product = normalizeProduct(response.data);
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._product = getInitialProductModel();
            }

        })
    }

    destroy(): void {
        this._meta = Meta.initial;
        this._product = getInitialProductModel();
    }
}