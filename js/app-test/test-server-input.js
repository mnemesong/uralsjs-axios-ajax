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
var express = __importStar(require("express"));
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var multer = __importStar(require("multer"));
var app = express.default();
app.use(express.static(path.resolve(module.path, "..", "..", "test-client")));
var upload = multer.default({ dest: 'uploads/' });
var indexPage = fs.readFileSync(path.resolve(module.path, "..", "..", "test-client", "index.htm"));
app.get("/", function (req, res) {
    res.end(indexPage);
});
app.get("/get", express.urlencoded(), function (req, res) {
    res.json({
        params: req.params,
        query: req.query
    });
});
app.post("/post", express.urlencoded(), express.json(), function (req, res) {
    res.json({
        body: req.body,
        query: req.query
    });
});
app.post("/multipart", express.urlencoded(), express.json(), upload.single("fileinput"), function (req, res) {
    res.json({
        body: req.body,
        file: req["file"]
    });
});
app.listen(3000, function () {
    console.log("Server had been start on port 3000");
});
