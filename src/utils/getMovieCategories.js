const request = require('request');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});


const getMovieCategories = (query, params, callback) => {

  const url = `${process.env.API_URL}/${query}?api_key=${process.env.API_KEY}&${params}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
     callback('Unable to get the movies data', undefined)
    } 
    else if (body.status_code === 34) {
      callback('The resource you requested could not be found');
    } else {
      const movies = body.results.map(movie => {
        return {
          id: movie.id,
          posterPath: `${process.env.POSTER_URL}${movie.poster_path}`,
          title: movie.original_title,
          date: movie.release_date
        }
      });
      const data = {
        movies,
        pages: body.total_pages,
        currentPage: body.page
      }
      callback(undefined, data);
    }
  });
}

module.exports = getMovieCategories;




