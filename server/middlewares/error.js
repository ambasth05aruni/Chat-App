import { envMode } from "../app.js";

const errorMiddleware = (err, req, res, next)=>{
    err.message ||= "Internal Service Error";
    err.statusCode ||= 500;
    // console.log(err)

 
    if(err.code === 11000){
        const error =Object.keys(err.keyPattern).join("," )
            err.message = `Duplicate field - ${error}`
            err.statusCode = 400;
    
    }


    if(err.name === "CastError"){
        const errorPath = err.path
        err.message = `Resource not found. Invalid: ${errorPath}`
        err.statusCode = 400;
    }
   return res.status(err.statusCode).json({
        success: false,
        message: envMode === "DEVELOPMENT" ? err : err.message,
    })


}


const TryCatch =(passedFunc)=> async(req, res, next) =>{

    try {
        await passedFunc(req, res, next);
        
    } catch (error) {
        next(error)
    }
} 

export {errorMiddleware, TryCatch}