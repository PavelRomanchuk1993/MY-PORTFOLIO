document.addEventListener("DOMContentLoaded", function () {
  const artstyleBtn = document.querySelectorAll('.bottom-element__btn');
  const artstyleDropdown = document.querySelectorAll('.bottom-element__dropdown');

  artstyleBtn.forEach(btn =>
    btn.addEventListener('click', ev => {
      artstyleDropdown.forEach(dropdown => {
        if (ev.currentTarget.dataset.artstyle === dropdown.dataset.artstyle) {
          dropdown.classList.toggle('bottom-element__dropdown--is-active');
          ev.currentTarget.classList.toggle('bottom-element__btn--is-active');
        } else {
          dropdown.classList.remove('bottom-element__dropdown--is-active');
        }
      });

      artstyleBtn.forEach(btn =>
        artstyleDropdown.forEach(dropdown => {
          if (btn.dataset.artstyle === dropdown.dataset.artstyle) {
            if (!dropdown.classList.contains('bottom-element__dropdown--is-active')) {
              btn.classList.remove('bottom-element__btn--is-active');
            }
          }
        }))
    }));

  document.querySelectorAll('.bottom-element__scroll').forEach(dropdown =>
    new SimpleBar(dropdown, {
      autoHide: false,
    }));

  document.querySelector('#mob-search__btn').addEventListener('click', () => {
    document.querySelector('.header__mob-search').classList.add('is-shown');
    document.querySelector('.mob-search__wrapper').classList.add('is-shown');
  });

  document.querySelector('#close-mob-serch__btn').addEventListener('click', () => {
    document.querySelector('.header__mob-search').classList.remove('is-shown');
    document.querySelector('.mob-search__wrapper').classList.remove('is-shown');
  });

  const burgerBtn = document.querySelector('#burger-btn');
  const headerTopWrapper = document.querySelector('.header-top__wraper');
  const html = document.querySelector('html');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('is-transformed');
    headerTopWrapper.classList.toggle('is-shown');
    html.classList.toggle('no-scroll');
  });
  
  headerTopWrapper.addEventListener('scroll', () => {
    burgerBtn.classList.remove('is-hidden');
    if (headerTopWrapper.scrollTop > 0) {
      burgerBtn.classList.add('is-hidden');
    };
  });
 
  document.querySelectorAll('.list-element__link').forEach(navLink =>
    navLink.addEventListener('click', () => {
      headerTopWrapper.scrollTop = 0;
      headerTopWrapper.classList.remove('is-shown');
      html.classList.remove('no-scroll');
      burgerBtn.classList.remove('is-hidden');
      burgerBtn.classList.remove('is-transformed');
    }));
});

const heroSwiper = new Swiper('#hero__swiper', {
  slidesPerView: 1,
  speed: 3000,
  effect: 'fade',
  loop: true,
  autoplay: {
    delay: 3000,
  },
});

const element = document.querySelector('#custom-select');
const choices = new Choices(element, {
  searchEnabled: false,
  shouldSort: false,
  allowHTML: true,
  itemSelectText: ''
});

const checkboxes = document.querySelectorAll('.gallery-left__check');
checkboxes.forEach(checkbox =>
  checkbox.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      e.currentTarget.childNodes[1].toggleAttribute('checked');
    }
  }));

checkboxes.forEach(checkbox =>
  checkbox.addEventListener('click', e => {
    e.preventDefault();
    e.currentTarget.childNodes[1].toggleAttribute('checked');
  }));

const swiper1 = new Swiper('.gallery__swiper', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  loop: false,
  spaceBetween: 50,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    clickable: true,
    observer: true,
    resizeObserver: true,
    centeredSlides: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    50: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    500: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 35,
    },
    1366: {
      slidesPerView: 3,
      slidesPerGroup: 3,

    },
  },
});

$(".accordion").accordion({
  heightStyle: "content",
  collapsible: true,
  active: 0,
});

document.querySelectorAll('.accordion-periods__btn').forEach(function (tabsBtn) {
  tabsBtn.addEventListener('click', function (e) {
    const path = e.currentTarget.dataset.path;
    document.querySelectorAll('.accordion-periods__btn').forEach(function (btn) {
      btn.classList.remove('accordion-periods__btn--active')
    });
    e.currentTarget.classList.add('accordion-periods__btn--active');
    document.querySelectorAll('.era__painters').forEach(function (tabsBtn) {
      tabsBtn.classList.remove('era__painters--active')
    });
    document.querySelector(`[data-target="${path}"]`).classList.add('era__painters--active');
  });
});

tippy('#tooltip1', {
  theme: 'custom',
  content: "Пример современных тенденций - современная методология разработки",
  duration: [600, 600],
  maxWidth: 270,
});
tippy('#tooltip2', {
  theme: 'custom',
  content: "Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции",
  duration: [600, 600],
  maxWidth: 270,
});
tippy('#tooltip3', {
  theme: 'custom',
  content: "В стремлении повысить качество",
  duration: [600, 600],
  maxWidth: 270,
});

const swiper2 = new Swiper('.events__swiper', {
  spaceBetween: 50,
  loop: false,
  pagination: {
    el: '.events-swiper__boolit',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    50: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    500: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
    },
    942: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 25,
    },
    1025: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    }
  },
});
const swiper3 = new Swiper('.projects__swiper', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  loop: false,
  spaceBetween: 45,
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    50: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    500: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 35,
    },
    1366: {
      slidesPerView: 3,
      slidesPerGroup: 3,

    },
  },
});

var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7(999) 999-99-99");
im.mask(selector);
new JustValidate('.details__form', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 10
    },
    phone: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },
  },
  messages: {
    name: {
      minLength: 'Недопустимый формат',
      maxLength: 'Недопустимый формат',
      required: 'Недопустимый формат',
    },
    phone: {
      required: 'Недопустимый формат',
      function: 'Недопустимый формат',
    }
  },
});
new window.JustValidate('.js-validate-error-label', {
  colorWrong: '#D11616'
});







