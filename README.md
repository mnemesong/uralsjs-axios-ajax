# uralsjs-axios-ajax
Axios ajax prepared functions


## Example of usage
```typescript
import * as ajax from "uralsjs-axios-ajax'

const formEl = document.getElementById("GetForm") as HTMLFormElement
const sendFormBtn = document.getElementById("sendGetFormBtn")
sendFormBtn.onclick = () => ajax.browser.sendFormAjaxSync(
    document.getElementById(fid) as HTMLFormElement,
    {}, //no extra parametes in this request
    async (res) => { console.log(res.data) } //function of reaction on response
)
```


## API

#### Common types
Common type definitions and logic are contains in file src/abstracts.ts
```typescript
//src/abstracts.ts
export type ReactionObj =
    Record<string | number, (res: Record<string, any>) => void>

export type Method = 'get' | 'post' | 'put' | 'set' | 'delete' | 'fetch' | 'update'

export type Enctype =
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain"
    | "application/json"

export const defaultEnctype = "application/x-www-form-urlencoded"

//extra parameters for ajax request
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

//config for in-package funcitons
export type AjaxConfig<Data> =
    | AjaxConfigGet<Data>
    | AjaxConfigNotGet<Data>

//pure schema, thats will be produced by AjaxConfig and used as parameter for axios() function 
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

//pure schema of response. Use it for declare reaction on response
export type ResponseSchema = {
    data: any,
    status: number,
    statusText: string,
    headers: any,
    config: RequestSchema<any>
}
```

#### Browser
browser api contains in file src/browser.ts
```typescript
export type Data = FormData | Record<string | number, any>

//Send ajax by config and returns Promise<ResponseSchema>
export async function sendAjax(
    ajaxConfig: AjaxConfig<Data>
): Promise<ResponseSchema> {...}

//Send ajax by config and react by onResponse function
export function sendAjaxSync(
    ajaxConfig: AjaxConfig<Data>,
    onResponse?: (res: ResponseSchema) => Promise<void>,
    onRejected?: (e: any) => Promise<void>
): void {...}

//Collect data from control-html-elements (inputs, textareas, etc..) in html-container
//and send its data ajax by config
export async function sendContainerAjax(
    ajaxConfig: AjaxConfig<Data>,
    container: HTMLElement
): Promise<ResponseSchema> {...}

//Collect data from control-html-elements (inputs, textareas, etc..) in html-container
//send its data ajax, and react by onResponse function
export function sendContainerDataAjaxSync(
    ajaxConfig: AjaxConfig<Data>,
    container: HTMLElement,
    onResponse?: (res: ResponseSchema) => Promise<void>,
    onRejected?: (e: any) => Promise<void>
): void {...}

//Collect data from form-html-element
//and send its data ajax by config
export function sendFormAjax(
    form: HTMLFormElement,
    extra?: ExtraConfig
): Promise<ResponseSchema> {...}

//Collect data from form-html-element
//send its data ajax, and react by onResponse function
export function sendFormAjaxSync(
    form: HTMLFormElement,
    extra?: ExtraConfig,
    onResponse?: (res: ResponseSchema) => Promise<void>,
    onRejected?: (e: any) => Promise<void>
): void {...}
```

#### Node
Node.js api contains in file src/node.ts
```typescript
export type Data = Record<string | number, any>

//Send ajax by config and returns Promise<ResponseSchema>
export async function sendAjax(
    ajaxConfig: AjaxConfig<Data>
): Promise<ResponseSchema> {...}

//Send ajax by config and react by onResponse function
export function sendAjaxSync(
    ajaxConfig: AjaxConfig<Data>,
    onResponse?: (res: ResponseSchema) => Promise<void>,
    onRejected?: (e: any) => Promise<void>
): void {...}
```

#### Index
index file and package's exports definitions
```typescript
export * as browser from "./browser" //browser api file
export * as node from "./node" //node api file

//used common types for help
export {
    Method,
    Enctype,
    defaultEnctype,
    ExtraConfig,
    AjaxConfig,
    ResponseSchema,
} from "./abstracts"
```


## License
MIT

## Author
Anatoly Starodubtsev
tostar74@mail.ru