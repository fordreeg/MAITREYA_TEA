$(document).ready(function(){
    // Гамбургер
    const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close');

    hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    });

    closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
    });

    // Слайдер
    // $(document).ready(function(){
    //     $('.catalog__wrapper').slick({
    //         infinite: true,
    //         speed: 500,
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //         centerMode: true,
    //         prevArrow: '<button type="button" class="slick-prev"><span class="icon-chevron_l"></span></button>',
    //         nextArrow: '<button type="button" class="slick-next"><span class="icon-chevron_r"></span></button>',
    //         // responsive: [
    //         //     {
    //         //       breakpoint: 1024,
    //         //       settings: {
    //         //         slidesToShow: 3,
    //         //         slidesToScroll: 3,
    //         //         infinite: true,
    //         //         dots: true
    //         //       }
    //         //     },
    //         //     {
    //         //       breakpoint: 600,
    //         //       settings: {
    //         //         slidesToShow: 2,
    //         //         slidesToScroll: 2
    //         //       }
    //         //     },
    //         //     {
    //         //       breakpoint: 480,
    //         //       settings: {
    //         //         slidesToShow: 1,
    //         //         slidesToScroll: 1
    //         //       }
    //         //     }
    //         // ]
    //     });
    // });

    // Слайдер внутри карточки товара
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__block').eq(i).toggleClass('catalog-item__block_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Табы 
    $('div.catalog-header').on('click', 'div:not(.catalog-header__btn_active)', function() {
        $(this)
        .addClass('catalog-header__btn_active').siblings().removeClass('catalog-header__btn_active')
        .closest('div.container').find('div.catalog__wrapper').removeClass('catalog__wrapper_active').eq($(this).index()).addClass('catalog__wrapper_active');
    });

    // Модальное окно
    $('[data-modal=thanks]').on('click', function() {
        $('.overlay, #thanks').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #thanks').fadeOut('slow');
    });

    // Валидация формы
    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
            }
        });
    };

    validateForms('#consultation-form');

    // Маска для номера тлф
    $('input[name=phone]').mask("+380 (99) 999-99-99");

    // PHP mailer
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //Скролл
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});