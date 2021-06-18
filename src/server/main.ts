import express from 'express'
import path from "path"
import http from 'http'
import { fileURLToPath } from 'url'
import { Server } from "../../node_modules/socket.io/dist/index.js" // "socket.io"
// import '../shared/constants.js'


const app = express()
const server = http.createServer(app)
const io = new Server(server);
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// const staticPath = path.join(__dirname, '..', '..', 'src', 'client', 'public')
const staticPath = path.join(__dirname, '..', '..', 'public')

app.use(express.static(staticPath))
app.use(express.static(path.join(__dirname, '..', '..', 'dist', 'shared')))

io.on('connection', (_socket) => {
    _socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    const socket = _socket as ServerSocket
    console.log('a user connected');

    // Create a new player, maybe?
    socket.on('nomination', data => console.log('data =', data))
});

server.listen(8080, () => console.log('SERVER IS LISTENING!'))

// console.log('p =',poop)

export {}
