
/*********************************************************
 * ヘッダー　ホバーメニュー
 *********************************************************/
const header_accordions = document.querySelectorAll('.js-global-nav');

// ウィンドウの幅1000px以上の場合のみイベントを追加
if (window.innerWidth >= 1000) {
    header_accordions.forEach((accordion) => {

        accordion.addEventListener('mouseover', () => {
            accordion.classList.add('is-active');
            accordion.classList.remove('is-close');
        });

        accordion.addEventListener('mouseleave', (event) => {
            accordion.classList.add('is-close');
            accordion.classList.remove('is-active');
        });
    });
}


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

});


/*********************************************************
 * ヘッダー　ハンバーガーメニュー内 アコーディオン
 *********************************************************/
if (window.innerWidth < 1000) {
    const menuBtns = document.querySelectorAll('.js-header-ac-title');
    const menuLists = document.querySelectorAll('.js-header-ac-items');

    menuBtns.forEach((element, index) => {
        element.addEventListener('click', function (event) {
            event.stopPropagation();
            menuBtns[index].classList.toggle('is-open');
            menuLists[index].classList.toggle('is-open');
        });
    });
}

/*********************************************************
 * フッター　アコーディオン
 *********************************************************/
if (window.innerWidth < 1000) {
    const menuBtns = document.querySelectorAll('.js-footer-ac-title');
    const menuLists = document.querySelectorAll('.js-footer-ac-items');

    menuBtns.forEach((element, index) => {
        element.addEventListener('click', function (event) {
            event.stopPropagation();
            menuBtns[index].classList.toggle('is-open');
            menuLists[index].classList.toggle('is-open');
        });
    });
}

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


/*********************************************************
 * FOOTER 代表紹介sectionの出し分け
 *********************************************************/
$(document).ready(function () {
    var path = window.location.pathname;
    // Check if the path is not the homepage ('/') or '/works'
    if (path !== "/" && path !== "/works" && path !== "/ourmarketing") {
        $('#ceo').hide(); // Hides the CEO section
    }
});
