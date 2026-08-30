document.addEventListener("DOMContentLoaded", () => {
    /* 1. INTERAKSI MOBILE DRAWER (Sesuai dengan Index) */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const drawerLayananBtn = document.getElementById('drawerLayananBtn');
    const drawerSubmenu = document.getElementById('drawerSubmenu');

    function openDrawer() {
        if(mobileDrawer) mobileDrawer.classList.add('active');
        if(drawerOverlay) drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if(mobileDrawer) mobileDrawer.classList.remove('active');
        if(drawerOverlay) drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
    if(closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if(drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    if (drawerLayananBtn && drawerSubmenu) {
        drawerLayananBtn.addEventListener('click', (e) => {
            e.preventDefault();
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

    /* 2. ANIMASI COUNTER ANGKA STATISTIK */
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const runCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const inc = target / speed;

        const updateCount = () => {
            count += inc;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    let animatedStats = false;
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-overview-grid');
        if(statsSection) {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (sectionPos < screenPosition && !animatedStats) {
                counters.forEach(counter => runCounter(counter));
                animatedStats = true;
            }
        }
    });

    /* 3. INTERSECTION OBSERVER UNTUK ANIMASI FADE-IN & PROGRESS BAR */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in animation
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('is-visible');
                }
                
                // Progress Bar animation
                if (entry.target.classList.contains('anim-bar')) {
                    const targetWidth = entry.target.getAttribute('data-width');
                    entry.target.style.width = targetWidth;
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    document.querySelectorAll('.anim-bar').forEach(el => observer.observe(el));
});