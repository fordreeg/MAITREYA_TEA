const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

$(document).ready(function(){
    $('.your-class').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
});