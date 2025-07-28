const mongoose=require('mongoose')
const User=require('../modals/User')


const patientSchema = new mongoose.Schema({
  age: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  bloodGroup: String,
  // medicalHistory: [String],
});


module.exports= User.discriminator('patient', patientSchema);
