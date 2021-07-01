const express = require('express');
const router = express.Router();

const teachers = require('../controllers/teachers');

router.route('/')
    .get(teachers.teachersIndex)
    .post(teachers.createTeacher)

router.get('/create', teachers.teacherRenderForm );
router.get('/:id/profile', teachers.teacherProfile );

module.exports = router;