import express from 'express'
import path from "path"

const app = express()
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const staticPath = path.join(__dirname, '..', '..', 'src', 'client', 'public')

app.use(express.static(staticPath))

app.get('/', (req, res) => res.send(path.join(staticPath, 'index.html')))

app.listen(80, () => 'Server listening!')

export {}