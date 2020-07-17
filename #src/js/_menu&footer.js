const button = document.getElementById('nav-icon');
let bool = false;
button.onclick = () => {
    bool = !bool;
    if (bool) {
        button.classList.add('open');
    } else {
        button.classList.remove('open');
    }
};
$(window).on('load', () => {
    $('#toTop').on('click', function (e) {
        $('html, body').animate({scrollTop: 0}, 'slow');
    });
});
