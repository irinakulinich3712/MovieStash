const path = require('path');
const express = require('express');
const viewRouter = require('./../routes/viewRoutes');
const userRouter = require('./../routes/userRoutes');
const movieRouter = require('../routes/movieRoutes');
const reviewRouter = require('./../routes/reviewRoutes');
const searchMovie = require('./utils/searchMovie');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');






const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));


// searchMovie('Joe Black', (err, data) => {
  
// });




// 1) GLOBAL MIDDLEWARES


// Limit requests from same IP
const limiter = rateLimit({
  max: 300,
  window: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser());

// Serving static files
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static(path.join(__dirname, 'dist')));


// ROUTes

app.use('/', viewRouter);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/app/v1/reviews', reviewRouter);

module.exports = app;