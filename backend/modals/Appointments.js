const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['booked', 'completed', 'cancelled','pending'],
    default: 'booked',
  },
  notes: String,
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending',"Failed"],
    default: 'Pending',
  },
   token: { type: Number },
  // paymentId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Payment',
  // },
 
}, { timestamps: true });


module.exports= mongoose.model('Appointment', appointmentSchema);
