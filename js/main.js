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
