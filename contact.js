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
    const trigger = document.getElementById('hubTrigger');
    const wrap = document.getElementById('hubWrap');
    const hint = document.getElementById('hubHint');

    const activateHub = () => {
        // Expand the tiles permanently
        wrap.classList.add('active');
        // Fade out the initial glowing center
        trigger.classList.add('hidden');
        // Hide the hint text
        hint.classList.add('hidden');
    };

    // Trigger transition when the user hovers over the glowing icon (desktop)
    trigger.addEventListener('mouseover', activateHub);

    // Also trigger on tap/click, since touch devices don't reliably fire mouseover
    trigger.addEventListener('click', activateHub);
});