document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    loop: true,
    pagination: {
    el: '.swiper-pagination',
    clickable: true
    },
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
    });
document.querySelectorAll('.tabs-nav__btn').forEach(function(tabsBtn){
  tabsBtn.addEventListener('click', function(e){
  const path = e.currentTarget.dataset.path;
  document.querySelectorAll('.tabs-nav__btn').forEach(function(btn){
  btn.classList.remove('tabs-nav__btn--active')});
  e.currentTarget.classList.add('tabs-nav__btn--active');
  document.querySelectorAll('.tabs-item').forEach(function(tabsBtn){
  tabsBtn.classList.remove('tabs-item--active')});
  document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active');
  });
  });
  $(".accordion").accordion({
    collapsible: true,
        active: false,
    });
    $('.header__burger').click(function(event) {
      $('.header__burger,.header__nav').toggleClass('active');
      $('body').toggleClass('lock');
    })
    $('.search').click(function(event) {
      $('.search,.form-header').toggleClass('active');
      $('body').toggleClass('lock');
    })
  });
