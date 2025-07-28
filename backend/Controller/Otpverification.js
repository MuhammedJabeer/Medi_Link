const Otp=require('../modals/Otp')


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

        await users.updateOne({ email }, { $set: { isVerfied: true } });

    
        await Otp.deleteMany({ email });
       
        return res.status(200).json({ message: 'OTP verified successfully' });
         



    } catch (error) {
        
    }
}