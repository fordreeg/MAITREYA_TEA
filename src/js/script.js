$(document).ready(function(){
    // Гамбургер
    const hamburger = document.querySelector('.hamburger'),
          menu = document.querySelector('.menu'),
          closeElem = document.querySelector('.menu__close');

    hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    document.body.style.overflow = 'hidden';
    });

    menu.addEventListener('click', () => {
    menu.classList.remove('active');
    document.body.style.overflow = '';
    });


    // Табы 
    $('div.catalog-header').on('click', 'div:not(.catalog-header__btn_active)', function() {
        $(this)
        .addClass('catalog-header__btn_active').siblings().removeClass('catalog-header__btn_active')
        .closest('div.container').find('div.catalog__wrapper').removeClass('catalog__wrapper_active').eq($(this).index()).addClass('catalog__wrapper_active', 'fade');
    });

    //Слайдер в табах
    $(document).ready(function(){
        $('.catalog__wrapper').slick({
            prevArrow: '<button type="button" class="slick-prev"><span class="icon-chevron"></span></button>',
            nextArrow: '<button type="button" class="slick-next"><span class="icon-chevron"></span></button>',
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth: true,
            mobileFirst: true,
            infinite: false,
            responsive: [
                  {
                    breakpoint: 319,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      centerMode: true,
                      arrows: false,
                      dots: true,
                      initialSlide: 1,
                      centerMode: true,
                    }
                  },
                  {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        arrows: false,
                        dots: true,
                        initialSlide: 1,
                        centerMode: true,
                    }
                  },
                  {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        centerMode: true,
                        arrows: false,
                        dots: true,
                        initialSlide: 1,
                        centerMode: false,
                    }
                  },
                  {
                    breakpoint: 992,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      infinite: false,
                      dots: false,
                    }
                  },
                  {
                    breakpoint: 1200,
                    settings: {
                      swipe: false,
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      infinite: false,
                      dots: false,
                    }
                  },
            ]
        });

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
    });

    //Модальное окно
    $('.modal__close').on('click', function() {
        $('.modal').fadeOut('slow');
        document.body.style.overflow = '';
    });


    // Валидация формы
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                checkbox: {
                    required: true
                },
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                checkbox: {
                    required: "Пожалуйста, подтвердите что вы согласны с политикой конфиденциальности",
                },
            }
        });
    };

    validateForms('#consultation-form');
   

    // Маска для номера тлф
    $('input[name=phone]').mask("+380 (99) 999-99-99");

    // PHP mailer
    $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
            }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('.modal').fadeIn('slow');
            document.body.style.overflow = 'hidden';
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

    //Библиотека анимаций
    let wow = new WOW(
        {
            mobile: false      // default
        }
      );
    wow.init();
});