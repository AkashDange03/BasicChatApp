import express from "express"
import { Server } from "socket.io";
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createServer } from "node:http";


//creating express instance
const app = express();
const server = createServer(app);
const io = new Server(server);

//to get the absolute path 
const __dirname = dirname(fileURLToPath(import.meta.url))
console.log("absolute root path" + __dirname)

//handling routing 
app.get("/", (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})

//io refers to  a circuit where multiple sockets are connected

io.on('connection', (socket) => {

    //acessing id
    console.log(" user connected " + socket.id);

    //listening to triggered event
    socket.on('chat message', ({ data, room }) => {

        //sending a data to room id user and emmited user
        io.to([room, socket.id]).emit('chat message', data);
    })

    //listening to disconnect event
    socket.on('disconnect', () => {
        console.log("a user disconnected");
    })
})

//running server on port 3000
server.listen(3000, () => {
    console.log("Server running on port: 3000");
})