import * as axiosAjax from "../src"
import * as data from "./data"

const getForm = document.querySelector('#getForm');

[getForm].forEach(form => {
    Object.keys(data.data).forEach(k => {
        const select = `[name="${k}"]`
        const el = form.querySelector(select)
        if(el instanceof HTMLInputElement) {
            el.value = data.data[k]
        } else if(el instanceof HTMLTextAreaElement) {
            el.value = data.data[k]
        } else {
            throw new Error("can not find element by selector " + select)
        }
    })
    const sendGetBtn = document.getElementById('sendGetBtn')
    sendGetBtn.onclick = () => {
        axiosAjax.sendFormAjax(
            sendGetBtn.closest('form'),
            data.extraparam,
            {
                success: (res) => {
                    console.log('Success!')
                }
            }
        )
    }
})