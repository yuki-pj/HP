/**
 * Bundled Library: Lenis
 * License: MIT
 * Copyright (c) 2022 Studio Freight
 * Source: https://github.com/studio-freight/lenis
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hero section loaded and ready.');

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    const navLinks = document.querySelectorAll('.site-nav a');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            siteNav.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                siteNav.classList.remove('active');
            });
        });
    }

    // Scroll Animation (IntersectionObserver)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible if you don't want it to fade out again
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);



    // Initialize Lenis for Global Smooth Scroll
    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: true,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Parallax Animation for Background Decorations
    const paralaxItems = document.querySelectorAll('.decoration-item');

    lenis.on('scroll', (e) => {
        const scrollY = e.animatedScroll; // Current scroll position

        paralaxItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-speed')) || 0;
            const rotation = parseFloat(item.getAttribute('data-rotation')) || 0;

            // Move item based on scroll position and speed
            // Use translation to move item relative to original position
            // Since elements are fixed, we can just translateY. 
            // Negative speed moves up slower (or down if very negative), positive moves up faster (or down)
            // Visually: item moves opposite to scroll direction normally. 
            // If we want it to move faster/slower than background (paralax):
            // - Higher speed: Moves faster (appears closer)
            // - Lower speed: Moves slower (appears further)
            // e.g. transform: translateY(scrollY * speed)
            item.style.transform = `translateY(${scrollY * speed}px) rotate(${rotation}deg)`;
        });
    });

    // Anchor Link Interception using Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            // Use Lenis scrollTo with custom duration/easing for links
            lenis.scrollTo(targetElement, {
                offset: -document.querySelector('.site-header').offsetHeight,
                duration: 1.5,
                easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
            });
        });
    });

    // Scroll to Top on Site Title Click
    const siteLogo = document.querySelector('.site-logo');
    if (siteLogo) {
        siteLogo.addEventListener('click', () => {
            lenis.scrollTo(0, {
                duration: 1.5,
                easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
            });
        });
    }

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
});
