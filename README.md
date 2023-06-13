# uralsjs-axios-ajax
Axios ajax prepared functions

## Example of usage
```typescript
const form = document.getElementById('loginForm') as HTMLFormElement;
sendFormAjax( form,  {
    id: someIdFromPage
},  {
    success: (res) => window.open('/some/url', '_self')
} );
```

## API
```typescript
/**
 * is a Record kind of: {
 *      awaitingKeyInResponse: someReactionFunction (response) => *void, 
 *      ...
 * }
 */
export type ReactionObj = 
    Record<string|number, (res: AxiosResponse<any, any>) => void>;

export type FormParams = {
    action: string,
    method: string,
}

/**
 * Send some data AJAX
 */
function sendAjax(
    uri: string, 
    params: Record<string|number, any>, 
    method: string
): Promise<AxiosResponse<any, any>> {...}

/**
 * Send some data AJAX with reaction
 */
function sendDataAjax(
    data: any, 
    formParams: FormParams, 
    reactionsObj: ReactionObj = {}
) {...}

/**
 * Aggregate data from Html-container and send if AJAX with reaction
 */
function sendContainerDataAjax(
    container: HTMLElement, 
    formParams: FormParams, 
    extraParams: Record<string|number, any> = {}, 
    reactionsObj: ReactionObj = {}
) {...}

/**
 * Aggregate data from html-form and send if AJAX with reaction
 */
function sendFormAjax(
    form: HTMLFormElement, 
    extraParams: Record<string|number, any> = {}, 
    reactionsObj: ReactionObj = {}
) {...}
```

## License
MIT

## Author
Anatoly Starodubtsev
tostar74@mail.ru