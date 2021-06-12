const User = require('../models/userModel');
const Movie = require('../models/movieModel');

// const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../src/utils/catchAsync');
const AppError = require('../src/utils/appError');


// exports.getWatchlist =  async (req, res) => {
//   try {
//       // BUILD QUERY
//       // 1) FILTERING
//       // const queryObj = {...req.query}; 
//       // const excludedFieds = ['page', 'sort', 'limit', 'fields'];
//       // excludedFieds.forEach(el => delete queryObj[el]);

//       // let query = Group.find(queryObj);
//       // 2) SORTING
//       // if (req.query.sort) {
//       //     const sortBy = req.query.sort.split(',').join(' ');
//       //     query = query.sort(sortBy);
//       //     // sort('year name')
//       // } 

//       // EXECUTE QUERY 
//       const features = new APIFeatures(Watchlist.find(), req.query).filter().sort();
//       // const groups = await query;
//       const watchlist = await features.query;

      
//       // SEND RESPONSE 
//       res.status(200).json({
//           status: 'success',
//           results: watchlist.length,
//           data: {
//               watchlist
//           } 
//       });
//   } catch(err) {
//       res.status(404).json({
//           status: 'fail',
//           message: err
//       });
//   }
// };

exports.getMovie = catchAsync(async (req, res) => {
    try {
        const movie = await Movie.find();
        res.status(200).json({
            status: 'success',
            results: movie.length,
            data: {
                movie
            } 
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
  });

exports.getMovieItem = catchAsync(async (req, res) => {
  try {
      const movieItem = await Movie.findById(req.params.id).populate('reviews');
        res.status(200).json({
            status: 'success',
            data: {
            movieItem 
            }
        });
  } catch(err) {
      res.status(404).json({
          status: 'fail',
          message: err
      });
  }
});



exports.deleteMovieItem = catchAsync(async (req, res) => {
  try {
      await movie.findByIdAndDelete(req.params.id);
      res.status(204).json({
          status: 'success',
          data: null
      });
  } catch (err) {
      res.status(404).json({
          status: 'fail',
          message: err
      });
  }

});

exports.createMovieItem = catchAsync(async (req, res) => {
  try {
      const existing = await Movie.findOne(req.body);
      if (existing != null) {
        res.status(200).json({
            status: 'existing',
            data: {
                id: existing._id
            }
           
        }); 
      }
      else {
        const newMovieItem = await Movie.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
               id: newMovieItem._id
            }
        });
      }
  
  } catch (err) {
      res.status(400).json({
          status: 'fail', 
          message: err
      });
  }

});

exports.updateMovieItem = catchAsync(async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
  });