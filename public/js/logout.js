const logout = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/v1/users/logout', { method: 'GET' });
    const data = await res.json();
    if ((data.status = 'success')) {
        location.assign('/login');
    }
  } catch (err) {
    console.log(err);
  }
};

document.querySelector('.user-block__el--logout').addEventListener('click', logout);
