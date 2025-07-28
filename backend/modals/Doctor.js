const mongoose=require('mongoose')
const User=require('./User')

const doctorSchema = new mongoose.Schema({
  specialization: { type: String, required: true },
  availability: [{
    day: String,
    slots: [String]
  }],
  leaveDates: [{
    date: Date,
    reason: String
  }]
});

module.exports= User.discriminator('doctor', doctorSchema);
