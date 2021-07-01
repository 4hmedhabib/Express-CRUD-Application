const express = require('express')
const router = express.Router()

const parents = require('../controllers/parents')

router.route('/')
    .get(parents.parentsIndex)
    .post(parents.createParent)

router.get('/create', parents.parentsRenderForm );
router.get('/:id/profile', parents.parentProfile );

module.exports = router;