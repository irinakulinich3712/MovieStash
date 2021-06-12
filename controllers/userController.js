const User = require('../models/userModel');
const catchAsync = require('../src/utils/catchAsync');
const AppError = require('../src/utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users,
    },
  });
});


exports.getUser = catchAsync(async (req, res) => {
  try {
      const user = await User.findById(req.params.id);

      res.status(200).json({
          status: 'success',
          data: {
              user
          }
      });
  } catch(err) {
      res.status(400).json({
          status: 'fail',
          message: err
      });
  }
});

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        
        // let updatedUser = await User.findByIdAndUpdate(
        //     req.params.id,
        //     {
        //       $addToSet: { watchlist: req.body.movieId },
        //     },
        //     {
        //       new: true,
        //       safe: true,
        //       upsert: true,
        //     }
        //   );
          
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteUser = catchAsync(async (req, res) => {
  try {
      await User.findByIdAndDelete(req.params.id);
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




