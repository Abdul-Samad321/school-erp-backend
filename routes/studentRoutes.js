const express = require('express');
const router = express.Router();
const { addStudent, getStudents, payFee, searchStudent, editStudent, deleteStudent } = require('../controllers/studentController'); // deleteStudent import kiya

router.post('/add', addStudent);
router.get('/all', getStudents);
router.get('/search/:studentClass/:rollNo', searchStudent);
router.post('/pay', payFee);
router.put('/edit/:id', editStudent);
router.delete('/delete/:id', deleteStudent); // Naya Delete Route

module.exports = router;