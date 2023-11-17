import { describe, it } from "mocha"
import * as assert from "assert"
import * as abstracts from "../src/abstracts"

describe("test ajaxConfigToRequestSchema", () => {
    it("test 1", () => {
        const given: abstracts.AjaxConfig<Record<string, any>> = {
            url: "/some-where",
            queryParams: { k1: "v1", k2: "v2" }
        }
        const result = abstracts.ajaxConfigToReqSchema(given)
        const nominal: abstracts.RequestSchema<Record<string, any>> = {
            method: "get",
            url: "/some-where",
            params: { k1: "v1", k2: "v2" },
            data: null,
        }
        assert.deepStrictEqual(result, nominal)
    })

    it("test 2", () => {
        const given: abstracts.AjaxConfig<Record<string, any>> = {
            url: "/some-where",
            method: "get",
            queryParams: { k1: "v1", k2: "v2" },
            extraConfig: {
                headers: { "Content-type": "aboba" },
                timeout: 5000,
                auth: {
                    username: "John",
                    password: "Week"
                },
            }
        }
        const result = abstracts.ajaxConfigToReqSchema(given)
        const nominal: abstracts.RequestSchema<Record<string, any>> = {
            method: "get",
            url: "/some-where",
            params: { k1: "v1", k2: "v2" },
            data: null,
            headers: { "Content-type": "aboba" },
            timeout: 5000,
            auth: {
                username: "John",
                password: "Week"
            },
        }
        assert.deepStrictEqual(result, nominal)
    })

    it("test 3", () => {
        const given: abstracts.AjaxConfig<Record<string, any>> = {
            url: "/some-where",
            method: "put",
            queryParams: { k1: "v1", k2: "v2" },
            body: {
                data: { k1: "v1", k2: "v2" },
                contentType: "multipart/form-data"
            },
            extraConfig: {
                timeout: 5000,
                auth: {
                    username: "John",
                    password: "Week"
                },
            }
        }
        const result = abstracts.ajaxConfigToReqSchema(given)
        const nominal: abstracts.RequestSchema<Record<string, any>> = {
            method: "put",
            url: "/some-where",
            params: null,
            data: { k1: "v1", k2: "v2" },
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 5000,
            auth: {
                username: "John",
                password: "Week"
            },
        }
        assert.deepStrictEqual(result, nominal)
    })
})