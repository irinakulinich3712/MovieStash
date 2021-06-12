const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty'],
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: [true, 'Review must belong to a movie']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  }, 
},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

reviewSchema.index({ movie: 1, user: 1 }, { unique: true })

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
