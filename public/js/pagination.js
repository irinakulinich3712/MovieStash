const prev = document.querySelector('.pagination__item--prev');
const next = document.querySelector('.pagination__item--next');
const pagination = document.querySelector('.pagination');
const currentUrl = new URL(window.location.href);

if (pagination) {

  const totalPages = pagination.getAttribute('data-pages');
  let currentPage = Number(pagination.getAttribute('data-page'));


prev.addEventListener('click', () => {
  currentPage -= 1;
  currentUrl.searchParams.set('page', currentPage);
  location.assign(currentUrl);
  if (currentPage <= 1) {
    currentUrl.searchParams.delete('page');
    location.assign(currentUrl);
  } 
});

next.addEventListener('click', () => {
  currentPage += 1;
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  currentUrl.searchParams.set('page', currentPage);
  location.assign(currentUrl);
});

}