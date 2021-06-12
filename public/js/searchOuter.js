const searchOuter = document.querySelector('.search__field');
const searchOuterForm = document.querySelector('.search');
const myUrl = new URL('http://127.0.0.1:8000/search');


searchOuterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (searchOuter.value != '') {
    myUrl.searchParams.set('query', searchOuter.value);
    window.location.href = myUrl;
  }
});
