// Setup
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// create, read, update, delete routes for a user

// GET request for read
router.get('/', indexController.read)

module.exports = router;