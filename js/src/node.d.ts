import { AjaxConfig, ResponseSchema } from "./abstracts";
export declare const axios: Function;
export type Data = Record<string | number, any>;
export declare function sendAjax(ajaxConfig: AjaxConfig<Data>): Promise<ResponseSchema>;
export declare function sendAjaxSync(ajaxConfig: AjaxConfig<Data>, onResponse?: (res: ResponseSchema) => Promise<void>, onRejected?: (e: any) => Promise<void>): void;
