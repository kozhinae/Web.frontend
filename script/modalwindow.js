document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 5,
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: function (index, className) {
                return `<span class="${className}">${index + 1}</span>`;
            },
        },
    });
});


document.querySelectorAll('.swiper-slide img').forEach((img) => {
    img.addEventListener('click', () => {
        Swal.fire({
            title: img.alt,
            text: 'Информация об изображении',
            imageUrl: img.src,
            imageWidth: 50,
            imageHeight: 10,
            imageAlt: img.alt,
            confirmButtonText: 'Закрыть',
        });
    });
});
