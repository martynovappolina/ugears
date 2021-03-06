// Перечисление методов HTTP-запроса
export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
}

// Параметры запроса
export type RequestParams<ReqT> = {
    method: HTTPMethod;
    enctype?: string;
    stringify?: boolean;
    endpoint: string; 
    headers: Record<string, any>;
    mode?: 'cors' | 'no-cors',
    data: ReqT | null;
    withCredentials?: RequestCredentials;
}

// Перечисление статусов ответа
export enum StatusHTTP {
    Accepted = 202,
    AlreadyReported =  208,
    BadRequest = 400,
    BadGateway = 502,
    Success = 200,
    Error = 404,
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR'
}

// Ответ API
export type ApiResponse<SuccessT, ErrorT> =
    | {
    success: true;
    data: SuccessT;
    status: StatusHTTP;
}
    | {
    success: true;
    data: any;
    status: StatusHTTP;
    }
    | {
    success: false;
    data: ErrorT;
    status: StatusHTTP;
}
    | {
    success: false;
    data: any;
    status: StatusHTTP;
    }
;

export interface IApiStore {
    readonly baseUrl: string;

    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>>
}