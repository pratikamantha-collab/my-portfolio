document.addEventListener('DOMContentLoaded', () => {
    // VanillaTilt removed as requested.

    // Scroll reveal animation
    const fadeElements = document.querySelectorAll('.fade-in');
    const checkVisibility = () => {
        const triggerBottom = window.innerHeight / 5 * 4.5;
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lightbox implementation
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<img src="" alt="Enlarged Photo">';
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    
    document.addEventListener('click', (e) => {
        if (e.target.closest('.gallery-item') && e.target.tagName === 'IMG') {
            lightboxImg.src = e.target.src;
            lightbox.classList.add('active');
        } else if (e.target === lightbox || e.target === lightboxImg) {
            lightbox.classList.remove('active');
        }
    });
});
