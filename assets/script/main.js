// Header
document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.querySelector('.header__menu-button');
    const headerButtons = document.querySelector('.header__buttons');

    menuButton.addEventListener('click', function() {
        headerButtons.classList.toggle('active'); // переключаем класс 'active' у блока с кнопками
        menuButton.classList.toggle('active'); // переключаем класс 'active' у самой кнопки
    });
});


// Hero
document.addEventListener("DOMContentLoaded", function () {
    const fileImage = document.querySelector('.hero__image_file');
    const laptopImage = document.querySelector('.hero__image_laptop');

    fileImage.classList.add('active');
    laptopImage.classList.add('active');
});


// Function
document.addEventListener('DOMContentLoaded', () => {
    const points = document.querySelectorAll('.function__point');
    const contents = document.querySelectorAll('.function__content');
    const circles = document.querySelectorAll('.function__point_circle');
    let currentIndex = 0;
    const intervalTime = 5000;
    let interval;

    function setCircleProgress(circle, percent) {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    function activatePoint(index) {
        points.forEach((point, i) => {
            point.classList.toggle('active', i === index);
            contents[i].classList.toggle('active', i === index);
        });
        resetProgressAnimation(index);
    }

    function resetProgressAnimation(index) {
        const circle = circles[index];
        // Сбрасываем прогресс
        circle.style.transition = 'none';
        setCircleProgress(circle, 0);

        // Запускаем анимацию прогресса после сброса
        setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 5s linear';
            setCircleProgress(circle, 100);
        }, 50);
    }

    function nextPoint() {
        currentIndex = (currentIndex + 1) % points.length;
        activatePoint(currentIndex);
    }

    function startInterval() {
        interval = setInterval(nextPoint, intervalTime);
    }

    function stopInterval() {
        clearInterval(interval);
    }

    activatePoint(currentIndex);
    startInterval();

    points.forEach((point, index) => {
        point.addEventListener('click', () => {
            stopInterval();
            currentIndex = index;
            activatePoint(currentIndex);
            startInterval();
        });
    });
});

// FAQ
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq__item');

    function closeAllFaqs() {
        faqItems.forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq__content').style.maxHeight = null;
        });
    }

    function openFaq(item) {
        const content = item.querySelector('.faq__content');
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
    }

    faqItems.forEach((item, index) => {
        const header = item.querySelector('.faq__header');
        const content = item.querySelector('.faq__content');

        if (index === 0) {
            openFaq(item);
        }

        header.addEventListener('click', () => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                closeAllFaqs();
                openFaq(item);
            }
        });
    });
});

