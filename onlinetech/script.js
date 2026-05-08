// Handle background video loading and playing
(function(){
            var v=document.querySelector('.bg-video');
            if(!v) return;
            function ok(){ v.classList.add('loaded'); }
            v.addEventListener('canplay', ok, {once:true});
            if(v.readyState>=3) ok();
            v.play().catch(function(){});
        })();

// Mobile menu toggle functionality
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const menuLinks = document.querySelectorAll('.menu-link');

// Function to open the mobile menu
function openMenu() {
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    mobileMenu.style.display = 'flex';
    
    // Force reflow so transition fires
    requestAnimationFrame(() => mobileMenu.classList.add('open'));
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
}

// Function to close the mobile menu
function closeMenu() {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    
    // Hide after fade-out transition (300ms)
    setTimeout(() => {
        if (!mobileMenu.classList.contains('open')) {
            mobileMenu.style.display = 'none';
        }
    }, 320);
}

// Toggle menu on burger click
burger.addEventListener('click', () => {
    burger.classList.contains('open') ? closeMenu() : openMenu();
});

// Close menu when a nav link is clicked
menuLinks.forEach(link => link.addEventListener('click', closeMenu));

// Close menu on Escape key press
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});

// Auto-close menu if window is resized above mobile breakpoint with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 640 && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    }, 150);
});

// Initialize mobile menu as hidden
mobileMenu.style.display = 'none';