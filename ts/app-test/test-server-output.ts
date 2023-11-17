import * as ajax from "../src"

ajax.node.sendAjaxSync({
    url: "http://localhost:3000/get",
    queryParams: {
        key1: "VAL1",
        key2: "val2"
    },
    method: "get",
}, async (res) => {
    console.log("get response: ", res.data)
})

ajax.node.sendAjaxSync({
    url: "http://localhost:3000/post",
    method: "post",
    body: {
        data: {
            key1: "VAL1",
            key2: "val2"
        }
    }
}, async (res) => {
    console.log("post response: ", res.data)
})