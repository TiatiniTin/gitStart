import Navigo from "navigo";

const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.library__add-btn', '.header__btn-add');
const backBtns = document.querySelectorAll('.header__btn_back');
const btnSearch = document.querySelectorAll('.header__btn_search');
const search = document.querySelector('.search');

const router = new Navigo( '/',{
  hash: true,
});

const closeAllPages = () => {
  library.classList.add('hidden');
  book.classList.add('hidden');
  add.classList.add('hidden');

};

router.on({
  '/':() => {
    closeAllPages();
    library.classList.remove('hidden');
  },
  'book': () => {
    closeAllPages();
    book.classList.remove('hidden');


  },
  'add': () => {
    closeAllPages();
    add.classList.remove('hidden');


  }
}).resolve();


addBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    search.classList.remove('search_active');
    router.navigate('add');
  });
});

backBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    search.classList.remove('search_active');
    router.navigate('/');
  });
});

const closeSearch = ({target}) => {
  if (target.closest('.search, .header__btn_search')) {
    return;
  }

  search.classList.remove('search_active');
  document.body.removeEventListener('click', closeSearch);
};

btnSearch.forEach(btn => {
  btn.addEventListener('click', () => {
    search.classList.add('search_active');
    document.body.addEventListener('click', closeSearch);
  });
});



