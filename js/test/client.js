"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var axiosAjax = __importStar(require("../src"));
var data = __importStar(require("./data"));
['Get'].forEach(function (met) {
    var form = document.querySelector("#".concat(met, "Form"));
    assert_1.default.ok(form instanceof HTMLFormElement);
    var reactionObj = {
        success: function (res) {
            console.log('Success!');
        }
    };
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
    var sendFormGetBtn = document.getElementById("sendForm".concat(met, "Btn"));
    sendFormGetBtn.onclick = function () {
        axiosAjax.sendFormAjax(sendFormGetBtn.closest('form'), data.extraparam, reactionObj);
    };
    var sendContainerBtn = document.getElementById("sendContainer".concat(met, "Btn"));
    sendContainerBtn.onclick = function () {
        axiosAjax.sendContainerDataAjax(sendFormGetBtn.closest('form'), { action: form.action, method: form.method }, data.extraparam, reactionObj);
    };
    var sendDataBtn = document.getElementById("sendData".concat(met, "Btn"));
    sendDataBtn.onclick = function () {
        axiosAjax.sendDataAjax(__assign(__assign({}, data.data), data.extraparam), { action: form.action, method: form.method }, reactionObj);
    };
});
