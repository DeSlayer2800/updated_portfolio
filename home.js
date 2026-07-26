// --- Mobile Hamburger Menu ---
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navBackdrop = document.getElementById('navBackdrop');

    if (!menuToggle || !navMenu) return;

    const closeMenu = () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        if (navBackdrop) navBackdrop.classList.remove('open');
    };

    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('nav-open', isOpen);
        if (navBackdrop) navBackdrop.classList.toggle('open', isOpen);
    };

    menuToggle.addEventListener('click', toggleMenu);
    if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);
    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Page Reveal Logic
    const revealElements = document.querySelectorAll('.reveal');
    
    // Triggers the fade-in and slide-up animations for the hero section on page load
    setTimeout(() => {
        revealElements.forEach(el => {
            if (el.classList.contains('delay-1') || el.classList.contains('delay-2')) {
                el.classList.add('active');
            }
        });
    }, 150);

    // 2. Intersection Observer for Scroll-Based Animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If this is the impact bar, trigger the counter animation
                if (entry.target.classList.contains('impact-bar')) {
                    startCounterAnimation();
                    scrollObserver.unobserve(entry.target); // Only animate once
                }
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => scrollObserver.observe(el));

    // 3. Impact Bar Counter Logic
    const startCounterAnimation = () => {
        const counters = document.querySelectorAll('.impact-number');
        const duration = 2000; // Total duration in milliseconds

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Calculate current value based on progress
                let currentValue = progress * target;

                // Formatting: If it's the CGPA (has a decimal), show 2 decimal places
                if (target % 1 !== 0) {
                    counter.innerText = currentValue.toFixed(2);
                } else {
                    counter.innerText = Math.floor(currentValue);
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target; // Ensure it ends exactly on the target
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    // 4. Interactive Card Parallax Effect
    // This makes the technical cards follow the mouse slightly for a 3D depth feel
    const cards = document.querySelectorAll('.grid-card');
    
    document.addEventListener('mousemove', (e) => {
        // Calculate the center-relative position of the mouse
        const xAxis = (window.innerWidth / 2 - e.pageX) / 80;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 80;
        
        cards.forEach(card => {
            card.style.transition = "transform 0.1s ease-out";
            card.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
        });
    });
});