// Setup
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// create, read, update, delete routes for a user

// GET request for read all users
router.get('/', userController.read)

module.exports = router;