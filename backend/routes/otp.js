const express=require('express')
const Router=express.Router();
const otp=require('../controller/Otpverification')





Router.post("/Verification",otp.otpverification)





module.exports=Router