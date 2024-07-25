import { body, validationResult, param, query } from "express-validator"
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req,res,next)=>{
    const errors = validationResult(req);

    const errorMessages = errors.array().map((error)=>error.msg).join(",");

    if(errors.isEmpty()) return next()
        else next(new ErrorHandler(errorMessages, 400))

    // console.log(errorMessages)


}


const registerValidator =()=>[
    body("name",  "Please enter name").notEmpty(),
    body("username",  "Please enter Username").notEmpty(),
    body("bio",  "Please enter Bio").notEmpty(),
    body("password",  "Please enter password").notEmpty(),
    // check("avatar", "PLease upload avatar").notEmpty()

]

const validateLogin =()=>[
    body("username",  "Please enter Username").notEmpty(),
    body("password",  "Please enter password").notEmpty(),

]

const newGroupValidator =()=>[
    body("name",  "Please enter name").notEmpty(),
    body("members").notEmpty().withMessage("Please enter Members").isArray({ min: 2, max:100 }).withMessage("Members must be 2-100")

]

const addMemberValidator =()=>[
    body("chatId",  "Please enter Chat ID").notEmpty(),
    body("members").notEmpty().withMessage("Please enter Members").isArray({ min: 1, max:97 }).withMessage("Members must be 1-97")

]


const removeMemberValidator =()=>[
    body("chatId",  "Please enter Chat ID").notEmpty(),
    body("userId",  "Please enter User ID").notEmpty(),
   
]

const leaveGroupValidator =()=>[
    param("id",  "Please enter Chat ID").notEmpty(),
  
   
]

const sendAttachmentValidator =()=>[
    body("chatId",  "Please enter Chat ID").notEmpty(),
    // check("files").notEmpty().withMessage("Please upload attachmennts").isArray({ min: 1, max:5 }).withMessage("Members must be 1-5")
  
   
]

const chatIdValidator =()=>[
    param("id",  "Please enter Chat ID").notEmpty(),
    // query("page", ).notEmpty()


]

const renameValidator =()=>[
    param("id",  "Please enter Chat ID").notEmpty(),
    body("name",  "Please enter new Name").notEmpty(),


]

const sendRequestValidator =()=>[
    body("userId",  "Please enter User ID").notEmpty(),


]
const acceptRequestValidator =()=>[
    body("requestId",  "Please enter Request ID").notEmpty(),
    body("accept").notEmpty().withMessage( "Please add Accept").isBoolean().withMessage("Accept must be Boolean"),


]

const adminLoginValidator =()=>[
    body("secretKey",  "Please enter Secret key").notEmpty(),
    


]








export {registerValidator, validateHandler, validateLogin, newGroupValidator, addMemberValidator, removeMemberValidator, leaveGroupValidator, sendAttachmentValidator, chatIdValidator, renameValidator, sendRequestValidator, acceptRequestValidator, adminLoginValidator}
