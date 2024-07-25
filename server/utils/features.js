import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import {v4 as uuid} from "uuid"
import {v2 as cloudinary} from "cloudinary"
import { getBase64 } from "../lib/helper.js"

const cookieOptions = {
    maxAge: 24 *60 *60*1000,
    httpOnly:true,
    secure:true,
    sameSite:"none"
}



const connectDB = (uri) =>{
mongoose.connect(uri,{dbName:"Nemo"})
.then((data)=> console.log(`Connected to DB: ${data.connection.host}`))
.catch((err)=>{
    throw err;
})
}

const sendToken =(res, user, code, message) => {
    if (!user._id) {
        return res.status(400).json({ success: false, message: "User ID is missing" });
    }
const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET)

console.log(token)

return res.status(code).cookie("Chats-token", token, cookieOptions).json({
    success: true,
    message,
})
}

const emitEvent =(req,event,users, data)=>{
    console.log("emiting event", event)
}


const  uploadFilesToCloudinary = async (files=[])=>{
    const uploadPromises = files.map((file)=>{
        return new Promise((resolve, reject)=>{
            cloudinary.uploader.upload(
                getBase64(file), 
                {
                resource_type: "auto",
                public_id: uuid(),
            }, (error, result)=>{
                if(error) return reject(error)
                resolve(result)
            
            })
            })
            
    })

    try {
        const results = await Promise.all(uploadPromises);

        const formattedResults = results.map((result)=>({
            public_id:result.public_id,
            url:result.secure_url,
        }))
        return formattedResults;
    } catch (err) {
        throw  new Error(` Error uploading files to cloudinary ${err}`)
        
    }



}




const deleteFilesFromCloudinary = async (public_ids)=>{

}





export {connectDB, sendToken, cookieOptions, emitEvent, deleteFilesFromCloudinary, uploadFilesToCloudinary}