import * as index from "../src"

document.getElementById('send-form-btn').onclick = () => {
    index.sendFormAjax(
        index.axiosBrowser(),
        document.getElementById('send-form-btn').closest('form'),
        {extraP: 12},
        {success: () => console.log('success!')}
    )
}