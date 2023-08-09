'use strict';
//-----------Element Selected--------------//
const newsContainer = document.getElementById('news-container');
const prevBtn = document.getElementById('btn-prev');
const disablePrevBtn = prevBtn.parentElement;
const nextBtn = document.getElementById('btn-next');
const disableNextBtn = nextBtn.parentElement;
const pageNum = document.getElementById('page-num');
//-----------Variable Creation--------------//
const USER_KEY = 'CURRENT_USER';
const currentUser = JSON.parse(getFromStorage(USER_KEY)) ?? [];
// console.log(currentUser);//for check error
const pageSize = currentUser.length !== 0 ? currentUser[0].pageSize : 5;
let page = 1;
let totalArticles;

//-----------Function Creation--------------//
//Parse User
function parseUser(userData) {
  // prettier-ignore
  const user = new User(userData.firstName, userData.lastName, userData.username, userData.password);
  user.pageSize = userData.pageSize;
  user.category = userData.category;
  return user;
}

//Display news
if (currentUser.length !== 0) {
  currentUser.splice(0, 1, parseUser(currentUser[0]));
}
// console.log(currentUser);//for check error

async function displayNews(page) {
  try {
    newsContainer.innerHTML = '';

    const data = await currentUser[0]?.getNews(page);
    // console.log(data);//for check error
    if (data == null) {
      return;
    }
    
    for (const article of data.articles) {
      const html = `
          <div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
              <div class="row no-gutters">
                <div class="col-md-4">
                  <img src=${article.urlToImage}
                    class="card-img"
                    alt=${article.title}>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href=${article.url}
                      class="btn btn-primary">View</a>
                  </div>
                </div>
              </div>
            </div>
        </div>`;
      newsContainer.insertAdjacentHTML('beforeend', html);
    }
  } catch (err) {
    console.error(err.message);
    const html = `<p style='text-align:center'>Some thing went wrong. Please try again!<br>${err.message}<p>`;
    newsContainer.insertAdjacentHTML('beforeend', html);
  }
}

// Next slide
const nextPage = maxPage => {
  disablePrevBtn.classList.remove('disabled');
  page++;
  if (page === maxPage) disableNextBtn.classList.add('disabled');
  pageNum.textContent = page;
  displayNews(page);
};

// Prev slide
const prevPage = () => {
  disableNextBtn.classList.remove('disabled');
  page--;
  if (page === 1) disablePrevBtn.classList.add('disabled');
  pageNum.textContent = page;
  displayNews(page);
};

//------------------Initial-------------//
displayNews(page);

// Move Page
(async function () {
  try {
    const data = await currentUser[0]?.getNews();
    
    totalArticles = data == null ? 0 : data.totalResults;
    const maxPage = Math.ceil(totalArticles / pageSize);
    if (maxPage === 1 || maxPage === 0) disableNextBtn.classList.add('disabled');

    disablePrevBtn.classList.add('disabled');

    nextBtn.addEventListener('click', function () {
      nextPage(maxPage);
    });
    prevBtn.addEventListener('click', function () {
      prevPage();
    });
  } catch (err) {
    console.error(err.message);
  }
})();
