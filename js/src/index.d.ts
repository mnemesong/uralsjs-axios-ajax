import { Axios } from "axios";
export declare const axiosBrowser: () => Function;
export declare const axiosNode: () => Function;
export type ReactionObj = Record<string | number, (res: Record<string, any>) => void>;
export type Method = 'get' | 'post' | 'multipart' | 'put' | 'set' | 'delete' | 'fetch';
export type FormParams = {
    action: string;
    method: Method;
};
export declare function sendAjax(axios: typeof Axios.constructor, uri: string, params: Record<string | number, any>, method: Method): Promise<any>;
export declare function sendDataAjax(axios: typeof Axios.constructor, data: any, formParams: FormParams, reactionsObj?: ReactionObj): void;
export declare function sendContainerDataAjax(axios: typeof Axios.constructor, container: HTMLElement, formParams: FormParams, extraParams?: Record<string | number, any>, reactionsObj?: ReactionObj): void;
export declare function sendFormAjax(axios: typeof Axios.constructor, form: HTMLFormElement, extraParams?: Record<string | number, any>, reactionsObj?: ReactionObj): void;
