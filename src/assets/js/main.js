$('#slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 10000
});

const all = $('body');
const navBar = $('#navbar');

all.scrollY(function () {
    navBar.css('opacity','0.5')
});