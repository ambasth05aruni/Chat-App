import express from "express"

import { connectDB } from "./utils/features.js"
import dotenv from 'dotenv'
import { errorMiddleware } from "./middlewares/error.js"
import cookieParser from 'cookie-parser'
import { Server, Socket } from "socket.io"
import { createServer } from "http"
import{ v4 as uuid} from "uuid"
import cors from "cors";
import {v2 as cloudinary} from "cloudinary";


import userRoute  from './routes/user.js'
import chatRoute  from './routes/chat.js'

import adminRoute from './routes/admin.js'
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js"
import { getSockets } from "./lib/helper.js"
import { Message } from "./models/message.js"
import { corsOptions } from "./constants/config.js"
import { socketAuthenticator } from "./middlewares/auth.js"

// import { createGroupChats, createSingleChats } from "./seeders/chat.js"
// import { createMessagesInChat } from "./seeders/chat.js"
// import { createGroupChats, createSingleChats, createUser } from "./seeders/user.js"

dotenv.config({
    path : "./.env"
})

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION"
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "secret"

 export const userSocketID = new Map()

connectDB(mongoURI);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// createMessagesInChat("669bd6a6e0f29c70f3305731", 5)

// createSingleChats(10);
// createGroupChats(10);

// createUser(10);

const app = express()
const server = createServer(app)
const io = new Server(server,{
    cors: corsOptions 
})

//using middleware
app.use(express.json())
// app.use(express.urlencoded())

app.use(cookieParser())
app.use(cors(corsOptions))



app.use("/api/v1/user", userRoute)

app.use("/api/v1/chat", chatRoute)

app.use("/api/v1/admin", adminRoute)



app.get("/", (req,res)=>{
    res.send("Hello World")
})


io.use((socket, next)=>{
    cookieParser()(socket.request, socket.request.res, async(err)=>{
       await socketAuthenticator(err, socket, next)
    })
})

io.on("connection", (socket)=>{
   
    const user = socket.user;

 userSocketID.set(user._id.toString(), socket.id);
    // console.log("User Connected", socket.id);
    console.log(userSocketID)


    socket.on(NEW_MESSAGE, async({chatId, members, messages})=>{

        const messageForRealTime ={
            content: messages,
            _id: uuid(),
            sender:{
                _id: user._id,
                name: user.name
            },
            chat: chatId,
            createdAt : new Date().toISOString(),
        }

const messageForDB = {
    content: messages,
    sender: user._id,
    chat: chatId
}


console.log("emitting",messageForRealTime)

const membersSocket = getSockets(members)
io.to(membersSocket).emit(NEW_MESSAGE, {
    chatId,
    messages: messageForRealTime
})
io.to(membersSocket).emit(NEW_MESSAGE_ALERT, {
    chatId,
    // message: messageForRealTime
})
 try {
    await Message.create(messageForDB)
 } catch (error) {
    console.log(error)
 }

        console.log("New msg", messageForRealTime)
    })

    socket.on("disconnect",()=>{
        console.log("User Disconnected")
        userSocketID.delete(user._id.toString())
    })
})

app.use(errorMiddleware)

server.listen(port, ()=>{
    console.log(`Server is running on port ${port} in ${envMode} Mode`)
})