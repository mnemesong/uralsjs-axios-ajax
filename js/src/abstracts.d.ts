export type ReactionObj = Record<string | number, (res: Record<string, any>) => void>;
export type Method = 'get' | 'post' | 'put' | 'set' | 'delete' | 'fetch' | 'update';
export type Enctype = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain" | "application/json";
export declare const defaultEnctype = "application/x-www-form-urlencoded";
export type ExtraConfig = {
    headers?: any;
    baseURL?: string;
    timeout?: number;
    withCredentals?: boolean;
    auth?: {
        username: string;
        password: string;
    };
    responseType?: string;
    responseEncoding?: string;
    maxRedirects?: number;
};
type AjaxConfigGet<Data> = {
    url: string;
    method?: 'get';
    queryParams?: Data;
    extraConfig?: ExtraConfig;
};
type AjaxConfigNotGet<Data> = {
    url: string;
    method: 'post' | 'put' | 'set' | 'delete' | 'fetch' | 'update';
    queryParams?: Data;
    body?: {
        contentType?: Enctype;
        data?: Data;
    };
    extraConfig?: ExtraConfig;
};
export type AjaxConfig<Data> = AjaxConfigGet<Data> | AjaxConfigNotGet<Data>;
export declare const isGet: <Data>(ajaxConfig: AjaxConfig<Data>) => boolean;
export type RequestSchema<Data> = {
    method: Method;
    url: string;
    params: Data | null;
    data: Data | null;
    headers?: Record<string, any> | null;
    baseURL?: string;
    timeout?: number;
    withCredentals?: boolean;
    auth?: {
        username: string;
        password: string;
    };
    responseType?: string;
    responseEncoding?: string;
    maxRedirects?: number;
};
export type ResponseSchema = {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: RequestSchema<any>;
};
export declare function ajaxConfigToReqSchema<Data>(ajaxConf: AjaxConfig<Data>): RequestSchema<Data>;
export {};
