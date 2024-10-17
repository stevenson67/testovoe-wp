const swiper = new Swiper('.swiper-container', {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    speed: 3000,
    grabCursor: true,
    freeMode: true,
    touchEventsTarget: 'wrapper',
});
