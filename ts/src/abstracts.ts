export type ReactionObj =
    Record<string | number, (res: Record<string, any>) => void>

export type Method = 'get' | 'post' | 'put' | 'set' | 'delete' | 'fetch' | 'update'

export type Enctype =
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain"
    | "application/json"

export const defaultEnctype = "application/x-www-form-urlencoded"

export type ExtraConfig = {
    headers?: any,
    baseURL?: string,
    timeout?: number,
    withCredentals?: boolean,
    auth?: {
        username: string,
        password: string
    },
    responseType?: string,
    responseEncoding?: string
    maxRedirects?: number
}

type AjaxConfigGet<Data> = {
    url: string,
    method?: 'get',
    queryParams?: Data,
    extraConfig?: ExtraConfig
}

type AjaxConfigNotGet<Data> = {
    url: string,
    method: 'post' | 'put' | 'set' | 'delete' | 'fetch' | 'update',
    queryParams?: Data
    body?: {
        contentType?: Enctype,
        data?: Data
    },
    extraConfig?: ExtraConfig
}

export type AjaxConfig<Data> =
    | AjaxConfigGet<Data>
    | AjaxConfigNotGet<Data>

export const isGet = <Data>(ajaxConfig: AjaxConfig<Data>): boolean =>
    (!ajaxConfig.method || (ajaxConfig.method === "get"))

export type RequestSchema<Data> = {
    method: Method,
    url: string,
    params: Data | null,
    data: Data | null,
    headers?: Record<string, any> | null,
    baseURL?: string,
    timeout?: number,
    withCredentals?: boolean,
    auth?: {
        username: string,
        password: string
    },
    responseType?: string,
    responseEncoding?: string
    maxRedirects?: number
}

export type ResponseSchema = {
    data: any,
    status: number,
    statusText: string,
    headers: any,
    config: RequestSchema<any>
}

export function ajaxConfigToReqSchema<Data>(ajaxConf: AjaxConfig<Data>): RequestSchema<Data> {
    let reqSchema: RequestSchema<Data> = ((!ajaxConf.method) || (ajaxConf.method === "get"))
        ? {
            url: ajaxConf.url,
            method: ajaxConf.method ? ajaxConf.method : "get",
            data: undefined,
            params: ajaxConf.queryParams
        }
        : {
            url: ajaxConf.url,
            method: ajaxConf.method,
            data: ajaxConf["body"]["data"],
            params: undefined,
        }
    if (ajaxConf["body"] && ajaxConf["body"]["contentType"]) {
        reqSchema.headers = { "Content-Type": ajaxConf["body"]["contentType"] }
    }
    if (ajaxConf.extraConfig) {
        reqSchema = {
            ...reqSchema,
            ...ajaxConf.extraConfig,
            headers: { ...reqSchema.headers, ...ajaxConf.extraConfig.headers }
        }
    }
    return reqSchema
}