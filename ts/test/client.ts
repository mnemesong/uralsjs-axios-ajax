import assert from "assert";
import * as axiosAjax from "../src"
import * as data from "./data"

['Get'].forEach(met => {
    const form = document.querySelector(`#${met}Form`);
    assert.ok(form instanceof HTMLFormElement)

    const reactionObj = {
        success: (res) => {
            console.log('Success!')
        }
    }

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

    const sendFormGetBtn = document.getElementById(`sendForm${met}Btn`)
    sendFormGetBtn.onclick = () => {
        axiosAjax.sendFormAjax(
            sendFormGetBtn.closest('form'),
            data.extraparam,
            reactionObj
        )
    }

    const sendContainerBtn = document.getElementById(`sendContainer${met}Btn`)
    sendContainerBtn.onclick = () => {
        axiosAjax.sendContainerDataAjax(
            sendFormGetBtn.closest('form'),
            {action: form.action, method: form.method as axiosAjax.Method},
            data.extraparam,
            reactionObj
        )
    }

    const sendDataBtn = document.getElementById(`sendData${met}Btn`)
    sendDataBtn.onclick = () => {
        axiosAjax.sendDataAjax(
            {...data.data, ...data.extraparam},
            {action: form.action, method: form.method as axiosAjax.Method},
            reactionObj
        )
    }
})