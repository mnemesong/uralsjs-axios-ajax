import * as express from "express"
import * as path from "path"
import * as fs from "fs"
import * as multer from "multer"

const app = express.default()
app.use(express.static(path.resolve(module.path, "..", "..", "test-client")))

const upload = multer.default({ dest: 'uploads/' })

const indexPage = fs.readFileSync(path.resolve(module.path, "..", "..", "test-client", "index.htm"))

app.get("/", (req, res) => {
    res.end(indexPage)
})

app.get("/get", express.urlencoded(), (req, res) => {
    res.json({
        params: req.params,
        query: req.query
    })
})

app.post("/post", express.urlencoded(), express.json(), (req, res) => {
    res.json({
        body: req.body,
        query: req.query
    })
})

app.post("/multipart", express.urlencoded(), express.json(), upload.single("fileinput"), (req, res) => {
    res.json({
        body: req.body,
        file: req["file"]
    })
})

app.listen(3000, () => {
    console.log("Server had been start on port 3000")
})

