document.addEventListener("DOMContentLoaded", () => {
    /* 0. INTERAKSI MOBILE DRAWER & HAMBURGER BUTTON (Disamakan dengan Index) */
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

    /* 1. INTERAKSI SLIDER HERO */
    const wrapper = document.getElementById('heroWrapper');
    const track = document.getElementById('heroSliderTrack');
    const cards = document.querySelectorAll('.hero-showcase-card');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dots = document.querySelectorAll('.hero-slider-dots .dot');
    
    let currentIndex = 0;
    const originalCardCount = cards.length;

    if (track && originalCardCount > 0) {
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    }

    const allCards = track ? track.querySelectorAll('.hero-showcase-card') : [];

    function updateSlider(withTransition = true) {
        if (!track || !wrapper || allCards.length === 0) return;

        if (withTransition) {
            track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        } else {
            track.style.transition = 'none';
        }

        let cardWidth = allCards[0].clientWidth + 20; 
        let scrollAmt = currentIndex * cardWidth;

        track.style.transform = `translateX(-${scrollAmt}px)`;
        
        let dotIndex = currentIndex % originalCardCount;
        dots.forEach((dot, idx) => { 
            dot.classList.toggle('active', idx === dotIndex); 
        });
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            updateSlider(true);

            if (currentIndex >= originalCardCount) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider(false);
                }, 400);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex <= 0) {
                currentIndex = originalCardCount;
                updateSlider(false);
                setTimeout(() => {
                    currentIndex--;
                    updateSlider(true);
                }, 20);
            } else {
                currentIndex--;
                updateSlider(true);
            }
        });
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => { 
            currentIndex = idx; 
            updateSlider(true); 
        });
    });
    
    window.addEventListener('resize', () => updateSlider(false));
    updateSlider(false);

    /* 2. AUTO-RESIZE TEXTAREA POST CREATOR */
    const postInput = document.getElementById('postInputText');
    if(postInput) {
        postInput.addEventListener('input', function() {
            this.style.height = '38px'; 
            if (this.scrollHeight > 38) {
                this.style.height = this.scrollHeight + 'px'; 
            }
        });
    }

    /* 3. FILTER FEED BUTTONS */
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active')); 
            btn.classList.add('active'); 
        });
    });

    /* 4. READ MORE / BACA SELENGKAPNYA */
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const textP = e.target.previousElementSibling; 
            textP.classList.toggle('expanded');
            e.target.innerText = textP.classList.contains('expanded') ? 'Sembunyikan' : 'Baca selengkapnya';
        });
    });

    /* 5. INTERAKSI TOMBOL LIKE & TOGGLE KOMENTAR */
    const likeBtns = document.querySelectorAll('.action-btn.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if(this.classList.contains('active')) {
                icon.className = 'bx bxs-heart text-red';
                this.innerHTML = `<i class='bx bxs-heart text-red'></i> Disukai`;
            } else {
                icon.className = 'bx bx-heart';
                this.innerHTML = `<i class='bx bx-heart'></i> Suka`;
            }
        });
    });

    const commentToggleBtns = document.querySelectorAll('.comment-toggle-btn');
    commentToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.post-card');
            const commentSec = card.querySelector('.comments-section');
            
            commentSec.classList.toggle('active');

            if(commentSec.classList.contains('active')) {
                setTimeout(() => {
                    const inputField = commentSec.querySelector('input');
                    if(inputField) inputField.focus();
                }, 300);
            }
        });
    });

    /* 6. INTERSECTION OBSERVER UNTUK ANIMASI ON SCROLL */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});