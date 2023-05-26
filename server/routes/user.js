// Setup
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// create, read, update, delete routes for a user

// GET request for read all users
router.get('/', userController.read);

// GET request to search users
router.get('/search', userController.search);

// POST request to create user
router.post('/create', userController.create);

// POST request to update user
router.post('/update', userController.update);

// DELETE request to delete user
router.post('/delete', userController.delete);

module.exports = router;
