document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       1. SISTEM MOBILE DRAWER NAVIGASI (BARU)
       ========================================= */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');

    // Buka Drawer
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('active');
            drawerOverlay.classList.add('active');
        });
    }

    // Tutup Drawer via tombol 'X' atau klik area gelap (overlay)
    const closeDrawer = () => {
        mobileDrawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
    };

    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Accordion Layanan di dalam Drawer
    const drawerLayananBtn = document.getElementById('drawerLayananBtn');
    const drawerSubmenu = document.getElementById('drawerSubmenu');

    if (drawerLayananBtn && drawerSubmenu) {
        drawerLayananBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah reload halaman
            drawerLayananBtn.classList.toggle('open');
            
            if (drawerSubmenu.style.maxHeight) {
                drawerSubmenu.style.maxHeight = null;
                drawerSubmenu.style.marginTop = "0px";
                drawerSubmenu.style.paddingBottom = "0px";
            } else {
                drawerSubmenu.style.maxHeight = drawerSubmenu.scrollHeight + "px";
                drawerSubmenu.style.marginTop = "10px";
                drawerSubmenu.style.paddingBottom = "10px";
            }
        });
    }

    /* =========================================
       2. GSAP & ANIMASI LAINNYA
       ========================================= */
    
    // Animasi Tilted Showcase Hero
    const tracks = document.querySelectorAll('.showcase-track');
    tracks.forEach((track, index) => {
        const originalHTML = track.innerHTML;
        track.innerHTML = originalHTML + originalHTML; 
        const duration = 10 + (index * 2); 
        if (typeof gsap !== 'undefined') {
            gsap.to(track, {
                yPercent: -50, 
                ease: "none",
                duration: duration,
                repeat: -1
            });
        }
    });

    // Animasi Counter Angka
    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const isDecimal = counter.getAttribute('data-decimal');
            gsap.to(counter, {
                innerText: target,
                duration: 2.5,
                ease: "power1.out",
                snap: { innerText: isDecimal ? 0.1 : 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: "top 85%",
                    once: true
                },
                onUpdate: function() {
                    if (isDecimal) {
                        counter.innerText = Number(counter.innerText).toFixed(1);
                    } else {
                        counter.innerText = Math.round(counter.innerText);
                    }
                }
            });
        });
    }

    // Interaktif Accordion (Solusi/FAQ Section Utama)
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                accordionItems.forEach(other => {
                    other.classList.remove('active');
                });
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
    // Intersection Observer untuk Fade & Slide Up On-Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    animatedSections.forEach(section => observer.observe(section));
});