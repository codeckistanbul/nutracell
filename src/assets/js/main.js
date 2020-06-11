$('#slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 10000
});

const watchNow = $('.watch_now');
const playButton = $('.play_button');
const videoCover = $('.video_cover');
const video = $('#ytplayer');

watchNow.click(function () {
    video.css('display','block');
    videoCover.css('display','none');

});
playButton.click(function () {
    video.css('display','block');
    videoCover.css('display','none');
});


