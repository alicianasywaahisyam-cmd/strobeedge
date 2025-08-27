// --- LOGIKA BARU: JEJAK GLITTER SAAT MOUSE BERGERAK ---
const glitterColors = ['#FFC2E2', '#FF69B4', '#FFF5FA', '#FFD700'];
let isThrottled = false; // Variabel untuk throttle

function createGlitter(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('glitter-particle');
    document.body.appendChild(particle);

    // Ukuran acak antara 2px dan 7px
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Warna acak dari daftar warna
    const color = glitterColors[Math.floor(Math.random() * glitterColors.length)];
    particle.style.backgroundColor = color;

    // Posisi partikel di lokasi kursor
    // Sedikit diacak agar tidak menumpuk di satu titik
    particle.style.left = `${x + (Math.random() * 20 - 10)}px`;
    particle.style.top = `${y + (Math.random() * 20 - 10)}px`;

    // Hapus partikel dari DOM setelah animasinya selesai
    setTimeout(() => {
        particle.remove();
    }, 1000); // Durasi harus sama dengan durasi animasi di CSS
}

// Event listener untuk mousemove dengan throttling
document.addEventListener('mousemove', (e) => {
    if (isThrottled) return; // Jika di-throttle, jangan lakukan apa-apa
    isThrottled = true; // Aktifkan throttle

    createGlitter(e.clientX, e.clientY);

    // Reset throttle setelah jeda singkat
    setTimeout(() => {
        isThrottled = false;
    }, 50); // Membuat glitter maksimal setiap 50 milidetik
});


// --- LOGIKA UNTUK STIKER YANG BISA DIGESER (DRAGGABLE) ---
const stickers = document.querySelectorAll('.sticker');
let activeSticker = null;
let initialX, initialY;
function startDrag(e, sticker) {
    activeSticker = sticker;
    if (dragNotice) { dragNotice.classList.remove('visible'); }
    if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - activeSticker.offsetLeft;
        initialY = e.touches[0].clientY - activeSticker.offsetTop;
    } else {
        initialX = e.clientX - activeSticker.offsetLeft;
        initialY = e.clientY - activeSticker.offsetTop;
    }
}
function drag(e) {
    if (activeSticker) {
        e.preventDefault();
        let currentX, currentY;
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        } else {
            currentX = e.clientX;
            currentY = e.clientY;
        }
        activeSticker.style.left = `${currentX - initialX}px`;
        activeSticker.style.top = `${currentY - initialY}px`;
    }
}
function stopDrag() { activeSticker = null; }
stickers.forEach(sticker => {
    sticker.addEventListener('mousedown', (e) => startDrag(e, sticker));
    sticker.addEventListener('touchstart', (e) => startDrag(e, sticker));
});
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', stopDrag);

// --- LOGIKA UNTUK PETUNJUK OTOMATIS BERPINDAH-PINDAH ---
const dragNotice = document.querySelector('.drag-notice');
if (stickers.length > 0 && dragNotice) {
    let stickerIndex = 0;
    function highlightSticker() {
        const sticker = stickers[stickerIndex];
        const stickerRect = sticker.getBoundingClientRect();
        dragNotice.style.left = `${stickerRect.left + window.scrollX}px`;
        dragNotice.style.top = `${stickerRect.top + window.scrollY - dragNotice.offsetHeight - 10}px`;
        dragNotice.classList.add('visible');
        setTimeout(() => {
            dragNotice.classList.remove('visible');
        }, 2500);
        stickerIndex = (stickerIndex + 1) % stickers.length;
    }
    setInterval(highlightSticker, 4000); 
    setTimeout(highlightSticker, 1000);
}

/* ============================
    LOGIKA UNTUK KONTROL AUDIO
============================ */
document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    if (music && playPauseBtn && volumeSlider) {
        music.volume = volumeSlider.value;
        playPauseBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                playPauseBtn.innerHTML = '❚❚';
            } else {
                music.pause();
                playPauseBtn.innerHTML = '►';
            }
        });
        volumeSlider.addEventListener('input', () => { music.volume = volumeSlider.value; });
    }
});

// --- CHAT BUBBLE LOGIC (v2) ---
document.addEventListener('DOMContentLoaded', (event) => {
    
    const chatBubble = document.getElementById('chat-bubble');
    const closeBtn = document.getElementById('close-bubble');

    if (chatBubble && closeBtn) {
        // Tampilkan chat bubble setelah 2 detik
        setTimeout(() => {
            chatBubble.classList.add('visible');
        }, 2000); // 2000 milidetik = 2 detik

        // Fungsi untuk tombol close
        closeBtn.addEventListener('click', function() {
            chatBubble.classList.remove('visible'); // Sembunyikan bubble saat di-klik
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    // --- KODE UNTUK POP-UP DAN MUSIK ---
    const welcomePopup = document.getElementById('welcome-popup');
    const enterBtn = document.getElementById('enter-btn');
    const backgroundMusic = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');

    // Atur volume awal
    backgroundMusic.volume = 0.5;
    volumeSlider.value = 0.5;

    // Saat tombol "Enter" di pop-up diklik
    enterBtn.addEventListener('click', () => {
        welcomePopup.style.display = 'none'; // Sembunyikan pop-up
        backgroundMusic.play(); // Putar musik
        playPauseBtn.textContent = '❚❚'; // Ubah ikon tombol jadi pause
    });
    
    // --- KODE UNTUK KONTROL MUSIK DI SIDEBAR ---
    playPauseBtn.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            playPauseBtn.textContent = '❚❚';
        } else {
            backgroundMusic.pause();
            playPauseBtn.textContent = '►';
        }
    });

    volumeSlider.addEventListener('input', () => {
        backgroundMusic.volume = volumeSlider.value;
    });

    // --- (Sisipkan kode untuk sticker draggable dan lainnya di sini) ---
    // ... contoh:
    const stickers = document.querySelectorAll('.sticker');
    // ... (sisa kode sticker kamu)

});

