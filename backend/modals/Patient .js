const mongoose=require('mongoose')

const patientSchema = new mongoose.Schema({
  age: Number,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  bloodGroup: String,
  medicalHistory: [String]
});

const Patient = User.discriminator('patient', patientSchema);



module.exports=Patient