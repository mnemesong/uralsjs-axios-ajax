"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFormAjax = exports.sendContainerDataAjax = exports.sendDataAjax = exports.sendAjax = void 0;
var axios = require('axios/dist/browser/axios.cjs');
function sendAjax(uri, params, method) {
    if (!method)
        method = 'get';
    if ((params instanceof FormData) && (method !== 'multipart')) {
        var formDataObj_1 = {};
        params.forEach(function (v, k) { return (formDataObj_1[k] = v); });
        params = formDataObj_1;
    }
    var reqParams = {
        method: (method === 'multipart') ? 'post' : method,
        type: (method === 'multipart') ? 'post' : method,
        url: uri,
        params: method !== 'get' ? null : params,
        data: method !== 'get' ? params : null,
    };
    if (method === 'multipart') {
        reqParams['headers'] = { "Content-Type": "multipart/form-data" };
    }
    return axios(reqParams);
}
exports.sendAjax = sendAjax;
function sendDataAjax(data, formParams, reactionsObj) {
    var _a, _b;
    if (reactionsObj === void 0) { reactionsObj = {}; }
    sendAjax((_a = formParams.action) !== null && _a !== void 0 ? _a : '', data, (_b = formParams.method) !== null && _b !== void 0 ? _b : 'get')
        .then(function (response) {
        for (var key in reactionsObj) {
            if (response.data[key]) {
                reactionsObj[key](response.data);
            }
        }
    });
}
exports.sendDataAjax = sendDataAjax;
function sendContainerDataAjax(container, formParams, extraParams, reactionsObj) {
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
    sendDataAjax(formData, formParams, reactionsObj);
}
exports.sendContainerDataAjax = sendContainerDataAjax;
function sendFormAjax(form, extraParams, reactionsObj) {
    if (extraParams === void 0) { extraParams = {}; }
    if (reactionsObj === void 0) { reactionsObj = {}; }
    var met = (form.enctype === 'multipart/form-data')
        ? 'multipart'
        : form.method;
    var metValid = met ? met : 'get';
    var formAction = form.action;
    var formActionValid = formAction ? formAction : '';
    sendContainerDataAjax(form, { action: formActionValid, method: metValid }, extraParams, reactionsObj);
}
exports.sendFormAjax = sendFormAjax;
