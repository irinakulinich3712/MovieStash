const request = require('request');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const searchMovie = (params, callback) => {
  const url = `${process.env.API_URL}/search/movie?api_key=${process.env.API_KEY}&${params}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
     callback('Unable to get the movies data', undefined)
    } 
    else if (body.results == undefined || body.results.length == 0) {
      callback('Movie not found. Try another search');
    } else if (body.results) {
      const movies = body.results.map(movie => {
        return {
          id: movie.id,
          posterPath: `${process.env.POSTER_URL}${movie.poster_path}`,
          title: movie.original_title,
          date: movie.release_date,
        }
      });
      const finalData = {
        movies,
        pages: body.total_pages,
        currentPage: body.page
      }
      callback(undefined, finalData);
    }
  });
}

module.exports = searchMovie;