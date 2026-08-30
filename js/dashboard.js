$(document).ready(function() {
    
    // ==========================================
    // 0. KONTROL MOBILE DRAWER (HAMBURGER MENU)
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
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
    // 1. ANIMASI ON-SCROLL (Intersection Observer)
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
    // 2. INISIALISASI AOS
    // ==========================================
    AOS.init({
        once: true,
        offset: 50,
    });

    // ==========================================
    // 3. Animasi Angka menggunakan GSAP (Untuk Panel Kanan)
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        let obj = { val: 0 };
        gsap.to(obj, {
            val: target,
            duration: 2.5,
            ease: "power3.out",
            delay: 0.5,
            onUpdate: function() {
                if(target % 1 !== 0) {
                    counter.innerText = obj.val.toFixed(1);
                } else {
                    counter.innerText = Math.floor(obj.val);
                }
            }
        });
    });

    // ==========================================
    // 4. Logika Skenario AI Scanner
    // ==========================================
    const dropZone = $('#scan-drop-zone');
    const browseBtn = $('#browseBtn');
    
    const imagePreview = $('#imagePreview');
    const scanIconCircle = $('#scanIconCircle');
    const scanTitle = $('#scanTitle');
    const scanDesc = $('#scanDesc');
    const btnText = $('#btnText');
    const btnIcon = $('#btnIcon');

    let isImageLoaded = false;

    browseBtn.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!isImageLoaded) {
            scanIconCircle.hide();
            scanTitle.hide();
            scanDesc.hide();
            imagePreview.fadeIn();
            
            btnText.text('Analisis Sekarang');
            btnIcon.removeClass('bx-image-add').addClass('bx-scan');
            browseBtn.addClass('btn-analyze-ready');
            
            isImageLoaded = true;
        } else {
            triggerAIScan();
        }
    });

    dropZone.on('click', function(e) {
        if(e.target !== browseBtn[0] && !isImageLoaded) {
            browseBtn.click();
        }
    });

    function triggerAIScan() {
        dropZone.hide();
        $('#aiLoadingBox').css('display', 'flex').hide().fadeIn();
        
        $('.scan-result-container').css('opacity', '0.5');

        let aiTyping = new Typed('#typed-output-inline', {
            strings: [
                'Mendeteksi gambar...',
                'Menganalisis jenis material...',
                'Menghitung estimasi poin & dampak...',
                'Analisis Selesai!'
            ],
            typeSpeed: 35,
            backSpeed: 15,
            backDelay: 600,
            showCursor: false,
            onComplete: function() {
                setTimeout(function() {
                    $('#aiLoadingBox').hide();
                    
                    isImageLoaded = false;
                    imagePreview.hide();
                    scanIconCircle.show();
                    scanTitle.show();
                    scanDesc.show();
                    
                    scanTitle.text('Pindai Sampah Lain');
                    scanDesc.text('Pilih foto baru dari perangkat Anda untuk dianalisis.');
                    btnText.text('Pilih Berkas Foto');
                    btnIcon.removeClass('bx-scan').addClass('bx-image-add');
                    browseBtn.removeClass('btn-analyze-ready');
                    
                    dropZone.fadeIn();

                    $('#result-empty-state').hide();
                    $('.scan-result-container').css('opacity', '1');
                    $('#result-content').hide().fadeIn(800);
                    
                }, 500);
            }
        });
    }
});