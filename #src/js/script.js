$(window).on('load', function () {
    if (navigator.userAgent.indexOf('Mac OS X') !== -1 && window.innerWidth > 992) {
        $('.big-bg>img').css({height: '434px'})
    }
});

$(window).on('load', () => {
    $('#toVacancy').on('click', function (e) {
        $('html,body').animate({scrollTop: $('#accordion').offset().top - 50}, 'slow');
    });
});

$(window).on('load', () => {
    $('#toVacancy').on('click', function (e) {
        $('html,body').animate({scrollTop: $('#accordion').offset().top - 50}, 'slow');
    });
});


$(window).on('load', () => {
    $('.contact-scroll').on('click', function (e) {
        $('html,body').animate({scrollTop: $('#form').offset().top - 50}, 'slow');
    });
});

@@include('_menu&footer.js')
