"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var assert = __importStar(require("assert"));
var abstracts = __importStar(require("../src/abstracts"));
(0, mocha_1.describe)("test ajaxConfigToRequestSchema", function () {
    (0, mocha_1.it)("test 1", function () {
        var given = {
            url: "/some-where",
            queryParams: { k1: "v1", k2: "v2" }
        };
        var result = abstracts.ajaxConfigToReqSchema(given);
        var nominal = {
            method: "get",
            url: "/some-where",
            params: { k1: "v1", k2: "v2" },
            data: undefined,
        };
        assert.deepStrictEqual(result, nominal);
    });
    (0, mocha_1.it)("test 2", function () {
        var given = {
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
        };
        var result = abstracts.ajaxConfigToReqSchema(given);
        var nominal = {
            method: "get",
            url: "/some-where",
            params: { k1: "v1", k2: "v2" },
            data: undefined,
            headers: { "Content-type": "aboba" },
            timeout: 5000,
            auth: {
                username: "John",
                password: "Week"
            },
        };
        assert.deepStrictEqual(result, nominal);
    });
    (0, mocha_1.it)("test 3", function () {
        var given = {
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
        };
        var result = abstracts.ajaxConfigToReqSchema(given);
        var nominal = {
            method: "put",
            url: "/some-where",
            params: undefined,
            data: { k1: "v1", k2: "v2" },
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 5000,
            auth: {
                username: "John",
                password: "Week"
            },
        };
        assert.deepStrictEqual(result, nominal);
    });
});
