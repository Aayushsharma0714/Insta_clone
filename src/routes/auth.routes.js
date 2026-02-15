const express = require("express")
const authRouter  = express.Router()
const authController = require("../controllers/auth.controller")



/**
 * /api/auth/register  = api
 */

authRouter.post("/register" , authController.registerController)


authRouter.post("/login" , authController.loginController)

module.exports=authRouter