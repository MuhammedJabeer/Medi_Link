const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,
     ref: 'User', required: true },

  appointmentId: { type: mongoose.Schema.Types.ObjectId,
     ref: 'Appointment', required: true },

  amount: { type: Number, required: true },

  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'pending',
  },

  method: {
    type: String,
    enum: ['card', 'upi', 'netbanking'],
    required: true,
  },

  provider: {
    type: String,
    enum: ['Razorpay', 'Stripe'],
    default: 'Razorpay',
  },
  
  transactionId: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('Payment', paymentSchema);
