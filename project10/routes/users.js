const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { getAllUsers, getUserById, createUser } = require('../controllers/users');

router.route('/').get(getAllUsers).post(createUser)
router.get('/:id', getUserById);

module.exports = router;