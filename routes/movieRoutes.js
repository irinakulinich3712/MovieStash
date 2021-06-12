const express = require('express');
const movieController = require('../controllers/movieController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, movieController.getMovie)
  .post(authController.protect, movieController.createMovieItem)
router
  .route('/:id')
  .get(authController.protect, movieController.getMovieItem)
  .patch(authController.protect, movieController.updateMovieItem)
  .delete(authController.protect, authController.restrictTo('admin'), movieController.deleteMovieItem);

module.exports = router;
