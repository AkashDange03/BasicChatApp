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
app.get("/",(req,res)=>{
    res.sendFile(join(__dirname,'index.html'))
})

io.on('connection',(socket)=>{
    console.log(" user connected " + socket.id);
    socket.on('chat message',({data,room})=>{
    io.to([room,socket.id]).emit('chat message',data); 
    })
    socket.on('disconnect',()=>{
        console.log("a user disconnected");
    })
})

//running server on port 3000
server.listen(3000,()=>{
    console.log("Server running on port: 3000");
})