'use strict';
//-----------Element Selected--------------//
const saveBtn = document.getElementById('btn-submit');
const categoryInput = document.getElementById('input-category');
const pageSizeInput = document.getElementById('input-page-size');
const form = document.querySelector('.form');

//-----------Variable Creation--------------//
const USER_KEY = 'CURRENT_USER';
const currentUser = JSON.parse(getFromStorage(USER_KEY)) ?? [];

const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY)) ?? [];

//-----------Function Creation--------------//

//Parse User
function parseUser(userData) {
  // prettier-ignore
  const user = new User(userData.firstName, userData.lastName, userData.username, userData.password);
  user.pageSize = userData.pageSize;
  user.category = userData.category;
  return user;
}

//Validate save value
function validateSave() {
  // prettier-ignore
  if(+pageSizeInput.value<1|| +pageSizeInput.value>20){
    pageSizeInput.classList.add('is-invalid')
    return false;
  }else return true;
}

//------------------Event--------------------//

userArr.forEach((user, i, arr) => arr.splice(i, 1, parseUser(user)));
if(currentUser.length !== 0) {
  currentUser.splice(0, 1, parseUser(currentUser[0]));
  categoryInput.value = currentUser[0].category;
  pageSizeInput.value = currentUser[0].pageSize;
}
//Save setting event
saveBtn.addEventListener('click', function () {
  if(currentUser.length === 0) {
    alert('Please login to do this action!');
    return;
  }
  const valid = validateSave();
  // console.log(valid);//for check error

  if (valid) {
    currentUser[0].category = categoryInput.value;
    currentUser[0].pageSize = +pageSizeInput.value;

    alert('Setting Successful!');

    //Update array
    // prettier-ignore
    const index = userArr.findIndex(user => user.username === currentUser[0].username);
    userArr.splice(index, 1, currentUser[0]);

    //Save to localStorage
    saveToStorage(USER_KEY, JSON.stringify(currentUser));
    saveToStorage(KEY, JSON.stringify(userArr));
  }
});

//Input change event
pageSizeInput.addEventListener('input', function () {
  pageSizeInput.classList.remove('is-invalid');
});
