import Navigo from "navigo";

const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.add-new-book-btn');

const backBtns = document.querySelectorAll('.header__btn_back:not(.add__btn-back)');
const addBackBtn = document.querySelector('.add__btn-back');

const btnSearch = document.querySelectorAll('.header__btn_search');
const search = document.querySelector('.search');
const closeBtn = document.querySelector('.search__close-btn');
const fieldsBtnSort = document.querySelector('.fields__btn_sort');
const fieldsListSort = document.querySelector('.fields__list_sort');
const fieldsBtnFilter = document.querySelector('.fields__btn_filter');
const fieldsListFilter = document.querySelector('.fields__list_filter');



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
    document.body.classList.remove('body_gradient');
  },
  'book': () => {
    closeAllPages();
    book.classList.remove('hidden');
    document.body.classList.add('body_gradient');
  },
  'add': () => {
    closeAllPages();
    add.classList.remove('hidden');
    document.body.classList.add('body_gradient');
  }
}).resolve();


addBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    router.navigate('add');
  });
});

backBtns.forEach(btn => {
  btn.addEventListener('click', () => {
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
    document.body.addEventListener('click', closeSearch, true);
  });
});

closeBtn.addEventListener('click', () => {
  search.classList.remove('search_active');
  document.body.removeEventListener('click', closeSearch);
});

const controlField = (btn, list, listToRemove) => {
  btn.addEventListener('click', () => {
    list.classList.toggle('fields__list_active');
    listToRemove.classList.remove('fields__list_active');
  });

  list.addEventListener('click', ({target}) => {
    if (target.classList.contains('fields__list-btn')) {
      list.classList.remove('fields__list_active');
    }
  });
};

controlField(fieldsBtnSort, fieldsListSort, fieldsListFilter);
controlField(fieldsBtnFilter, fieldsListFilter, fieldsListSort);

const changeFieldset = () => {
  const fieldsets = document.querySelectorAll('.add__fieldset');
  const addBtn = document.querySelector('.add__btn');
  const form = document.querySelector('.add__form');

  let count = 0;

  addBtn.addEventListener('click', ({target}) => {
    const fieldset = fieldsets[count];

    let isValid = true;

    for (const elem of fieldset.elements) {
      if (!elem.checkValidity()) {
        elem.classList.add('no-valid');
        isValid = false;
      } else {
        elem.classList.remove('no-valid');
      }
    }

    if (isValid) {
      count += 1;

      if (count === fieldsets.length - 1) {
        addBtn.textContent = 'Добавить книгу';
      }

      if (count === fieldsets.length) {

        const dataIsLoaded = true; // информация с сервера

        if (dataIsLoaded) {
          form.reset();
          router.navigate('/');
          count = 0;
          addBtn.textContent = 'Далее';
        }
      }

      fieldset.classList.add('hidden');

      fieldsets[count].classList.remove('hidden');
    }
  });

  addBackBtn.addEventListener('click', ({target}) => {
    const fieldset = fieldsets[count];

    count -= 1;

    if (count === - 1) {
      form.reset();
      router.navigate('/');
      count = 0;
      addBtn.textContent = 'Далее';
    }

    if (count < fieldsets.length - 1) {
      addBtn.textContent = 'Далее';

      fieldset.classList.add('hidden');

      fieldsets[count].classList.remove('hidden');
    }
  });
};

changeFieldset();


