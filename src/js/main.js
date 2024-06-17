
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
 * FAQ アコーディオン
 *********************************************************/
$(function () {
    $(".js-faq_accordion").on("click", function () {
        $(this).next().slideToggle(200);
        $(this).toggleClass("open", 200);
    });
});