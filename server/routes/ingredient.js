// Setup
const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

// create, read, update, delete routes for an ingredient

// GET request for read all ingredients
router.get('/', ingredientController.read);

// GET request to search Ingredients
router.get('/search', ingredientController.search);

// POST request to create Ingredient
router.post('/create', ingredientController.create);

// POST request to update Ingredient
router.post('/update', ingredientController.update);

// POST request to delete Ingredient
router.post('/delete', ingredientController.delete);

module.exports = router;