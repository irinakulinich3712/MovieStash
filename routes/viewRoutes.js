const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');





const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getHome);


router.get('/signup', viewController.getSignupForm);
router.get('/login', viewController.getLoginForm);

router.get('/top-rated', viewController.getTopRated);

router.get('/search', viewController.getSearchedMovie);

router.get('/my-watchlist', authController.protect, viewController.getWatchlist);
router.get('/my-favourites', authController.protect, viewController.getFavourites);
router.get('/my-review', authController.protect, viewController.getReview);
router.get('/:movieId', viewController.getMovie);




module.exports = router;