// Setup
const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

// create, read, update, delete routes for an equipment item

// GET request for read all ingredients
router.get('/', equipmentController.read);

// GET request to search Equipment
router.get('/search', equipmentController.search);

// POST request to create Equipment
router.post('/create', equipmentController.create);

// POST request to update Equipment
router.post('/update', equipmentController.update);

// POST request to delete Equipment
router.post('/delete', equipmentController.delete);

module.exports = router;