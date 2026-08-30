document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. KONTROL MOBILE DRAWER (HAMBURGER MENU)
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const drawerLayananBtn = document.getElementById('drawerLayananBtn');
    const drawerSubmenu = document.getElementById('drawerSubmenu');

    function openDrawer() {
        if(mobileDrawer) mobileDrawer.classList.add('active');
        if(drawerOverlay) drawerOverlay.classList.add('active');
    }

    function closeDrawer() {
        if(mobileDrawer) mobileDrawer.classList.remove('active');
        if(drawerOverlay) drawerOverlay.classList.remove('active');
    }

    if(mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
    if(closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if(drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    if(drawerLayananBtn) {
        drawerLayananBtn.addEventListener('click', (e) => {
            e.preventDefault();
            drawerLayananBtn.classList.toggle('open');
            if (drawerSubmenu.style.maxHeight && drawerSubmenu.style.maxHeight !== '0px') {
                drawerSubmenu.style.maxHeight = '0px';
            } else {
                drawerSubmenu.style.maxHeight = drawerSubmenu.scrollHeight + 'px';
            }
        });
    }

    // ==========================================
    // 2. ANIMASI ON-SCROLL (Intersection Observer)
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    animatedSections.forEach(section => scrollObserver.observe(section));


    // ==========================================
    // 3. ANIMASI ANGKA POIN (Counting Animation)
    // ==========================================
    const pointCounter = document.getElementById('heroUserPoints');
    if (pointCounter) {
        const target = +pointCounter.getAttribute('data-target');
        const duration = 2000; // Durasi animasi 2 detik
        const frameRate = 30; // Update setiap 30ms
        const totalFrames = Math.round(duration / frameRate);
        const increment = target / totalFrames;
        let currentNumber = 0;
        let frame = 0;

        const counterInterval = setInterval(() => {
            frame++;
            currentNumber += increment;
            
            // Format angka dengan titik (misal: 1.240)
            pointCounter.innerText = Math.round(currentNumber).toLocaleString('id-ID') + " Poin";

            if (frame >= totalFrames) {
                clearInterval(counterInterval);
                pointCounter.innerText = target.toLocaleString('id-ID') + " Poin";
            }
        }, frameRate);
    }

    // ==========================================
    // 4. SISTEM FILTER KATEGORI & PENCARIAN
    // ==========================================
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.cat-pill');
    const productCards = document.querySelectorAll('.mod-card');

    function filterProducts() {
        if (!searchInput) return;
        const searchText = searchInput.value.toLowerCase();
        const activeBtn = document.querySelector('.cat-pill.active');
        const filterCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

        productCards.forEach(card => {
            const title = card.querySelector('.mod-title').innerText.toLowerCase();
            const category = card.getAttribute('data-category');
            
            const matchSearch = title.includes(searchText);
            const matchCategory = (filterCategory === 'all' || category === filterCategory);

            if (matchSearch && matchCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts();
        });
    });

    if(searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

});