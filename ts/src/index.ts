export type ReactionObj = 
    Record<string|number, (res: Record<string, any>) => void>;

export type FormParams = {
    action: string,
    method: string,
}

export type Axios = (params: any) => Promise<any>

export const axiosBrowser = () => {return require('axios/dist/browser/axios.cjs');}
export const axiosNode = () => {return  require('axios/dist/node/axios.cjs');}

export function sendAjax(
    axios: Axios,
    uri: string, 
    params: Record<string|number, any>, 
    method: string
): Promise<any> {
    try{
    if(!method) method = 'get';
    if((params instanceof FormData) && (method === 'get')) {
        const formDataObj = {};
        params.forEach((v, k) => (formDataObj[k] = v));
        params = formDataObj;
    }
    let reqParams = {
        method: method,
        type: method,
        url: uri,
        params: method !== 'get' ? null : params,
        data: method !== 'get' ? params : null,
    };
    if(method !== 'get') {
        reqParams['headers'] = {"Content-Type": "multipart/form-data"};
    }
    return axios(reqParams)
        .catch( (r) => console.log('Cannot request url: ', r));
    } catch (e) {
        console.log("error: ", e)
    }
}

export function sendDataAjax(
    axios: Axios,
    data: any, 
    formParams: FormParams, 
    reactionsObj: ReactionObj = {}
) {
    sendAjax(axios, formParams.action ?? '', data, formParams.method ?? 'get')
        .then(function(response) {
            for(let key in reactionsObj)
            {
                if(response.data[key]) {
                    reactionsObj[key](response.data);
                }
            }
        })
}

export function sendContainerDataAjax(
    axios: Axios,
    container: HTMLElement, 
    formParams: FormParams, 
    extraParams: Record<string|number, any> = {}, 
    reactionsObj: ReactionObj = {}
) {
    const formData = new FormData();
    for(let p in extraParams) {
        formData.append(p, extraParams[p]);
    }
    const inputs = Array
        .from(container.getElementsByTagName('input')) as HTMLInputElement[];
    inputs.forEach((input) => {
        if(input.type === 'checkbox') {
            formData.append(input.name, input.checked ? input.value : '');
        } else if (input.type === 'radio') {
            if(input.checked) {
                formData.append(input.name, input.value);
            }
        } else if(input.type === 'file') {
            if(input.files.length === 1) {
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
    sendDataAjax(axios, formData, formParams, reactionsObj);
}

export function sendFormAjax(
    axios: Axios,
    form: HTMLFormElement, 
    extraParams: Record<string|number, any> = {}, 
    reactionsObj: ReactionObj = {}
) {
    sendContainerDataAjax(
        axios,
        form,
        {action: form.action ?? '', method: form.method ?? 'get'},
        extraParams,
        reactionsObj
    )
}