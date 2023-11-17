import * as ajax from "../src/browser"
import { AjaxConfig } from "../src/abstracts"

const formIds = ["GetForm", "PostForm", "MultipartForm"] as const

const getAjaxConfigByFormId = (fid: typeof formIds[number]): AjaxConfig<ajax.Data> => {
    if (fid === "GetForm") {
        return {
            url: "/get",
            queryParams: { k: "v1", k2: "val2" }
        }
    } else if (fid === "PostForm") {
        return {
            url: "/post",
            method: "post",
            body: {
                contentType: "application/json",
                data: { k: "v1", k2: "val2" },
            }
        }
    } else if (fid === "MultipartForm") {
        return {
            url: "/multipart",
            method: "post",
            body: {
                contentType: "multipart/form-data",
                data: { k: "v1", k2: "val2" },
            }
        }
    }
}

formIds.forEach(fid => {
    const formEl = document.getElementById(fid) as HTMLFormElement
    const sendFormBtn = document.getElementById("send" + fid + "Btn")
    sendFormBtn.onclick = () => ajax.sendFormAjaxSync(
        document.getElementById(fid) as HTMLFormElement,
        {},
        async (res) => {
            console.log(res.data)
        }
    )

    const sendDataBtn = document.getElementById("send" + fid + "DataBtn")
    sendDataBtn.onclick = () => ajax.sendAjaxSync(
        getAjaxConfigByFormId(fid),
        async (res) => {
            console.log(res.data)
        }
    )
})