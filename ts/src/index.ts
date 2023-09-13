const axios = require('axios/dist/browser/axios.cjs')

export type ReactionObj = 
    Record<string|number, (res: Record<string, any>) => void>

export type Method = 'get' | 'post' | 'multipart' | 'put' | 'set' | 'delete' | 'fetch'

export type FormParams = {
    action: string,
    method: Method,
}

export function sendAjax(
    uri: string, 
    params: Record<string|number, any>, 
    method: Method
): Promise<any> {
    if(!method) method = 'get';
    if((params instanceof FormData) && (method !== 'multipart')) {
        const formDataObj = {};
        params.forEach((v, k) => (formDataObj[k] = v));
        params = formDataObj;
    }
    let reqParams = {
        method: (method === 'multipart') ? 'post' : method,
        type: (method === 'multipart') ? 'post' : method,
        url: uri,
        params: method !== 'get' ? null : params,
        data: method !== 'get' ? params : null,
    };
    if(method === 'multipart') {
        reqParams['headers'] = {"Content-Type": "multipart/form-data"};
    }
    return axios(reqParams);
}

export function sendDataAjax(
    data: any, 
    formParams: FormParams, 
    reactionsObj: ReactionObj = {}
) {
    sendAjax(formParams.action ?? '', data, formParams.method ?? 'get')
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
    sendDataAjax(formData, formParams, reactionsObj);
}

export function sendFormAjax(
    form: HTMLFormElement, 
    extraParams: Record<string|number, any> = {}, 
    reactionsObj: ReactionObj = {}
) {
    const met: Method = (form.enctype === 'multipart/form-data')
        ? 'multipart'
        : (form.method as Method)
    const metValid = met ? met : 'get'
    const formAction = form.action
    const formActionValid = formAction ? formAction : ''
    sendContainerDataAjax(
        form,
        {action: formActionValid, method: metValid},
        extraParams,
        reactionsObj
    )
}