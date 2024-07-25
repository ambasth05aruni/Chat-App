import express from "express";
import { adminData, adminLogin, adminLogout, allChats, allMessages, allUsers, getDashboardStats } from "../controllers/admin.js";
import { addMemberValidator, adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";


const app = express.Router()


app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

app.get("/logout", adminLogout)

//ONLY ADMIN
app.use(adminOnly )

app.get("/", adminData)

app.get("/users", allUsers)


app.get("/chats", allChats)

app.get("/messages", allMessages)

app.get("/stats", getDashboardStats)




export default app;