const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  rollNo: { type: String, required: true }, // unique: true yahan se hata diya
  studentClass: { type: String, required: true },
  monthlyFee: { type: Number, required: true },
  contact: { type: String },
  feeHistory: [
    {
      month: { type: String, required: true },
      amountPaid: { type: Number, required: true },
      date: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

// Ab Roll No aur Class dono ko mila kar check kiya jayega
studentSchema.index({ rollNo: 1, studentClass: 1 }, { unique: true });

const Student = mongoose.model('Student', studentSchema);
Student.syncIndexes(); // Yeh line purane error wale rule ko database se hata degi

module.exports = Student;