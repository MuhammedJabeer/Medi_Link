const users = require('../modals/User');
const Patient = require('../modals/Patients');
const bcrypt = require('bcryptjs');
const User = require('../modals/User');
const Doctor=require('../modals/Doctor')
const {generateotp,sendOtpEmail}=require('../utilits/otpUtils')
const Otp=require('../modals/Otp')

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
    if (existing) {
      return res.status(409).json({ message: 'Email already in use' });
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

         return res.status(201).json({message:"Registered"})

    } catch (error) {
        
    }
}