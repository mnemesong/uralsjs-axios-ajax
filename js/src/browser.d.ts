import { AjaxConfig, ResponseSchema, ExtraConfig } from "./abstracts";
export declare const axios: Function;
export type Data = FormData | Record<string | number, any>;
export declare function sendAjax(ajaxConfig: AjaxConfig<Data>): Promise<ResponseSchema>;
export declare function sendAjaxSync(ajaxConfig: AjaxConfig<Data>, onResponse?: (res: ResponseSchema) => Promise<void>, onRejected?: (e: any) => Promise<void>): void;
export declare function sendContainerAjax(ajaxConfig: AjaxConfig<Data>, container: HTMLElement): Promise<ResponseSchema>;
export declare function sendContainerDataAjaxSync(ajaxConfig: AjaxConfig<Data>, container: HTMLElement, onResponse?: (res: ResponseSchema) => Promise<void>, onRejected?: (e: any) => Promise<void>): void;
export declare function sendFormAjax(form: HTMLFormElement, extra?: ExtraConfig): Promise<ResponseSchema>;
export declare function sendFormAjaxSync(form: HTMLFormElement, extra?: ExtraConfig, onResponse?: (res: ResponseSchema) => Promise<void>, onRejected?: (e: any) => Promise<void>): void;
