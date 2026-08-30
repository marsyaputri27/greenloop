// Mengatur animasi geser panel login & register (biasanya sudah ada dari template bawaan)
const container = document.getElementById('container');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

if (signUpButton && signInButton) {
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

// 1. Logika ketika tombol "Daftar" diklik
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah reload halaman secara default
        
        // Geser panel secara otomatis ke form Login (menghapus class right-panel-active)
        container.classList.remove("right-panel-active");
        
        // Opsional: Kosongkan form input registrasi
        registerForm.reset();
    });
}

// 2. Logika ketika tombol "Login" diklik
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah reload halaman secara default
        
        // Simulasi login sukses, langsung arahkan ke index-login.html
        window.location.href = 'index-login.html';
    });
}