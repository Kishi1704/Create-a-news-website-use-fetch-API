'use strict';
//-----------Element Selected--------------//
const registerBtn = document.getElementById('btn-submit');
const firstNameInput = document.getElementById('input-firstname');
const lastNameInput = document.getElementById('input-lastname');
const usernameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const passwordCfInput = document.getElementById('input-password-confirm');
const togglePassword = document.getElementById('togglePassword');
const togglePasswordCf = document.getElementById('togglePasswordCf');
const form = document.querySelector('.form');

//-----------Variable Creation--------------//
const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY)) ?? [];
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

// Fill out check
const blankCheck = el => {
  if (el.value === '') {
    el.classList.add('is-invalid');
    return false;
  } else return true;
};

//Register validation
const validateRegister = function () {
  //Fill out
  if (
    !blankCheck(firstNameInput) ||
    !blankCheck(lastNameInput) ||
    !blankCheck(usernameInput) ||
    !blankCheck(passwordInput) ||
    !blankCheck(passwordCfInput)
  )
    return false;

  //Username check
  for (const user of userArr) {
    if (user.username === usernameInput.value) {
      usernameInput.classList.add('is-invalid');
      return false;
    }
  }

  // Password check
  if (passwordCfInput.value !== passwordInput.value) {
    passwordCfInput.classList.add('is-invalid');
    return false;
  }

  if (passwordInput.value.length <= 8) {
    passwordInput.classList.add('is-invalid');
    return false;
  }
  return true;
};

//Clear input
function inputClear() {
  firstNameInput.value = '';
  lastNameInput.value = '';
  usernameInput.value = '';
}

//Password

function passwordControl(el) {
  // toggle the type attribute
  // prettier-ignore
  const type = el.getAttribute('type') === 'password' ? 'text' : 'password';
  el.setAttribute('type', type);

  // toggle the icon
  this.classList.toggle('fa-eye-slash');
  this.classList.toggle('fa-eye');
}

//------------------Event--------------------//

//ParseUser
userArr?.forEach((user, i, arr) => arr.splice(i, 1, parseUser(user)));
// console.log(userArr); //for check error

//Register event
registerBtn.addEventListener('click', function () {
  const valid = validateRegister();
  // console.log(valid); //for check error
  if (valid) {
    //Create new user
    // prettier-ignore
    const user = new User(firstNameInput.value, lastNameInput.value, usernameInput.value, passwordInput.value);
    userArr.push(user);
    // console.log(userArr);//for check error

    //Save to localStorage
    saveToStorage(KEY, JSON.stringify(userArr));

    //Clear input
    inputClear();

    //Go to Login page
    window.location.href = 'login.html';
  }
});

//Input change event
form.addEventListener('input', function (e) {
  if (e.target.classList.contains('form-control'))
    e.target.classList.remove('is-invalid');
});

//Password event
togglePassword.addEventListener('click', function () {
  passwordControl.call(this, passwordInput);
});

togglePasswordCf.addEventListener('click', function () {
  passwordControl.call(this, passwordCfInput);
});
