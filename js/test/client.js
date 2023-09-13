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
var axiosAjax = __importStar(require("../src"));
var data = __importStar(require("./data"));
var getForm = document.querySelector('#getForm');
[getForm].forEach(function (form) {
    Object.keys(data.data).forEach(function (k) {
        var select = "[name=\"".concat(k, "\"]");
        var el = form.querySelector(select);
        if (el instanceof HTMLInputElement) {
            el.value = data.data[k];
        }
        else if (el instanceof HTMLTextAreaElement) {
            el.value = data.data[k];
        }
        else {
            throw new Error("can not find element by selector " + select);
        }
    });
    var sendGetBtn = document.getElementById('sendGetBtn');
    sendGetBtn.onclick = function () {
        axiosAjax.sendFormAjax(sendGetBtn.closest('form'), data.extraparam, {
            success: function (res) {
                console.log('Success!');
            }
        });
    };
});
