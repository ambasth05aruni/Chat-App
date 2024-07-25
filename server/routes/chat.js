import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChat, getMyGroups, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachments } from "../controllers/chat.js";
import { attachmentMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator, leaveGroupValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();


app.use(isAuthenticated);
app.post("/new", newGroupValidator(), validateHandler, newGroupChat)
app.get("/my", getMyChat)
app.get("/my/groups", getMyGroups)

app.put("/addmembers",addMemberValidator(), validateHandler, addMembers)
app.put("/removemembers",removeMemberValidator(), validateHandler, removeMembers)

app.delete("/leave/:id", leaveGroupValidator(), validateHandler, leaveGroup)


//send attachment
app.post("/message", attachmentMulter, sendAttachmentValidator(), validateHandler, sendAttachments)

//get messages
app.get("/message/:id",chatIdValidator(), validateHandler, getMessages)


//get chat details, rename, delete
app.route("/:id").get(chatIdValidator(), validateHandler,getChatDetails).put(renameValidator(), validateHandler,renameGroup).delete(chatIdValidator(), validateHandler,deleteChat)






export default app;