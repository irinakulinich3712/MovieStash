const sidebarIcons = document.querySelector('.menu__list-icon--options');
const searchOptions = document.querySelector('.search-options');

if (sidebarIcons)
sidebarIcons.addEventListener('click', () => {
  searchOptions.classList.toggle('search-options--active');
});
