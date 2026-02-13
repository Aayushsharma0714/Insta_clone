const express = require("express")
const authRouter  = express.Router()
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const crypto=  require("crypto")



/**
 * /api/auth/register  = api
 */

authRouter.post("/register" , async(req , res)=>{
    const {email , username , bio , password , profileImage } =req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username} , 
            {email}
        ]
    })
    
    if(isUserAlreadyExists){
        return res.status(409).json({
         message:"User already exists: " + (isUserAlreadyExists.email ==email ?
             "Email already exists":"Username already exists")
        })
    }


    const hash = crypto.createHash('sha256').update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    })

    const token = jwt.sign(
        {
        id:user._id
    }, 
    process.env.JWT_SECRET ,
    {expiresIn:"1d"})

    res.cookie("token" , token)

    res.status(201).json({
        message:"User created successfully",
        user:{
            email:user.email ,
            username:user.username ,
            bio:user.bio ,
            profileImage: user.profileImage
        }
    })
})

module.exports=authRouter