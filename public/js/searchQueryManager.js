(function(){
  const genres = document.querySelectorAll('.genre');
  const currentUrl = new URL(window.location.href);

  genres.forEach(genre => {
    genre.addEventListener('click', () => {
      const genreId = genre.getAttribute('data-genre');
      currentUrl.searchParams.set('with_genres', genreId);
      location.assign(currentUrl);
    });
  });

})();