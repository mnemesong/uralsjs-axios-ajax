import * as path from "path"
import * as fs from "fs"
import * as express from "express"
import * as src from "../src"
import * as multer from "multer"
import * as data from "./data"
import * as assert from "assert"
import * as bodyParser from "body-parser"
import * as url from "url"

const app = express.default()

app.use(express.static(path.resolve(module.path, "..", "..", 'test-client')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(fs.readFileSync(
        path.resolve(module.path, "..", "..", 'test-client', 'index.htm')
    ).toString())
})

app.get("/get", (req, res) => {
    const params = req.query
    const nominal = {...data.data, ...data.extraparam}
    try {
        assert.deepStrictEqual(params, nominal)
        res.json({success: 1})
    } catch (e) {
        res.json({error: JSON.stringify(params) + " is not equal " 
            + JSON.stringify(nominal)})
    }
})

app.post("/post", (req, res) => {
    const params = req.body
    const nominal = {...data.data, ...data.extraparam}
    try {
        assert.deepStrictEqual(params, nominal)
        res.json({success: 1})
    } catch (e) {
        res.json({error: JSON.stringify(params) + " is not equal " 
            + JSON.stringify(nominal)})
    }
})

app.post("/post", (req, res) => {
    const params = req.body
    const nominal = {...data.data, ...data.extraparam}
    try {
        assert.deepStrictEqual(params, nominal)
        res.json({success: 1})
    } catch (e) {
        res.json({error: JSON.stringify(params) + " is not equal " 
            + JSON.stringify(nominal)})
    }
})

app.post("/multipart", multer.default().none(), (req, res) => {
    const params = req.body
    const nominal = {...data.data, ...data.extraparam}
    try {
        assert.notDeepStrictEqual(params, nominal)
        res.json({success: 1})
    } catch (e) {
        res.json({error: JSON.stringify(params) + " is not equal " 
            + JSON.stringify(nominal)})
    }
})

app.listen(80, () => {
    console.log("Server start")
})