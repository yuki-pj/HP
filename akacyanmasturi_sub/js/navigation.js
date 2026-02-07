document.addEventListener('DOMContentLoaded', function () {
    // Select all sections and nav links
    const sections = [
        { id: '.mv', nav: 'nav-top' },
        { id: '.reason', nav: 'nav-reason' },
        { id: '.shine', nav: 'nav-shine' },
        { id: '.action', nav: 'nav-action' }, // Combines action and mission
        { id: '.instructor', nav: 'nav-instructor' },
        { id: '.experience', nav: 'nav-experience' },
        { id: '.babyload', nav: 'nav-babyload' },
        { id: '.faq', nav: 'nav-faq' }
    ];

    const navLinks = document.querySelectorAll('#page-nav a');
    const progress = document.getElementById('scroll-progress');

    // Smooth Scrolling
    // Smooth Scrolling - Handled by common.js now for consistent speed
    // navLinks.forEach(link => {
    //     link.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetValues = sections.find(s => s.nav === this.parentElement.id);

    //         if (targetValues && targetValues.id) {
    //             const targetElement = document.querySelector(targetValues.id);
    //             if (targetElement) {
    //                 const headerOffset = 60; // Adjust for fixed header/mobile nav
    //                 const elementPosition = targetElement.getBoundingClientRect().top;
    //                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    //                 window.scrollTo({
    //                     top: offsetPosition,
    //                     behavior: "smooth"
    //                 });
    //             }
    //         }
    //     });
    // });

    // Scroll Spy using Intersection Observer
    // We use a threshold of 0.2 (20% visibility) or rootMargin to detect intersection
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -50% 0px', // Active when element is in the middle of the screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all
                navLinks.forEach(link => {
                    link.parentElement.classList.remove('active');
                });

                // Find matching matching navigation item
                // logic: find which section matches the entry.target
                // Since we querySelector by class, we need to match carefully

                // Helper to match entry to our config
                let match = null;
                for (let section of sections) {
                    const el = document.querySelector(section.id);
                    if (el === entry.target) {
                        match = section;
                        break;
                    }
                }

                if (match) {
                    const activeNav = document.getElementById(match.nav);
                    if (activeNav) activeNav.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        const el = document.querySelector(section.id);
        if (el) observer.observe(el);
    });

    // Progress Bar (Mobile)
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        if (progress) {
            progress.style.width = scrollPercent + '%';
        }
    });
});
