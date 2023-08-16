import * as index from "../src"
const axios = require('axios/dist/browser/axios.cjs')

document.getElementById('send-form-btn').onclick = () => {
    index.sendFormAjax(
        axios,
        document.getElementById('send-form-btn').closest('form'),
        {extraP: 12},
        {success: () => console.log('success!')}
    )
}