const express = require('express')
const router = express.Router();

const classes = require('../controllers/classes')

router.route('/')
    .get(classes.classesIndex)
    .post(classes.createClass)

router.get('/create', classes.classesRenderForm);
router.get('/:id/profile', classes.classProfile)

module.exports = router;