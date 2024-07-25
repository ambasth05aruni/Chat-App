import express from "express"
import { acceptFriendRequest, getAllNotifications, getMyFriends, getMyProfile, login, logout, newUser, searchUser, sendFriendRequest } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequestValidator, registerValidator,  sendRequestValidator,  validateHandler, validateLogin } from "../lib/validators.js";

const app = express.Router();


app.post("/new", singleAvatar,registerValidator(), validateHandler, newUser)
app.post("/login",validateLogin(), validateHandler, login)


app.use( isAuthenticated);

app.get("/me", getMyProfile)
app.get("/logout", logout)

app.get("/search", searchUser)

app.put("/sendrequest",sendRequestValidator(), validateHandler, sendFriendRequest)
app.put("/acceptrequest",acceptRequestValidator(), validateHandler, acceptFriendRequest)

app.get("/notifications", getAllNotifications)

app.get("/friends", getMyFriends)



export default app;