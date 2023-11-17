import { Axios } from "axios"
import {
    AjaxConfig,
    ajaxConfigToReqSchema,
    RequestSchema,
    ResponseSchema,
    isGet,
    defaultEnctype,
    ExtraConfig,
    Method,
    Enctype
} from "./abstracts";

export const axios = require('axios/dist/browser/axios.cjs') as typeof Axios.constructor

export type Data = FormData | Record<string | number, any>

const formDataToRecord = (formData: FormData): Record<string | number, any> => {
    const obj = {}
    formData.forEach((v, k) => {
        if (!!k) {
            obj[k] = v
        }
    })
    return obj
}

const buildFormData = (formData: FormData, data: any, parentKey?: string): void => {
    if (data
        && (typeof data === 'object')
        && !(data instanceof Date)
        && !(data instanceof File)
        && !(data instanceof Blob)
    ) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else {
        const value = data == null ? '' : data;
        formData.append(parentKey, value);
    }
}

const recordToFormData = (rec: Record<string | number, any>): FormData => {
    const formData = new FormData()
    buildFormData(formData, rec)
    return formData
}

function dataInAxiosConfigPrepare(
    axiosConfig: RequestSchema<Data>,
    isMultipart: boolean
): RequestSchema<Data> {
    return (isMultipart)
        ? {
            ...axiosConfig,
            params: (axiosConfig.params instanceof FormData)
                ? axiosConfig.params
                : recordToFormData(axiosConfig.params),
            data: (axiosConfig.data instanceof FormData)
                ? axiosConfig.data
                : recordToFormData(axiosConfig.data)
        }
        : {
            ...axiosConfig,
            params: (axiosConfig.params instanceof FormData)
                ? formDataToRecord(axiosConfig.params)
                : axiosConfig.params,
            data: (axiosConfig.data instanceof FormData)
                ? formDataToRecord(axiosConfig.data)
                : axiosConfig.data
        }
}

export async function sendAjax(
    ajaxConfig: AjaxConfig<Data>
): Promise<ResponseSchema> {
    const axiosConfig = ajaxConfigToReqSchema(ajaxConfig)
    const axiosConfigProcessed = dataInAxiosConfigPrepare(
        axiosConfig,
        ajaxConfig["body"] && (ajaxConfig["body"]["contentType"] === "multipart/form-data")
    )
    return axios(axiosConfigProcessed)
}

export function sendAjaxSync(
    ajaxConfig: AjaxConfig<Data>,
    onResponse?: (res: ResponseSchema) => Promise<void>,
    onRejected?: (e: any) => Promise<void>
): void {
    let ax = sendAjax(ajaxConfig)
    if (onRejected) {
        ax.catch(onRejected)
    }
    if (onResponse) {
        ax.then(onResponse)
    }
}

export async function sendContainerAjax(
    ajaxConfig: AjaxConfig<Data>,
    container: HTMLElement
): Promise<ResponseSchema> {
    const formData = new FormData();
    if (!isGet(ajaxConfig)) {
        if (!ajaxConfig["body"]) {
            ajaxConfig["body"] = {}
        }
        if (!ajaxConfig["body"]["data"]) {
            ajaxConfig["body"]["data"] = {}
        }
        if (!(ajaxConfig["body"]["data"] instanceof FormData)
        ) {
            buildFormData(formData, ajaxConfig["body"]["data"])
        } else {
            Object.keys(ajaxConfig["body"]["data"]).forEach((k) => {
                formData.append(k, ajaxConfig["body"]["data"][k])
            })
        }
    }
    if (!!ajaxConfig.queryParams) {
        if (!(ajaxConfig.queryParams instanceof FormData)) {
            buildFormData(formData, ajaxConfig.queryParams)
        } else {
            Object.keys(ajaxConfig.queryParams).forEach((k) => {
                formData.append(k, ajaxConfig.queryParams[k])
            })
        }
    }
    const inputs = Array
        .from(container.getElementsByTagName('input')) as HTMLInputElement[];
    inputs.forEach((input) => {
        if (input.type === 'checkbox') {
            formData.append(input.name, input.checked ? input.value : '');
        } else if (input.type === 'radio') {
            if (input.checked) {
                formData.append(input.name, input.value);
            }
        } else if (input.type === 'file') {
            if (input.files.length === 1) {
                formData.append(input.name, input.files[0]);
            } else {
                Array.from(input.files)
                    .forEach((el) => formData.append(input.name + '[]', el));
            }
        } else {
            formData.append(input.name, input.value);
        }
    });
    const textAreas = Array
        .from(container.getElementsByTagName('textarea')) as HTMLTextAreaElement[]
    textAreas.forEach((textarea) => {
        formData.append(textarea.name, textarea.value);
    });
    const selects = Array
        .from(container.getElementsByTagName('select')) as HTMLSelectElement[];
    selects.forEach((select) => {
        formData.append(select.name, select.value);
    });
    let ajaxConfigFinal = undefined
    if (isGet(ajaxConfig)) {
        ajaxConfigFinal = {
            url: ajaxConfig.url,
            method: 'get',
            queryParams: formDataToRecord(formData),
            extraConfig: ajaxConfig.extraConfig
        }
    } else {
        ajaxConfigFinal = {
            url: ajaxConfig.url,
            method: ajaxConfig.method,
            extraConfig: ajaxConfig.extraConfig,
            body: {
                contentType: (ajaxConfig['body'] && ajaxConfig['body']['contentType'])
                    ? ajaxConfig['body']['contentType']
                    : defaultEnctype,
                data: formData
            },
        }
    }
    return sendAjax(ajaxConfigFinal)
}

export function sendContainerDataAjaxSync(
    ajaxConfig: AjaxConfig<Data>,
    container: HTMLElement,
    onResponse?: (res: ResponseSchema) => Promise<void>,
    onRejected?: (e: any) => Promise<void>
): void {
    let ax = sendContainerAjax(ajaxConfig, container)
    if (onRejected) {
        ax.catch(onRejected)
    }
    if (onResponse) {
        ax.then(onResponse)
    }
}

export function sendFormAjax(
    form: HTMLFormElement,
    extra?: ExtraConfig
): Promise<ResponseSchema> {
    const url = form.action
    const method = form.method ? form.method : "get"
    const config: AjaxConfig<Data> = (method === "get")
        ? {
            url: url,
            method: method as Method,
            extraConfig: extra,
        } : {
            url: url,
            method: method as Method,
            extraConfig: extra,
            body: {
                contentType: form.enctype ? (form.enctype as Enctype) : defaultEnctype,
            },
        }
    return sendContainerAjax(config, form)
}

export function sendFormAjaxSync(
    form: HTMLFormElement,
    extra?: ExtraConfig,
    onResponse?: (res: ResponseSchema) => Promise<void>,
    onRejected?: (e: any) => Promise<void>
): void {
    let ax = sendFormAjax(form, extra)
    if (onRejected) {
        ax.catch(onRejected)
    }
    if (onResponse) {
        ax.then(onResponse)
    }
}