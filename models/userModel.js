const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    // trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please tell us your email'],
    unique: true,
    lowercase: true,
    // trim: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    // trim: true,
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm a password'],
    validate: {
      // Works ONLY on CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    }
  },
  passwordChangedAt: Date,
  watchlist: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie'
    }
  ],
  favourites: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Movie'
    }
  ]
},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});


userSchema.pre('save', async function (next) {
  // refers to current doc
  //   runs func if pass was modified
  if (!this.isModified('password')) return next();

  //   hash has the pass with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //   del the passConf field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
}
userSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'user',
  localField: '_id'
});

// casual populate
userSchema.pre(/^find/, function(next) {
  this.populate({
      path: 'watchlist',
      select: ['title', 'date', 'posterPath', 'movieId']
  }).populate({
    path: 'favourites',
    select: ['title', 'date', 'posterPath', 'movieId']
  });
  next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;
