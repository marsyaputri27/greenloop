// Mengatur animasi geser panel login & register
const container = document.getElementById('container');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

if (signUpButton && signInButton) {
    // Animasi pindah ke Register
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        container.classList.remove("left-panel-active"); // Menghapus class left agar bersih
    });

    // Animasi pindah kembali ke Login
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
        container.classList.add("left-panel-active"); // INI KUNCINYA: Menambahkan class left untuk memicu animasi balik di CSS
    });
}

// 1. Logika ketika tombol "Daftar" diklik di form registrasi
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah reload halaman secara default
        
        // Geser panel secara otomatis ke form Login dengan animasi penuh
        container.classList.remove("right-panel-active");
        container.classList.add("left-panel-active");
        
        // Opsional: Kosongkan form input registrasi
        registerForm.reset();
    });
}

// 2. Logika ketika tombol "Login" diklik di form masuk
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah reload halaman secara default
        
        // Simulasi login sukses, langsung arahkan ke index-login.html
        window.location.href = 'index-login.html';
    });
}
