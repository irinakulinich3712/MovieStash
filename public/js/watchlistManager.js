const addToWatchlistBtn = document.querySelector('.add-to-watchlist');
const imdb = document.querySelector('.see-at-imdb');

const addToMovielist = async (movie, user, currentWatchlist) => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/v1/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: movie
    });
    const data = await res.json();
    const movieId = data.data.id;
    if (data.status === 'success' || JSON.parse(currentWatchlist).length == 0) {
      addToWatchlist(user, movieId, currentWatchlist);
    }
    else if (data.status === 'existing') {

      checkWatchlist(user, movieId, currentWatchlist);
    }
  } catch (err) {
    alert(err);
  }
};

if (addToWatchlistBtn) {
  addToWatchlistBtn.addEventListener('click', () => {
    const movie = addToWatchlistBtn.getAttribute('data-movie');
    const user = addToWatchlistBtn.getAttribute('data-user');
    const currentWatchlist = addToWatchlistBtn.getAttribute('data-watchlist');
    addToMovielist(movie, user, currentWatchlist);
  });
}


const addToWatchlist = async (user, movieId, currentWatchlist) => {

  try {
    let movieIdArray = [movieId]; 
    for (let item of JSON.parse(currentWatchlist)) {
      movieIdArray.push(item._id);
    }

    const res = await fetch(`http://127.0.0.1:8000/api/v1/users/${user}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        watchlist: movieIdArray
      })
    });
    const data = await res.json();
    if (data.status === 'success') {
      location.reload();
    }
  } catch (err) {
    alert(err);
  }
}


const removeFromWatchlist = async (user, movieId, currentWatchlist) => {
  try {
    let movieIdArray = []; 
    for (let item of JSON.parse(currentWatchlist)) {
      movieIdArray.push(item._id);
    }
    const finalArray = movieIdArray.filter(item => item !== movieId);

    const res = await fetch(`http://127.0.0.1:8000/api/v1/users/${user}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        watchlist: finalArray
      })
    });
    const data = await res.json();
    if (data.status === 'success') {
      location.reload();
    }
  } catch (err) {
    alert(err);
  }
}


const checkWatchlist = (user, movieId, currentWatchlist) => {
  for (let item of JSON.parse(currentWatchlist)) {
    console.log(item._id)
    if (item._id == movieId) {
      removeFromWatchlist(user, movieId, currentWatchlist);
      break
    } else {
      addToWatchlist(user, movieId, currentWatchlist);
    } 
  }
}