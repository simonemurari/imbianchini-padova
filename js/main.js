// Main JavaScript for Imbianchini Padova

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Mobile Menu Toggle
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.remove('pointer-events-none');
            mobileMenu.classList.add('pointer-events-auto');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.add('pointer-events-none');
            mobileMenu.classList.remove('pointer-events-auto');
            document.body.style.overflow = '';
        };

        if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
    
    // Navbar Scroll Effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
                navbar.classList.remove('py-4');
                navbar.classList.add('py-2');
                
                // Adjust menu links
                document.querySelectorAll('nav a.nav-link').forEach(link => {
                    link.classList.remove('text-slate-800');
                    link.classList.add('text-slate-900');
                });
            } else {
                navbar.classList.remove('nav-scrolled');
                navbar.classList.add('py-4');
                navbar.classList.remove('py-2');
                
                document.querySelectorAll('nav a.nav-link').forEach(link => {
                    link.classList.add('text-slate-800');
                    link.classList.remove('text-slate-900');
                });
            }
        });
    }

    // Scroll Animations (Premium Intersection Observer)
    const fadeIns = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); // Animate only once for premium feel
            }
        });
    }, observerOptions);

    fadeIns.forEach(el => observer.observe(el));
});

// --- ANONYMOUS CONTACT TRACKING SYSTEM ---
const TRACKER_URL = 'https://contact-tracker.simone-murari3.workers.dev/track';

function trackContact(method) {
    // 1. Get clean path name for page tracking
    let page = window.location.pathname;
    if (page === '/' || page === '/index.html' || page === '') {
        page = 'home';
    } else {
        // Clean up path: /imbiancature-interne-padova/index.html -> imbiancature-interne-padova
        page = page.replace(/^\//, '').replace(/\/$/, '').replace(/\/index\.html$/, '');
        if (page.includes('/')) {
            page = page.split('/').pop();
        }
    }

    const beaconUrl = `${TRACKER_URL}?site=imbianchini-padova&type=${method}&page=${encodeURIComponent(page || 'home')}`;

    // 2. Fire the tracking event using sendBeacon (guaranteed to deliver) or fallback to Image
    if (navigator.sendBeacon) {
        navigator.sendBeacon(beaconUrl);
    } else {
        const img = new Image();
        img.src = beaconUrl;
    }
}

// Attach listeners automatically once DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Auto-track Phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => trackContact('phone'));
    });

    // Auto-track WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach(link => {
        link.addEventListener('click', () => trackContact('whatsapp'));
    });

    // Auto-track Email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        if (!link.closest('form')) { // Avoid double-tracking form mailto submissions
            link.addEventListener('click', () => trackContact('email'));
        }
    });
});

