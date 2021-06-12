(function(){
  const modalBtn = document.querySelector('.add-review ');
  const modalwindow = document.querySelector('.modal-window');
  
  if(modalBtn)
  modalBtn.addEventListener('click', () => {
    modalwindow.classList.add('modal-window--active');
  });
  
  if(document.querySelector('.modal-window__close'))
  document.querySelector('.modal-window__close').addEventListener('click', () => {
    modalwindow.classList.remove('modal-window--active');
  });




  const save = document.querySelector('.modal-window__save');
  const addReview = async (text, user, movieId) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/app/v1/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          review: text,
          "user": user,
          "movie": movieId
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        console.log(data)
        const movieReview = data.data.review.movie;
        const review = data.data.review.review;
        exportMovie(movieReview);
      }
    } catch (err) {
      alert(err);
    }
  }

  const exportMovie = (movieReview) => {
    localStorage.setItem('review', movieReview);
    location.assign('http://127.0.0.1:8000/my-review')
  }




  if (save) {
    save.addEventListener('click', () => {
      
      const text= document.querySelector('.modal-window textarea').value;
      const user = save.getAttribute('data-user-id');
      const movie = save.getAttribute('data-movie-id');
      let movieId;
      const currentFavlist = document.querySelector('.add-to-favourites').getAttribute('data-fav');
      for (let item of JSON.parse(currentFavlist)) {
        if (item.movieId == movie ) {
          movieId = item._id;
        }
      }
      addReview(text, user, movieId);

    });
  }

  

})();