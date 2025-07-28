const mongoose=require('mongoose')
const User=require('./User');


const doctorSchema = new mongoose.Schema({
   specialization: { type: String, required: true },
   medicallicenseNumber:{type:String,require:true},
   Doctorverified:{type:String,enum:["Agreed","Pending","Rejected"],default:"Pending"}
});

module.exports= User.discriminator('doctor', doctorSchema);
