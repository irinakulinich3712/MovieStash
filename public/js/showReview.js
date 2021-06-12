
    if (localStorage.getItem('review')) {
      const movieId = localStorage.getItem('review');
      const movies = document.querySelectorAll('.reviewMovie');
      for (let item of movies) {
        if (item.getAttribute('data-id') != movieId) {
     
          item.remove();
        }
        
      }
  
      localStorage.removeItem('review');
  }