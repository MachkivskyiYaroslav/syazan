
$('.my-slider').slick({
    slidesToShow: 3,
    cssEase: 'ease',
    draggable: false,
    arrows:false,
    slidesToScroll:1,
    responsive: [
        {
            breakpoint: 1198,
            settings: {
                arrows:false,
                slidesToShow: 2,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 720,
            settings: {
                arrows:false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 540,
            settings: {
                arrows:false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ],

});
$(window).on('load', () => {
    $('.slick-current>.image>img').animate({width: '246'})
    $('.player:not(:first-child)>.text').css({display: 'none'});
    $('.slick-current> .text').css('display', 'block')
});





$('.my-slider').on('afterChange', function(event, slick, direction, ls){
    for(let index =0; index <slick.$slides.length; index++) {
        $(slick.$slides[index]).children('.text').css({display: 'none'});
        $(slick.$slides[index]).children('.image').children('img').animate({width: "196px"});
        if( $(slick.$slides[index]).hasClass('slick-current')){
            $(slick.$slides[index]).children('.text').css({display: 'block'});
            $(slick.$slides[index]).children('.image').children('img').animate({width: "246px"});
            $(slick.$slides[index]).animate({justifyContent: 'space-between'});
            // $(slick.$slides[index]).children('.text').animate({display: 'block'});
        }
    }

});

// BUTTONS

$(window).on('load', () => {
    $('#slick-next').on('click', function () {
        $('.my-slider').slick('slickNext')
    });
});


$(window).on('load', () => {
    $('#slick-prev').on('click', function () {
        $('.my-slider').slick('slickPrev')
    });
});





@@include('_menu&footer.js')

