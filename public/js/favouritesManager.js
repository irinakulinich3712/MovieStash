(function(){

if(document.querySelector('.add-to-watchlist')) {
  const addToFavBtn = document.querySelector('.add-to-favourites');
  const watchlist = document.querySelector('.add-to-watchlist').getAttribute('data-watchlist');



  const addToFavlist = async (user, movieId, currentFavlist) => {
    try {
      let movieIdArray = [movieId]; 
      // if (JSON.parse(currentFavlist).length != 0) {
        for (let item of JSON.parse(currentFavlist)) {
          movieIdArray.push(item._id);
        }
      // }
      const res = await fetch(`http://127.0.0.1:8000/api/v1/users/${user}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          favourites: movieIdArray
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


  const removeFromFav = async (user, movieId, currentFavlist) => {
    try {
      let movieIdArray = []; 
      for (let item of JSON.parse(currentFavlist)) {
        movieIdArray.push(item._id);
      }
      const finalArray = movieIdArray.filter(item => item !== movieId);

      const res = await fetch(`http://127.0.0.1:8000/api/v1/users/${user}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          favourites: finalArray
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

  if (addToFavBtn) {
    addToFavBtn.addEventListener('click', () => {
      let movieId;
      const movie = addToFavBtn.getAttribute('data-movie');
      const user = addToFavBtn.getAttribute('data-user');
      const currentFavlist = addToFavBtn.getAttribute('data-fav');
      for (let item of JSON.parse(watchlist)) {
        if (item.movieId == movie ) {
          movieId = item._id;
        }
      }
      checkFavlist(user, movieId, currentFavlist);

    });
  }

  const checkFavlist = (user, movieId, currentFavlist) => {

    if (JSON.parse(currentFavlist).length != 0) {
      for (let item of JSON.parse(currentFavlist)) {
        if (item._id == movieId) {
          removeFromFav(user, movieId, currentFavlist);
          break
        } else {
          addToFavlist(user, movieId, currentFavlist);
        
        } 
      }
    } else {
      addToFavlist(user, movieId, currentFavlist);
    }
    
  }
}
})();