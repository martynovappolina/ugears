import {ApiResponse, RequestParams, HTTPMethod, StatusHTTP} from "./types";
import { action, makeObservable } from "mobx";
import { ILocalStore } from "@utils/useLocalStore/useLocalStore";

export default class ApiStore<SuccessT, ErrorT = any> implements ILocalStore {
    readonly baseUrl: string;

    constructor(baseUrl:string = "") {
        this.baseUrl = baseUrl;
        makeObservable<ApiStore<SuccessT, ErrorT>>(this, {
            request: action
          });
    }

    async request<ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        let url = `${this.baseUrl}${params.endpoint}`;
        let body: any = null;
        const headers = {...params.headers};

        if (params.method === HTTPMethod.GET) {
            url = url;
            //url = `${url}?${qs.stringify(params.data)}`
        }

        if (params.method === HTTPMethod.POST) {
            body =  JSON.stringify(params.data)
            headers['Content-Type'] = 'application/json;charset=UTF-8'
        }

        if (params.method === HTTPMethod.PUT) {
            if(params.stringify) body =  JSON.stringify(params.data)
            else body = params.data
        }

        try {
            let response: any = await fetch(url, {
                method: params.method,
                credentials: params.withCredentials,
                headers,
                body,
            })
            
            if (response.ok) 
                return {
                    success: true,
                    data: await response.text().then((text: any) => text ? JSON.parse(text) : {}),
                    status: response.status,
                };
            else 
                return {
                    success: false,
                    data: await response.text().then((text: any) => text ? JSON.parse(text) : {}),
                    status: response.status,
                };
        }catch(e) {
            return {
                success: false,
                data: e,
                status: StatusHTTP.UNEXPECTED_ERROR,
            };
        }}

    destroy(): void {
        
    }
}