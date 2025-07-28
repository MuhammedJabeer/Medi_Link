const express=require('express')
const Router=express.Router();
const otp=require('../controller/Otpverification')





Router.post("/Verification",otp.otpverification)
Router.post("/Resend",otp.resendOtp)




module.exports=Router