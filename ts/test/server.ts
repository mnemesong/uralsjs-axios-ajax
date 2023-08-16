import * as express from "express"
import * as fs from "fs"
import * as path from "path"

const app = express.default()

const port = 80

app.use(express.static('resources'))

app.get('/', (req, res) => {
    const p = path.resolve(module.path, '..', '..', 'resources', 'index.html')
    res.send(fs.readFileSync(p).toString())
})

app.get('/ajax', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})