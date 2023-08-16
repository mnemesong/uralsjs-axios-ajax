export type ReactionObj = Record<string | number, (res: Record<string, any>) => void>;
export type FormParams = {
    action: string;
    method: string;
};
export type Axios = (params: any) => Promise<any>;
export declare function sendAjax(axios: Axios, uri: string, params: Record<string | number, any>, method: string): Promise<any>;
export declare function sendDataAjax(axios: Axios, data: any, formParams: FormParams, reactionsObj?: ReactionObj): void;
export declare function sendContainerDataAjax(axios: Axios, container: HTMLElement, formParams: FormParams, extraParams?: Record<string | number, any>, reactionsObj?: ReactionObj): void;
export declare function sendFormAjax(axios: Axios, form: HTMLFormElement, extraParams?: Record<string | number, any>, reactionsObj?: ReactionObj): void;
