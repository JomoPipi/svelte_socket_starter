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

let f : MySocket = {} as any

app.use(express.static(staticPath))

// Might not really need this: 
// app.get('/', (req, res) => res.send(path.join(staticPath, 'index.html')))

io.on('connection', (_socket) => {
    _socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    const socket = _socket as MySocket
    console.log('a user connected');
    
    // Create a new player, maybe?
    socket.on('nomination', data => console.log('data =', data))
});

server.listen(80, () => console.log('SERVER IS LISTENING!'))

export {}