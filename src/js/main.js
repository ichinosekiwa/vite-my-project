
/*********************************************************
 * ヘッダー　ホバーメニュー
 *********************************************************/
const header_accordions = document.querySelectorAll('.js-global-nav');

header_accordions.forEach((accordion) => {

    // マウスオーバーイベントの追加
    accordion.addEventListener('mouseover', () => {
        accordion.classList.add('is-active');
        accordion.classList.remove('is-close');
    });

    accordion.addEventListener('mouseleave', (event) => {
        accordion.classList.add('is-close');
        accordion.classList.remove('is-active');
    });
});

/*********************************************************
 * ヘッダー　ハンバーガーメニュー
 *********************************************************/
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.js-header');
    const hamburger = document.querySelector('.js-hamburger');
    const navItems = document.querySelector('.js-nav-items');
    const globalNavItems = document.querySelectorAll('.js-global-nav');

    hamburger.addEventListener('click', () => {
        header.classList.toggle('is-open');
        navItems.classList.toggle('is-open');
    });

    globalNavItems.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle('is-active');
            item.classList.toggle('is-close');
        });
    });
});


/*********************************************************
 * TOP 実績 スライダー（swiper.js使用）
 *********************************************************/
const mySwiper1 = new Swiper('.top-slide-1', {
    // オプション設定
    loop: true,
    autoplay: {
        delay: 10000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next-1',
        prevEl: '.swiper-button-prev-1',
    },
});

const mySwiper2 = new Swiper('.top-slide-2', {
    // オプション設定
    loop: true,
    autoplay: {
        delay: 10000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next-2',
        prevEl: '.swiper-button-prev-2',
    },
});

/*********************************************************
 * Seminar 特徴 スライダー（swiper.js使用）
 *********************************************************/
const mySwiper3 = new Swiper('.page-seminar-slide', {
    // オプション設定
    loop: true,
    slidesPerView: 1.14,
    spaceBetween: 16,
    breakpoints: {
        768: {
            slidesPerView: 1.29,
            spaceBetween: 32,
        }
    },

    pagination: {
        el: '.swiper-pagination-seminar',
        type: "fraction",
    },

    navigation: {
        nextEl: '.swiper-button-next-3',
        prevEl: '.swiper-button-prev-3',
    },
});

/*********************************************************
 * FAQ・顧問ページ アコーディオン
 *********************************************************/
$(function () {
    $(".js-faq_accordion").on("click", function () {
        $(this).next().slideToggle(200);
        $(this).toggleClass("open", 200);
    });
});