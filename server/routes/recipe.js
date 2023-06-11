// Setup
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// create, read, update, delete routes for a recipe item

// GET request for read all ingredients
router.get('/', recipeController.read);

// GET request to search Recipes
router.get('/search', recipeController.search);

// POST request to create Recipe
router.post('/create', recipeController.create);

// POST request to update Recipe
router.post('/update', recipeController.update);

// POST request to delete Recipe
router.post('/delete', recipeController.delete);

module.exports = router;