"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFormAjax = exports.sendContainerDataAjax = exports.sendDataAjax = exports.sendAjax = exports.axiosNode = exports.axiosBrowser = void 0;
var axiosBrowser = function () { return require('axios/dist/browser/axios.cjs'); };
exports.axiosBrowser = axiosBrowser;
var axiosNode = function () { return require('axios/dist/node/axios.cjs'); };
exports.axiosNode = axiosNode;
function sendAjax(axios, uri, params, method) {
    try {
        if (!method)
            method = 'get';
        if ((params instanceof FormData) && (method === 'get')) {
            var formDataObj_1 = {};
            params.forEach(function (v, k) { return (formDataObj_1[k] = v); });
            params = formDataObj_1;
        }
        var reqParams = {
            method: method,
            type: method,
            url: uri,
            params: method !== 'get' ? null : params,
            data: method !== 'get' ? params : null,
        };
        if (method !== 'get') {
            reqParams['headers'] = { "Content-Type": "multipart/form-data" };
        }
        return axios(reqParams)
            .catch(function (r) { return console.log('Cannot request url: ', r); });
    }
    catch (e) {
        console.log("error: ", e);
    }
}
exports.sendAjax = sendAjax;
function sendDataAjax(axios, data, formParams, reactionsObj) {
    var _a, _b;
    if (reactionsObj === void 0) { reactionsObj = {}; }
    sendAjax(axios, (_a = formParams.action) !== null && _a !== void 0 ? _a : '', data, (_b = formParams.method) !== null && _b !== void 0 ? _b : 'get')
        .then(function (response) {
        for (var key in reactionsObj) {
            if (response.data[key]) {
                reactionsObj[key](response.data);
            }
        }
    });
}
exports.sendDataAjax = sendDataAjax;
function sendContainerDataAjax(axios, container, formParams, extraParams, reactionsObj) {
    if (extraParams === void 0) { extraParams = {}; }
    if (reactionsObj === void 0) { reactionsObj = {}; }
    var formData = new FormData();
    for (var p in extraParams) {
        formData.append(p, extraParams[p]);
    }
    var inputs = Array
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
    var textAreas = Array
        .from(container.getElementsByTagName('textarea'));
    textAreas.forEach(function (textarea) {
        formData.append(textarea.name, textarea.value);
    });
    var selects = Array
        .from(container.getElementsByTagName('select'));
    selects.forEach(function (select) {
        formData.append(select.name, select.value);
    });
    sendDataAjax(axios, formData, formParams, reactionsObj);
}
exports.sendContainerDataAjax = sendContainerDataAjax;
function sendFormAjax(axios, form, extraParams, reactionsObj) {
    var _a, _b;
    if (extraParams === void 0) { extraParams = {}; }
    if (reactionsObj === void 0) { reactionsObj = {}; }
    sendContainerDataAjax(axios, form, { action: (_a = form.action) !== null && _a !== void 0 ? _a : '', method: (_b = form.method) !== null && _b !== void 0 ? _b : 'get' }, extraParams, reactionsObj);
}
exports.sendFormAjax = sendFormAjax;
