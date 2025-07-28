const Otp=require('../modals/Otp')
const users=require('../modals/User')
const { generateotp ,sendOtpEmail} = require('../utilits/otpUtils')

exports.otpverification=async(req,res)=>{
    try {
        const {email}=req.body

        const check=await Otp.findOne({email})

        const otp=req.body.otp.otp

        if(!check){
            console.log("not");
            
            return res.status(400).json({message:"Not founded"})
        }
        if (check.expiresAt < new Date()) {
            console.log("expired");
         return res.status(400).json({ message: 'OTP expired' });
         }
        if(check.otp!==otp){
            console.log("invalid");
           return res.status(400).json({ message: 'invalid OTP' });
        }

        const updateduser=await users.findOneAndUpdate({ email }, { $set: { isVerfied: true } }, { new: true });
       console.log("updated",updateduser);
       
    
        await Otp.deleteMany({ email });
       
        return res.status(200).json({ message: 'OTP verified successfully',role:updateduser.role });
         



    } catch (error) {
        
    }
}


exports.resendOtp=async(req,res)=>{
    try {
           
        const {email}=req.body
        console.log(email);
        
        
        const existing=await users.findOne({email})

        if(!existing){
            console.log("not founded");
            
            return res.status(401).json({message:"user not founded"})

        }

        if(existing.isVerfied){
            console.log("verified");
            return res.status(400).json({message:"User Verified"})
        }

         const latestOtp=await Otp.findOne({email}).sort({ createdAt: -1 })
         
         if(latestOtp&&new Date() - latestOtp.createdAt < 60 * 1000){
             const remaining = 60 - Math.floor((new Date() - latestOtp.createdAt) / 1000);
            return res.status(429).json({message: `Please wait ${remaining}s before resending OTP.` });
         }
         
         await Otp.deleteMany({ email });

        const otpCode=generateotp()
        const expiresAt=new Date(Date.now() + 5 * 60 * 1000)
        await Otp.create({ email, otp:otpCode,expiresAt });
        await sendOtpEmail(email, otpCode);


        return res.status(201).json({message:"Otp Sended"})

    } catch (error) {
        
    }
}