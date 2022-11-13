'use strict';
//-----------Element Selected--------------//
const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('btn-logout');

//-----------Variable Creation--------------//
const USER_KEY = 'CURRENT_USER';
const currentUser = JSON.parse(getFromStorage(USER_KEY)) ?? [];
// console.log(currentUser);//for check error

//-----------Function Creation--------------//
//Parse User
function parseUser(userData) {
  // prettier-ignore
  const user = new User(userData.firstName, userData.lastName, userData.username, userData.password);
  user.pageSize = userData.pageSize;
  user.category = userData.category;

  return user;
}

//------------------Event--------------------//

if (currentUser.length === 0) {
  mainContent.classList.add('d-none');
  loginModal.classList.remove('d-none');
} else {
  currentUser.splice(0, 1, parseUser(currentUser[0]));
  // console.log(currentUser); //for check error
  mainContent.classList.remove('d-none');
  loginModal.classList.add('d-none');
  welcomeMessage.textContent = `Welcome ${currentUser[0].firstName}`;
}

//Logout button event

logoutBtn.addEventListener('click', function () {
  currentUser.pop();
  removeFromStorage(USER_KEY);
  mainContent.classList.add('d-none');
  loginModal.classList.remove('d-none');
});
