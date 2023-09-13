export type ReactionObj = Record<string | number, (res: Record<string, any>) => void>;
export type Method = 'get' | 'post' | 'multipart' | 'put' | 'set' | 'delete' | 'fetch';
export type FormParams = {
    action: string;
    method: Method;
};
export declare function sendAjax(uri: string, params: Record<string | number, any>, method: Method): Promise<any>;
export declare function sendDataAjax(data: any, formParams: FormParams, reactionsObj?: ReactionObj): void;
export declare function sendContainerDataAjax(container: HTMLElement, formParams: FormParams, extraParams?: Record<string | number, any>, reactionsObj?: ReactionObj): void;
export declare function sendFormAjax(form: HTMLFormElement, extraParams?: Record<string | number, any>, reactionsObj?: ReactionObj): void;
