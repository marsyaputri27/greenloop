// ==========================================
// FUNGSI SWAP GAMBAR (GALERI)
// ==========================================
function swapImage(element, newSrc, fallbackSrc) {
    const mainImg = document.getElementById('mainProductImage');
    
    // Ganti src gambar utama
    mainImg.src = newSrc;
    mainImg.onerror = function() {
        this.src = fallbackSrc;
    };

    // Pindahkan class 'active'
    const thumbs = document.querySelectorAll('.thumb-box');
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    element.classList.add('active');
}

// ==========================================
// FUNGSI GANTI METODE PEMBAYARAN (UKURAN SEPADAN)
// ==========================================
function changePaymentMethod() {
    const radios = document.getElementsByName('payment_method');
    const btn = document.getElementById('btnCheckout');
    
    let selected = 'poin';
    for(let i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            selected = radios[i].value;
            break;
        }
    }

    if(selected === 'uang') {
        btn.innerHTML = "<i class='bx bx-credit-card'></i> Beli Sekarang";
        btn.classList.add('mode-uang');
    } else {
        btn.innerHTML = "<i class='bx bxs-star'></i> Tukar Point";
        btn.classList.remove('mode-uang');
    }
}


document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. ANIMASI ON-SCROLL
    // ==========================================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    const animatedSections = document.querySelectorAll('.animate-on-scroll');
    animatedSections.forEach(section => scrollObserver.observe(section));


    // ==========================================
    // 2. LOGIKA CHECKOUT (ALERT PENGEMBANGAN)
    // ==========================================
    const btnCheckout = document.getElementById('btnCheckout');
    
    if(btnCheckout) {
        btnCheckout.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah reload halaman
            alert("Sedang dalam pengembangan");
        });
    }

    // ==========================================
    // 3. LOGIKA SCROLL ULASAN (< >)
    // ==========================================
    const reviewWrapper = document.getElementById('reviewWrapper');
    const btnPrevReview = document.getElementById('btnPrevReview');
    const btnNextReview = document.getElementById('btnNextReview');

    if(reviewWrapper && btnPrevReview && btnNextReview) {
        // Klik tombol kanan (geser ke kiri)
        btnNextReview.addEventListener('click', () => {
            reviewWrapper.scrollBy({ left: 400, behavior: 'smooth' });
        });

        // Klik tombol kiri (geser ke kanan)
        btnPrevReview.addEventListener('click', () => {
            reviewWrapper.scrollBy({ left: -400, behavior: 'smooth' });
        });
    }

});