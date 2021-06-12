const form = document.querySelector('.form--login');

const login = async (email, password) => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
    })
    });
    const data = await res.json();
    if (data.status === 'success') {
      location.assign('/');
    }
  } catch (err) {
    alert('error');
  }
};

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}







