const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: [true, 'movie must have movieId']
  },
  imdbId: {
    type: String
  },
  backdropPath: {
    type: String
  },
  posterPath: {
    type: String
  },
  homepage: {
    type: String
  },
  title: {
    type: String
  },
  date: {
    type: String
  },
  overview: {
    type: String
  },
  countries: {
    type: Array
  },
  genres: {
    type: Array
  },
  runtime: {
    type: String
  },
  tagline: {
    type: String
  },
  
},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

// reviewSchema.pre(/^find/, function(next) {
//   this.populate({
//       path: 'movie',
//       select: 'title'
//   }).populate({
//     path: 'user',
//     select: 'name'
//   });
//   next();
// });


// virtual populate
movieSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'movie',
  localField: '_id'
});
 
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
