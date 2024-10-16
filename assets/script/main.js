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

// Cross-platform
document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector('.cross-platform__scroll .cross-platform__img');
    let isDragging = false;
    let startX;
    let scrollLeft;
    let scrollSpeed = 1.5; // Коэффициент скорости скролла
    let scrollAmount = 0;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    // Останавливаем автоскролл, когда пользователь начинает перетаскивать
    scrollContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDragging = false;
        // Обновляем scrollAmount, чтобы автоскролл продолжался с новой позиции
        scrollAmount = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * scrollSpeed; // Ускорение скролла
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Нелинейное движение с requestAnimationFrame
    function autoScroll() {
        if (!isDragging) {
            scrollAmount += 1.2; // Скорость автоскролла
            if (scrollAmount >= maxScroll) scrollAmount = 0; // Бесконечный скролл
            scrollContainer.scrollLeft = scrollAmount;
        }
        requestAnimationFrame(autoScroll); // Плавная анимация
    }

    autoScroll(); // Запуск автоскролла
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

