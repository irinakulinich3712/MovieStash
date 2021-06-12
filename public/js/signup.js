const signupForm = document.querySelector('.form--signup');

const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/v1/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name,
        password,
        passwordConfirm,
    })
    });
    const data = await res.json();
    console.log(data)
    if (data.status === 'success') {
      location.assign('/');
    }
  } catch (err) {
    alert('error');
  }
};

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password-signup').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

