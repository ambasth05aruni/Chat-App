import { compare } from 'bcrypt';
import {User}  from '../models/user.js'
import { cookieOptions, emitEvent, sendToken, uploadFilesToCloudinary } from '../utils/features.js';
import { TryCatch } from '../middlewares/error.js';
import { ErrorHandler } from '../utils/utility.js';
import { Chat } from '../models/chat.js';

import {Request} from '../models/request.js'
import { NEW_REQUEST, REFETCH_CHATS } from '../constants/events.js';
import { getOtherMember } from '../lib/helper.js';

//Create a new user and save it to the database and save the token in the cookie
const newUser = TryCatch( async(req, res, next)=>{

const {name, username, password, bio} = req.body;
// console.log(req.body)

const file = req.file

// console.log(file);
if(!file) 
return next(new ErrorHandler("Please upload an avatar", 400))

const result = await uploadFilesToCloudinary([file])

    const avatar={
        public_id:result[0].public_id,
        url:result[0].url,
        
    }
    await User.create({
        name,
        bio,
         username, 
         password, 
         avatar})

//   res.status(201).json({message:"User created successfully"})
sendToken(res, User, 201, " User Created")
})

const login = async(req, res, next)=>{
    const {username, password} = req.body;

    const user = await User.findOne({username}).select("+password");
    if(!user) return next(new ErrorHandler("Invalid username", 404))
    // res.status(400).json({message:"Invalid username"})

    const isMatch = await compare(password, user.password)
    if(!isMatch) return  next(new ErrorHandler("Invalid password", 404))
    //  res.status(400).json({message:"Invalid password"})

        sendToken(res, user, 200, `Welcome Back, ${user.name}!`)



}


const getMyProfile  = TryCatch(
    async(req, res, next) =>{
        const user = await User.findById(req.user);

        if(!user) return next(new ErrorHandler("User not found", 404))
        
        res.status(200).json({
                success:true,
                user,
            })}
)

const logout = TryCatch(
    async(req, res) =>{
       
        return res.status(200).cookie("Chats-token","", {...cookieOptions, maxAge:0}).json({
                success:true,
               message:"Logged out successfully"
            })}
)

const searchUser = TryCatch(
    async(req, res) =>{

        const {name = ""} = req.query;

        const myChats = await Chat.find({groupChat: false, members:req.user})

        const allUsersFromMyChats = myChats.map((chat)=>chat.members).flat()
       
        const allUserExceptMeAndFriends = await User.find({
            _id : {$nin : allUsersFromMyChats},
            name : {$regex: name, $options:"i"},
            
        })

        const users =  allUserExceptMeAndFriends.map(({_id, name, avatar})=>({
           _id,
           name,
        avatar: avatar.url,
        }))

       
        return res.status(200).json({
                success:true,
            users
            })}
)


const sendFriendRequest = TryCatch(
    async(req, res, next) =>{
        const {userId} = req.body; 

        const request = await Request.findOne({
            $or:[
                {sender:req.user, receiver:userId},
                {sender:userId, receiver:req.user}
            ] 
        })

        if(request) return next(new ErrorHandler("Request already sent", 400))

         await Request.create({
            sender:req.user,
            receiver:userId
         })
         
         emitEvent(req, NEW_REQUEST, [userId])


       
        return res.status(200).json({
                success:true,
               message:"Friend Request Sent"
            })}
)

const acceptFriendRequest= TryCatch(
    async(req, res, next) =>{
        const {requestId, accept} = req.body;

        const request = await Request.findById(requestId)
        .populate("sender", "name")
        .populate("receiver", "name");

        if(!request) return next(new ErrorHandler("Request not found", 404))

        if(request.receiver._id.toString() !== req.user.toString()) return next(new ErrorHandler("You are not authorised to accept the request. Thank You!", 401))

            if(!accept){
                await request.deleteOne()
                return res.status(200).json({
                    success:true,
                    message:"Request declined"
                })
            }

            const members = [request.sender._id, request.receiver._id];

            await Promise.all([
                Chat.create({
                    members,
                    name: `${request.sender.name}- ${request.receiver.name}`
                }),
                request.deleteOne()
            ])

            emitEvent(req,REFETCH_CHATS,members)

        return res.status(200).json({
                success:true,
               message:"Friend Request Accepted",
               senderId:request.sender._id
            })}
)

const getAllNotifications = TryCatch(async(req,res)=>{
    const requests = await Request.find({receiver:req.user})
    .populate("sender", "name avatar")

    const allRequests = requests.map(({_id, sender})=>({
        _id,
        sender:{
            _id:sender._id,
            name:sender.name,
            avatar:sender.avatar.url
        }
    
    }))

    return res.status(200).json({
        success:true,
        allRequests,

})

})


//re check
const getMyFriends = TryCatch(async(req,res)=>{
   const chatId = req.query.chatId;

   const chats = await Chat.find({
        members:req.user._id,
        groupChat:false,
    }).populate("members", "name avatar")


    const friends = chats.map(({members})=>{
        const otherUser = getOtherMember(members, req.user._id)
         return {
            _id:otherUser._id,
            name:otherUser.name,
            avatar:otherUser.avatar.url

        }
     })

     if(chatId){

        const chat = await Chat.findById(chatId);

        const availableFriends = friends.filter(
            (friend)=>!chat.members.includes(friend._id)
        )

        return res.status(200).json({
            success:true,
          friends: availableFriends
        })

     }else{
        return res.status(200).json({
            success:true,
             friends:friends

     })
    }

  

})

 



export {login, newUser, getMyProfile, logout, searchUser, sendFriendRequest, acceptFriendRequest, getAllNotifications, getMyFriends } 