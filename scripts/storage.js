'use strict';
//Save data to Local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//Get data from Local storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

//Delete item from Local storage

function removeFromStorage(key) {
  localStorage.removeItem(key);
}
