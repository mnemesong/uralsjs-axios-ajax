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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ajaxConfigToReqSchema = exports.isGet = exports.defaultEnctype = void 0;
exports.defaultEnctype = "application/x-www-form-urlencoded";
var isGet = function (ajaxConfig) {
    return (!ajaxConfig.method || (ajaxConfig.method === "get"));
};
exports.isGet = isGet;
function ajaxConfigToReqSchema(ajaxConf) {
    var reqSchema = ((!ajaxConf.method) || (ajaxConf.method === "get"))
        ? {
            url: ajaxConf.url,
            method: ajaxConf.method ? ajaxConf.method : "get",
            data: undefined,
            params: ajaxConf.queryParams
        }
        : {
            url: ajaxConf.url,
            method: ajaxConf.method,
            data: ajaxConf["body"]["data"],
            params: undefined,
        };
    if (ajaxConf["body"] && ajaxConf["body"]["contentType"]) {
        reqSchema.headers = { "Content-Type": ajaxConf["body"]["contentType"] };
    }
    if (ajaxConf.extraConfig) {
        reqSchema = __assign(__assign(__assign({}, reqSchema), ajaxConf.extraConfig), { headers: __assign(__assign({}, reqSchema.headers), ajaxConf.extraConfig.headers) });
    }
    return reqSchema;
}
exports.ajaxConfigToReqSchema = ajaxConfigToReqSchema;
