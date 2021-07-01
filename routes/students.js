const express = require('express');
const router = express.Router();

const students = require('../controllers/students');

router.route('/')
    .get(students.studentsIndex)
    .post(students.createStudent)


router.get('/create', students.studentRenderForm );
router.get('/:id/profile', students.studentProfile );
router.get('/:parentId/create', students.studentRenderForm2 );
router.post('/:parentId', students.createStudent2 );


module.exports = router;

