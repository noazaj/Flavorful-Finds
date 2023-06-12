// Setup
const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// create, read, update, delete routes for a rating item

// GET request for read all ratings
router.get('/', ratingController.read);

// GET request to search Ratings
router.get('/search', ratingController.search);

// POST request to create Rating
router.post('/create', ratingController.create);

// POST request to update Rating
router.post('/update', ratingController.update);

// POST request to delete Rating
router.post('/delete', ratingController.delete);

module.exports = router;