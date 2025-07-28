


exports.patientvalidation= (req, res, next) => {
  const { fullname, email, password,confirmpassword, phonenumber, age, gender, bloodgroup } = req.body;
     console.log(req.body);
     
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const phoneRegex = /^\d{10}$/;
  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const ageRegex = /^\d{1,3}$/;

  if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email' });
  if (!passwordRegex.test(password)) return res.status(400).json({ message: 'Invalid password' });
  if (password !== confirmpassword) return res.status(400).json({ message: "Passwords do not match" });
  if (!nameRegex.test(fullname)) return res.status(400).json({ message: 'Invalid name' });
  if (!phoneRegex.test(phonenumber)) return res.status(400).json({ message: 'Invalid phone number' });
  if (!ageRegex.test(age))return res.status(400).json({ message: "Invalid age" });
  if (!['Male', 'Female', 'Other'].includes(gender)) return res.status(400).json({ message: 'Invalid gender' });
  if (!['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(bloodgroup)) return res.status(400).json({ message: 'Invalid blood group' });

  next();
};



exports.doctorvalidation=(req,res,next)=>{
   const {
    email,
    password,
    confirmpassword,
    fullname,
    specialization,
    medicallicenseNumber         
   }=req.body

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
//   const phoneRegex = /^\d{10}$/;
  const nameRegex = /^[A-Za-z\s]{3,}$/;
//   const ageRegex = /^\d{1,3}$/;  
  const specializationRegex=/^[A-Za-z\s]{3,}$/;
  const medicallicensenumberRegex= /^[A-Z0-9-]{6,20}$/;

  if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email' });
  if (!passwordRegex.test(password)) return res.status(400).json({ message: 'Invalid password' });
  if (password !== confirmpassword) return res.status(400).json({ message: "Passwords do not match" });
  if (!nameRegex.test(fullname)) return res.status(400).json({ message: 'Invalid name' });
//   if (!phoneRegex.test(phonenumber)) return res.status(400).json({ message: 'Invalid phone number' });
//   if (!ageRegex.test(age))return res.status(400).json({ message: "Invalid age" });
  if(!specializationRegex.test(specialization))return res.status(400).json({ message: "Specialization must contain only letters and be at least 3 characters" });
  if(!medicallicensenumberRegex.test(medicallicenseNumber))return res.status(400).json({ message: "License number must be 6–20 characters (uppercase letters, numbers, or hyphens" });


next();
}
