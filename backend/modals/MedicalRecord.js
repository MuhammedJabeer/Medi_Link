const mongoose=require('mongoose')



const medicalRecordSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  fileUrl: {
    type: String,
    required: true,
  },
  fileType: String, // e.g., 'pdf', 'image/jpeg'
  access: [String], // List of user roles or IDs who can access this file
}, { timestamps: true });

module.exports= mongoose.model('MedicalRecord', medicalRecordSchema);
