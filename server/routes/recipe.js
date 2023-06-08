// Setup
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// create, read, update, delete routes for a recipe item

// GET request for read all ingredients
router.get('/', recipeController.read);

module.exports = router;