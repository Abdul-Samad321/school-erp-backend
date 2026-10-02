const Student = require('../models/Student');

exports.addStudent = async (req, res) => {
  try {
    const { name, fatherName, rollNo, studentClass, monthlyFee, contact } = req.body;
    
    // Ab strict class aur roll no dono check honge
    const existingStudent = await Student.findOne({ rollNo, studentClass });
    if (existingStudent) {
      return res.status(400).json({ message: 'Roll Number already exists in this specific class!' });
    }

    const newStudent = new Student({ name, fatherName, rollNo, studentClass, monthlyFee, contact });
    await newStudent.save();
    
    res.status(201).json({ message: 'Student added successfully!', student: newStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.payFee = async (req, res) => {
  try {
    const { rollNo, studentClass, month, amountPaid } = req.body;
    
    const student = await Student.findOne({ rollNo, studentClass });
    if (!student) return res.status(404).json({ message: 'Student not found!' });

    const alreadyPaid = student.feeHistory.find(fee => fee.month === month);
    if (alreadyPaid) {
      return res.status(400).json({ message: `${month} fee is already paid!` });
    }

    student.feeHistory.push({ month, amountPaid });
    await student.save();

    res.status(200).json({ message: `Fee for ${month} paid successfully!`, student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchStudent = async (req, res) => {
  try {
    // Search by both Class and Roll No
    const student = await Student.findOne({ 
      rollNo: req.params.rollNo,
      studentClass: req.params.studentClass 
    });
    if (!student) return res.status(404).json({ message: 'Student not found!' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Student Details Edit Karna
exports.editStudent = async (req, res) => {
  try {
    const { name, fatherName, contact } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, fatherName, contact },
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: 'Student not found!' });
    res.status(200).json({ message: 'Details updated successfully!', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Student Delete Karna
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: 'Student not found!' });
    res.status(200).json({ message: 'Student deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};