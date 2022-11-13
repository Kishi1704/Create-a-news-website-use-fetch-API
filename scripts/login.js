'use strict';
//-----------Element Selected--------------//
const loginBtn = document.getElementById('btn-submit');
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const togglePassword = document.getElementById('togglePassword');
const form = document.querySelector('.form');

//-----------Variable Creation--------------//
const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY)) ?? [];

const USER_KEY = 'CURRENT_USER';
// console.log(userArr);//for check error

//-----------Function Creation--------------//
//Parse User
function parseUser(userData) {
  // prettier-ignore
  const user = new User(userData.firstName, userData.lastName, userData.username, userData.password);
  user.pageSize = userData.pageSize;
  user.category = userData.category;

  return user;
}

//Fill out check
const blankCheck = el => {
  if (el.value === '') {
    el.classList.add('is-invalid');
    return false;
  } else return true;
};

//Login check
const loginCheck = () => {
  if (
    userArr.some(
      user =>
        user.username === usernameInput.value &&
        user.password === passwordInput.value
    )
  )
    return true;
  else if (
    userArr.some(
      user =>
        user.username === usernameInput.value &&
        user.password !== passwordInput.value
    )
  ) {
    passwordInput.classList.add('is-invalid');
    return false;
  } else {
    usernameInput.classList.add('is-invalid');
    passwordInput.classList.add('is-invalid');
    return false;
  }
};

//Login Validation
const validateLogin = function () {
  //Fill out
  if (!blankCheck(usernameInput) || !blankCheck(passwordInput)) return false;

  //Login check
  return loginCheck();
};
//------------------Event--------------------//
//ParseUser
userArr.forEach((user, i, arr) => arr.splice(i, 1, parseUser(user)));
// console.log(userArr); //for check error

//Login button event
loginBtn.addEventListener('click', function () {
  const valid = validateLogin();
  // console.log(valid);//for check error

  if (valid) {
    //Get current user
    const currentUser = userArr.filter(
      user => user.username === usernameInput.value
    );
    //Save current user to localStorage
    saveToStorage(USER_KEY, JSON.stringify(currentUser));

    //Clear input
    usernameInput.value = '';

    //Go to Login page
    window.location.href = '../index.html';
  }
});

//Input change event
form.addEventListener('input', function (e) {
  if (e.target.classList.contains('form-control'))
    e.target.classList.remove('is-invalid');
});

//Password event
togglePassword.addEventListener('click', function () {
  // toggle the type attribute
  // prettier-ignore
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // toggle the icon
  this.classList.toggle('fa-eye-slash');
  this.classList.toggle('fa-eye');
});
