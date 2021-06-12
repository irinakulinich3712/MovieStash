const request = require('request');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const seeMovie = (movieId, callback) => {
  const url = `${process.env.API_URL}/movie/${movieId}?api_key=${process.env.API_KEY}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
     callback('Unable to get the movies data', undefined)
    } 
    else if (body.status_code === 34) {
      callback('The resource you requested could not be found');
    } else {
      const data = {
        movieId: body.id,
        imdbId: body.imdb_id,
        backdropPath: `${process.env.POSTER_URL}${body.backdrop_path}`,
        posterPath: `${process.env.POSTER_URL}${body.poster_path}`,
        homepage: body.homepage,
        title: body.original_title,
        date: body.release_date,
        overview: body.overview,
        countries: body.production_countries,
        genres: body.genres,
        runtime: body.runtime,
        tagline: body.tagline
      };  
      callback(undefined, data);
    }
  });
}

module.exports = seeMovie;