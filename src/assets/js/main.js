$('#slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 10000
});
$('#besin-degeri').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,

});


const watchNow = $('.watch_now');
const playButton = $('.play_button');
const videoCover = $('.video_cover');
const video = $('#ytplayer');
const blackWrapper = $('#black-wrapper');
const hamburgerMenu = $('.mobile-menu');
const menuItems = $('.main');
const closeStick = $('.stick');
const mobileLinks = $('.mobile-links');


mobileLinks.click(function () {
    blackWrapper.css('display','none')
    menuItems.css('display','none')
});

hamburgerMenu.click(function () {
    blackWrapper.css('display','block');
    menuItems.css('display','flex')
});

closeStick.click(function () {
    blackWrapper.css('display','none')
    menuItems.css('display','none')
});

watchNow.click(function () {
    video.css('display','block');
    videoCover.css('display','none');

});
playButton.click(function () {
    video.css('display','block');
    videoCover.css('display','none');
});


