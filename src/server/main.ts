import express from 'express'
import path from "path"
import http from 'http'
import { fileURLToPath } from 'url'
import { Server } from "../../node_modules/socket.io/dist/index.js" // "socket.io"


const app = express()
const server = http.createServer(app)
const io = new Server(server);
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const staticPath = path.join(__dirname, '..', '..', 'src', 'client', 'public')

app.use(express.static(staticPath))

app.get('/', (req, res) => res.send(path.join(staticPath, 'index.html')))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', data => console.log('data =', data))
});

server.listen(80, () => console.log('SERVER IS LISTENING!!'))

export {}