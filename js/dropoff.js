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

    if(drawerLayananBtn && drawerSubmenu) {
        drawerLayananBtn.addEventListener('click', (e) => {
            e.preventDefault();
            drawerLayananBtn.classList.toggle('open');
            if (drawerSubmenu.style.maxHeight && drawerSubmenu.style.maxHeight !== '0px') {
                drawerSubmenu.style.maxHeight = '0px';
                drawerSubmenu.style.marginTop = "0px";
                drawerSubmenu.style.paddingBottom = "0px";
            } else {
                drawerSubmenu.style.maxHeight = drawerSubmenu.scrollHeight + 'px';
                drawerSubmenu.style.marginTop = "10px";
                drawerSubmenu.style.paddingBottom = "10px";
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
    // 3. INISIALISASI AOS (Opsional / Tambahan)
    // ==========================================
    AOS.init({
        once: true,
        offset: 50,
    });

    const cards = document.querySelectorAll(".location-card");
    const searchInput = document.getElementById("searchInput");
    const pills = document.querySelectorAll(".category-pills-right .pill");

    // Event Listener untuk Tombol di dalam Kartu
    cards.forEach(card => {
        const btnRoute = card.querySelector(".btn-action-route");
        if(btnRoute) {
            btnRoute.addEventListener("click", () => {
                const address = card.dataset.address;
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`, "_blank");
            });
        }

        const btnContact = card.querySelector(".btn-action-contact");
        if(btnContact) {
            btnContact.addEventListener("click", () => {
                const title = card.querySelector("h4").innerText;
                alert(`Menghubungi layanan pelanggan ${title} di (021) 500-GREEN...`);
            });
        }
    });

    // Fungsi Filter Pencarian & Kategori Wilayah
    function filterLocations() {
        if (!searchInput) return;
        const searchText = searchInput.value.toLowerCase();
        const activePill = document.querySelector(".category-pills-right .pill.active");
        const region = activePill ? activePill.dataset.region : "all";

        cards.forEach(card => {
            const title = card.querySelector("h4").innerText.toLowerCase();
            const addr = card.querySelector(".address").innerText.toLowerCase();
            const cardRegion = card.dataset.region;
            
            const matchesSearch = title.includes(searchText) || addr.includes(searchText);
            const matchesRegion = region === "all" || region === cardRegion;

            if (matchesSearch && matchesRegion) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    if(searchInput) {
        searchInput.addEventListener("input", filterLocations);
    }

    pills.forEach(pill => {
        pill.addEventListener("click", () => {
            pills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            filterLocations();
        });
    });
});