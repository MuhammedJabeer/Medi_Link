require("dotenv").config()


const users = require('../modals/User');


const Patient = require('../modals/Patients');
const bcrypt = require('bcryptjs');

const Doctor=require('../modals/Doctor')

const {generateotp,sendOtpEmail}=require('../utilits/otpUtils')
const Otp=require('../modals/Otp')
const jwt=require('jsonwebtoken');
const { path } = require("../app");


exports.registerpatient = async (req, res) => {
  try {
    const {
      email,
      password,
      fullname,
      age,
      gender,
      phonenumber,
      bloodgroup,
    } = req.body;

    console.log("Received data:", req.body);

   
    const existing = await users.findOne({ email });
    if (existing&&existing.isVerfied) {
      return res.status(409).json({ message: 'Email already in use' });
    }


    if(existing && !existing.isVerified){
      const latestOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
      const otpExpired = !latestOtp || latestOtp.expiresAt < new Date();

      if (!otpExpired) {
        return res.status(409).json({
          message: 'OTP already sent. Please verify or wait for OTP to expire.',
        });
      }

      
      await users.deleteOne({ email });
      await Otp.deleteMany({ email });
    }


    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const patient = await Patient.create({
      name: fullname,
      email,
      password: hashedPassword,
      phone: phonenumber,
      role: 'patient',
      age,
      gender,
      bloodGroup: bloodgroup,
    });
     
      const otpCode=generateotp()
      const expiresAt=new Date(Date.now() + 5 * 60 * 1000)
      await Otp.create({ email, otp:otpCode,expiresAt });
      await sendOtpEmail(email, otpCode);

    return res.status(201).json({
      message: 'Patient registered successfully',
      user: {
        id: patient._id,
        email: patient.email,
        role: patient.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




exports.registerdoctor=async(req,res)=>{
    try {
        
      const { fullname, email, password, specialization,medicallicenseNumber } = req.body;
      console.log(req.body);

      const existing=await users.findOne({email})

      if(existing){
            return res.status(409).json({ message: 'Email already in use' });
      }
      
      const hashpass=await bcrypt.hash(password,10)

      const doctor=await Doctor.create({
           name:fullname,
           email,
           password:hashpass,
           role: 'doctor',
           specialization,
           medicallicenseNumber
      })

      const otpCode=generateotp()
      const expiresAt=new Date(Date.now() + 5 * 60 * 1000)
      await Otp.create({ email, otp:otpCode,expiresAt });
      await sendOtpEmail(email, otpCode);

         return res.status(201).json({message:"Registered",email:doctor.email})

    } catch (error) {
        
    }
}



exports.Login=async(req,res)=>{
  try {
        console.log(req.body);

        const {email,password}=req.body
           console.log(email)
           console.log(password);
      
        const User=await users.findOne({email})
        console.log("hello",User);
        
        if(!User){
          console.log("user not founded");
          
          res.status(400).json({message:"user not founded"})
        }
        
        const match=await bcrypt.compare(password,User.password)
        console.log(match);
        
        if(!match){
           console.log("paswword not match");
           
           return res.status(401).json({message:"Incorrect password"})
        }


        const token=jwt.sign({id:User._id,name:User.name,email:User.email,role:User.role},process.env.SECRET_KEY,{
          expiresIn:"1h",
        })
        // console.log("token",toekn);
        

        res.cookie("token", token, {
        httpOnly:true,     
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path:"/", 
        maxAge: 60 * 60 * 1000 
         });

      return res.status(200).json({user:User, role: User.role, message: "Login successful" });
        
         

        
  } catch (error) {
    
  }
}









exports.logout=async(req,res)=>{
  try {
        
        res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
         path: "/"
        });


  return res.status(200).json({ message: "Logout successful" });

  } catch (error) {
    
  }
}