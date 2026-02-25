document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio site loaded');

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Horizontal Scroll Wheel support for Carousel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('wheel', (evt) => {
            if (window.innerWidth > 768) { // Only force horizontal scroll on desktop
                evt.preventDefault();
                carousel.scrollLeft += evt.deltaY;
            }
        });
    }
});
