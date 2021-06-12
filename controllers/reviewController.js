const Review = require('../models/reviewModel');
const catchAsync = require('../src/utils/catchAsync');
const AppError = require('../src/utils/appError');



exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: {
      reviews,
    },
  });
});


exports.getReview = catchAsync(async (req, res) => {
  try {
      const review = await Review.findById(req.params.id);

      res.status(200).json({
          status: 'success',
          data: {
              review
          }
      });
  } catch(err) {
      res.status(400).json({
          status: 'fail',
          message: err
      });
  }
});

exports.createReview = catchAsync(async (req, res) => {
  try {
      const review = await Review.create(req.body);

      res.status(200).json({
          status: 'success',
          data: {
              review
          }
      });
  } catch(err) {
      res.status(400).json({
          status: 'fail',
          message: err
      });
  }
});

exports.updateReview = catchAsync(async (req, res) => {
  try {
      const review = await Review.findByIdAndUpdate(req.params.id);
      res.status(200).json({
          status: 'success',
          data: {
              review
          }
      });
  } catch(err) {
      res.status(404).json({
          status: 'fail',
          message: err
      });
  }
});

exports.deleteReview = catchAsync(async (req, res) => {
  try {
      await Review.findByIdAndDelete(req.params.id);
      res.status(200).json({
          status: 'success',
          data: null
      });
  } catch(err) {
      res.status(404).json({
          status: 'fail',
          message: err
      });
  }
});
