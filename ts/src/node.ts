import { Axios } from "axios"
import {
    AjaxConfig,
    ajaxConfigToReqSchema,
    ResponseSchema,
} from "./abstracts"

export const axios = () => require('axios') as typeof Axios.constructor

export type Data = Record<string | number, any>

export async function sendAjax(
    ajaxConfig: AjaxConfig<Data>
): Promise<ResponseSchema> {
    const axiosConfig = ajaxConfigToReqSchema(ajaxConfig)
    return axios()(axiosConfig)
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
