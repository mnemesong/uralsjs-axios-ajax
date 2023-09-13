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
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var express = __importStar(require("express"));
var data = __importStar(require("./data"));
var assert = __importStar(require("assert"));
var bodyParser = __importStar(require("body-parser"));
var app = express.default();
app.use(express.static(path.resolve(module.path, "..", "..", 'test-client')));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send(fs.readFileSync(path.resolve(module.path, "..", "..", 'test-client', 'index.htm')).toString());
});
app.get("/api", function (req, res) {
    var params = req.query;
    var nominal = __assign(__assign({}, data.data), data.extraparam);
    try {
        assert.deepStrictEqual(params, nominal);
        res.json({ success: 1 });
    }
    catch (e) {
        res.json({ error: JSON.stringify(params) + " is not equal "
                + JSON.stringify(nominal) });
    }
});
app.listen(80, function () {
    console.log("Server start");
});
