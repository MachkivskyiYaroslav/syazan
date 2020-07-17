const plsBtn = document.getElementsByClassName('plus-btn');
let plus =false;
for(let i=0; i<plsBtn.length; i++){
    plsBtn[i].addEventListener('click', () => {
        if(!plsBtn[i].classList.contains('opened')){
            plsBtn[i].classList.add('opened')
        }else {
            plsBtn[i].classList.remove('opened')
        }
    })
}
$(window).on('load', () => {
    $('#toVacancy').on('click', function (e) {
        $('html,body').animate({scrollTop: $('#accordion').offset().top - 50}, 'slow');
    });
});
@@include('_menu&footer.js')
