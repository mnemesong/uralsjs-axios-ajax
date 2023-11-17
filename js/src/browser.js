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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFormAjaxSync = exports.sendFormAjax = exports.sendContainerDataAjaxSync = exports.sendContainerAjax = exports.sendAjaxSync = exports.sendAjax = exports.axios = void 0;
var abstracts_1 = require("./abstracts");
exports.axios = require('axios/dist/browser/axios.cjs');
var formDataToRecord = function (formData) {
    var obj = {};
    formData.forEach(function (v, k) {
        obj[k] = v;
    });
    return obj;
};
var buildFormData = function (formData, data, parentKey) {
    if (data
        && (typeof data === 'object')
        && !(data instanceof Date)
        && !(data instanceof File)
        && !(data instanceof Blob)) {
        Object.keys(data).forEach(function (key) {
            buildFormData(formData, data[key], parentKey ? "".concat(parentKey, "[").concat(key, "]") : key);
        });
    }
    else {
        var value = data == null ? '' : data;
        formData.append(parentKey, value);
    }
};
var recordToFormData = function (rec) {
    var formData = new FormData();
    buildFormData(formData, rec);
    return formData;
};
function dataInAxiosConfigPrepare(axiosConfig, isMultipart) {
    return (isMultipart)
        ? __assign(__assign({}, axiosConfig), { params: (axiosConfig.params instanceof FormData)
                ? formDataToRecord(axiosConfig.params)
                : axiosConfig.params, data: (axiosConfig.params instanceof FormData)
                ? axiosConfig.params
                : recordToFormData(axiosConfig.params) }) : __assign(__assign({}, axiosConfig), { params: (axiosConfig.params instanceof FormData)
            ? formDataToRecord(axiosConfig.params)
            : axiosConfig.params, data: (axiosConfig.params instanceof FormData)
            ? axiosConfig.params
            : recordToFormData(axiosConfig.params) });
}
function sendAjax(ajaxConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var axiosConfig, axiosConfigProcessed;
        return __generator(this, function (_a) {
            axiosConfig = (0, abstracts_1.ajaxConfigToReqSchema)(ajaxConfig);
            axiosConfigProcessed = dataInAxiosConfigPrepare(axiosConfig, ajaxConfig["body"] && (ajaxConfig["body"]["contentType"] === "multipart/form-data"));
            return [2 /*return*/, (0, exports.axios)(axiosConfig)];
        });
    });
}
exports.sendAjax = sendAjax;
function sendAjaxSync(ajaxConfig, onResponse, onRejected) {
    var ax = sendAjax(ajaxConfig);
    if (onRejected) {
        ax.catch(onRejected);
    }
    if (onResponse) {
        ax.then(onResponse);
    }
}
exports.sendAjaxSync = sendAjaxSync;
function sendContainerAjax(ajaxConfig, container) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, inputs, textAreas, selects, ajaxConfigFinal;
        return __generator(this, function (_a) {
            formData = new FormData();
            if (!(0, abstracts_1.isGet)(ajaxConfig)) {
                if (!(ajaxConfig["body"]["data"] instanceof FormData)) {
                    buildFormData(formData, ajaxConfig["body"]["data"]);
                }
                else {
                    ajaxConfig["body"]["data"].forEach(function (v, k) {
                        formData.append(k, v);
                    });
                }
            }
            if (!(ajaxConfig.queryParams instanceof FormData)) {
                buildFormData(formData, ajaxConfig.queryParams);
            }
            else {
                ajaxConfig.queryParams.forEach(function (v, k) {
                    formData.append(k, v);
                });
            }
            inputs = Array
                .from(container.getElementsByTagName('input'));
            inputs.forEach(function (input) {
                if (input.type === 'checkbox') {
                    formData.append(input.name, input.checked ? input.value : '');
                }
                else if (input.type === 'radio') {
                    if (input.checked) {
                        formData.append(input.name, input.value);
                    }
                }
                else if (input.type === 'file') {
                    if (input.files.length === 1) {
                        formData.append(input.name, input.files[0]);
                    }
                    else {
                        Array.from(input.files)
                            .forEach(function (el) { return formData.append(input.name + '[]', el); });
                    }
                }
                else {
                    formData.append(input.name, input.value);
                }
            });
            textAreas = Array
                .from(container.getElementsByTagName('textarea'));
            textAreas.forEach(function (textarea) {
                formData.append(textarea.name, textarea.value);
            });
            selects = Array
                .from(container.getElementsByTagName('select'));
            selects.forEach(function (select) {
                formData.append(select.name, select.value);
            });
            ajaxConfigFinal = undefined;
            if ((0, abstracts_1.isGet)(ajaxConfig)) {
                ajaxConfigFinal = {
                    url: ajaxConfig.url,
                    method: 'get',
                    queryParams: formDataToRecord(formData),
                    extraConfig: ajaxConfig.extraConfig
                };
            }
            else {
                ajaxConfigFinal = {
                    url: ajaxConfig.url,
                    method: ajaxConfig.method,
                    extraConfig: ajaxConfig.extraConfig,
                    body: {
                        contentType: ajaxConfig['body']['contentType']
                            ? ajaxConfig['body']['contentType']
                            : abstracts_1.defaultEnctype,
                        data: FormData
                    },
                };
            }
            return [2 /*return*/, sendAjax(ajaxConfigFinal)];
        });
    });
}
exports.sendContainerAjax = sendContainerAjax;
function sendContainerDataAjaxSync(ajaxConfig, container, onResponse, onRejected) {
    var ax = sendContainerAjax(ajaxConfig, container);
    if (onRejected) {
        ax.catch(onRejected);
    }
    if (onResponse) {
        ax.then(onResponse);
    }
}
exports.sendContainerDataAjaxSync = sendContainerDataAjaxSync;
function sendFormAjax(form, extra) {
    var url = form.action;
    var method = form.method ? form.method : "get";
    return sendContainerAjax({
        url: url,
        method: method,
        extraConfig: extra,
    }, form);
}
exports.sendFormAjax = sendFormAjax;
function sendFormAjaxSync(form, extra, onResponse, onRejected) {
    var ax = sendFormAjax(form, extra);
    if (onRejected) {
        ax.catch(onRejected);
    }
    if (onResponse) {
        ax.then(onResponse);
    }
}
exports.sendFormAjaxSync = sendFormAjaxSync;
