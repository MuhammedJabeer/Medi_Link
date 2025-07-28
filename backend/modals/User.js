const mongoose = require('mongoose');

const options = { discriminatorKey: 'role', timestamps: true };

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  profileImage: String,
  role: { type: String, enum: ['doctor', 'patient', 'admin'], required: true },
  isActive: { type: Boolean, default: true },
  googleId: String
}, options);

const User = mongoose.model('User', userSchema);


module.exports = User;