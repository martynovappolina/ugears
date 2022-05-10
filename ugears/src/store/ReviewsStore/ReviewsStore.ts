import { ILocalStore } from "@utils/useLocalStore/useLocalStore";
import ApiStore from "@shared/store/ApiStore";
import { CollectionModel, getInitialCollectionModel, linearizeCollection, normalizeCollection } from "@store/models/shared/collection";
import { normalizeReview, ReviewApi, ReviewModel } from "@store/models/Reviews";
import { Meta } from "@utils/meta";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { GetReviewsByProductIdParams } from "./types";
import { HTTPMethod } from "@shared/store/ApiStore/types";

const BASE_URL = "http://localhost:3000/"

type PrivateFields = "_list" | "_meta"

export default class ReviewsStore implements ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL); 
    private _list: CollectionModel<number, ReviewModel> = getInitialCollectionModel();
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<ReviewsStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            getReviewsByProductId: action
        })
    }

    get list(): ReviewModel[] {
        return linearizeCollection(this._list);
    }

    get meta(): Meta {
        return this._meta;
    }

    async getReviewsByProductId(params: GetReviewsByProductIdParams): Promise<void> {
        this._meta = Meta.loading;
        this._list = getInitialCollectionModel();

        const response = await this._apiStore.request<ReviewApi[]>( {
            method: HTTPMethod.GET,
            endpoint: "reviews/",
            headers: {},
            data: null,
            withCredentials:'include',
        }); 
        
        runInAction(() => {
            if(!response.success) {
                this._meta = Meta.error;
            }

            try {
                const list: ReviewModel[] = [];
                for (const item of response.data) {
                    if (item.product_id == params.id) list.push(normalizeReview(item));
                }
                this._meta = Meta.success;
                this._list = normalizeCollection(list, (listItem) => listItem.userId);
                return;
            } catch (e) {
                this._meta = Meta.error;
                this._list = getInitialCollectionModel();
                console.log("ReviewStore:" + e)
            }

        })
    }

    destroy(): void {
        this._meta = Meta.initial;
        this._list = getInitialCollectionModel();
    }
}