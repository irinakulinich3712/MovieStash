const Movie = require('./../models/movieModel')
const getMovieCategories = require('./../src/utils/getMovieCategories');
const searchMovie = require('./../src/utils/searchMovie');
const seeMovie = require('./../src/utils/seeMovie');


exports.getSignupForm = (req, res) => {
    res.status(200).render('signup', {
      title: 'Create your account'
    });
} 

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
      title: 'Log into your account'
    });
} 



exports.getHome = (req, res) => {
    const esc = encodeURIComponent;
    const params = Object.keys(req.query)
    .map(k => esc(k) + '=' + esc(req.query[k]))
    .join('&');
   
    getMovieCategories('discover/movie', params, (err, data) => {
        if (err) {
            res.status(200).render('home', {
                title: 'Movie Stash',
                err    
            });
            
        } else {
            res.status(200).render('home', {
                title: 'Movie Stash',
                data
            }); 
        } 
    });  
}


exports.getSearchedMovie = (req, res) => {    
    const esc = encodeURIComponent;
    const params = Object.keys(req.query)
    .map(k => esc(k) + '=' + esc(req.query[k]))
    .join('&');
    searchMovie(params, (err, data) => {
        if (err) {
            res.status(200).render('home', {
                title: 'Movie Stash',
                err    
            });
            
        } else {
            res.status(200).render('home', {
                title: 'Movie Stash',
                data
            }); 
        }
       
    });  
}



exports.getTopRated = (req, res) => {    
    const esc = encodeURIComponent;
    const params = Object.keys(req.query)
    .map(k => esc(k) + '=' + esc(req.query[k]))
    .join('&');
    
    getMovieCategories('movie/top_rated', params, (err, data) => {
        if (err) {
            res.status(200).render('home', {
                title: 'Movie Stash',
                err    
            });
            
        } else {
            res.status(200).render('home', {
                title: 'Movie Stash',
                data
            }); 
        }
       
    });  
}



exports.getMovie = (req, res) => {   
    seeMovie(req.params.movieId, (err, data) => {
        if (err) {
            res.status(200).render('moviePage', {
                title: 'Movie Stash',
                err    
            });
            
        } else {
            res.status(200).render('moviePage', {
                title: 'Movie Stash',
                data
            }); 
        }
       
    });  
}


exports.getWatchlist = async (req, res) => {
    res.status(200).render('watchList', {
        title: 'My watchlist'
            });
}

exports.getFavourites = async (req, res) => {
    res.status(200).render('favourites', {
                title: 'My favourites',
            });
}

exports.getReview = async (req, res) => {
    const movieItems = await Movie.find().populate({
        path: 'reviews',
        select: 'review'
    });
    res.status(200).render('review', {
        title: 'My review',
        movieItems
    });
}