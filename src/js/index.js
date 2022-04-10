import Navigo from "navigo";

const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const btnsAdd = document.querySelectorAll('.library__add-btn', '.header__btn-add');
const btnBack1 = document.querySelector('.add .header__btn_back');
const btnBack2 = document.querySelector('.book .header__btn_back');

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


btnsAdd.forEach(btn => {
  btn.addEventListener('click', () => {
    router.navigate('add');
  });
});

btnBack1.addEventListener('click', () => {
  console.log('back');
  router.navigate('/');
});

btnBack2.addEventListener('click', () => {
  console.log('back');
  router.navigate('/');
});

