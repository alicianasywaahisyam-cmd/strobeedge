document.addEventListener('DOMContentLoaded', () => {

    // --- FUNGSI UTAMA & PEMANGGILAN ---
    // Memanggil semua fungsi setup agar website berjalan
    setupAudioControls();
    setupGlitterEffect();
    setupDraggableStickers();
    setupDragNotice();
    setupChatBubble();
    setupDailyProclamation();
    setupTownClockAndWeather();
    setupTownGarden();
    setupTownPoll();
    setupMemoryJar();
    setupTownMascot();
    setupHoverSounds();

    // ===================================
    // KUMPULAN SEMUA FUNGSI-FUNGSI WEBSITE
    // ===================================

    function setupAudioControls() {
        const welcomePopup = document.getElementById('welcome-popup');
        const enterBtn = document.getElementById('enter-btn');
        const backgroundMusic = document.getElementById('background-music');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const volumeSlider = document.getElementById('volume-slider');

        if (welcomePopup && enterBtn && backgroundMusic) {
            backgroundMusic.volume = 0.5;
            if (volumeSlider) volumeSlider.value = 0.5;

            enterBtn.addEventListener('click', () => {
                welcomePopup.style.display = 'none';
                backgroundMusic.play().catch(e => console.log("Autoplay was blocked by the browser."));
                if (playPauseBtn) playPauseBtn.textContent = '❚❚';
            });
        }
        if (playPauseBtn && backgroundMusic) {
            playPauseBtn.addEventListener('click', () => {
                if (backgroundMusic.paused) {
                    backgroundMusic.play();
                    playPauseBtn.innerHTML = '❚❚';
                } else {
                    backgroundMusic.pause();
                    playPauseBtn.innerHTML = '►';
                }
            });
        }
        if (volumeSlider && backgroundMusic) {
            volumeSlider.addEventListener('input', () => {
                backgroundMusic.volume = volumeSlider.value;
            });
        }
    }

    function setupGlitterEffect() {
        const glitterColors = ['#FFC2E2', '#FF69B4', '#FFF5FA', '#FFD700'];
        let isThrottled = false;
        document.addEventListener('mousemove', (e) => {
            if (isThrottled) return;
            isThrottled = true;
            createGlitter(e.clientX, e.clientY);
            setTimeout(() => { isThrottled = false; }, 50);
        });

        function createGlitter(x, y) {
            const particle = document.createElement('div');
            particle.classList.add('glitter-particle');
            document.body.appendChild(particle);
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = glitterColors[Math.floor(Math.random() * glitterColors.length)];
            particle.style.left = `${x + (Math.random() * 20 - 10)}px`;
            particle.style.top = `${y + (Math.random() * 20 - 10)}px`;
            setTimeout(() => particle.remove(), 1000);
        }
    }

    function setupDraggableStickers() {
        const stickers = document.querySelectorAll('.sticker');
        let activeSticker = null;
        let initialX, initialY;

        function startDrag(e, sticker) {
            activeSticker = sticker;
            const dragNotice = document.querySelector('.drag-notice');
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

        function stopDrag() {
            activeSticker = null;
        }

        stickers.forEach(sticker => {
            sticker.addEventListener('mousedown', (e) => startDrag(e, sticker));
            sticker.addEventListener('touchstart', (e) => startDrag(e, sticker));
        });
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', stopDrag);
    }

    function setupDragNotice() {
        const stickers = document.querySelectorAll('.sticker');
        const dragNotice = document.querySelector('.drag-notice');
        if (stickers.length > 0 && dragNotice) {
            let stickerIndex = 0;

            function highlightSticker() {
                const sticker = stickers[stickerIndex];
                const stickerRect = sticker.getBoundingClientRect();
                dragNotice.style.left = `${stickerRect.left + window.scrollX}px`;
                dragNotice.style.top = `${stickerRect.top + window.scrollY - dragNotice.offsetHeight - 10}px`;
                dragNotice.classList.add('visible');
                setTimeout(() => { dragNotice.classList.remove('visible'); }, 2500);
                stickerIndex = (stickerIndex + 1) % stickers.length;
            }
            setInterval(highlightSticker, 4000);
            setTimeout(highlightSticker, 1000);
        }
    }

    function setupChatBubble() {
        const chatBubble = document.getElementById('chat-bubble');
        const closeBtn = document.getElementById('close-bubble');
        if (chatBubble && closeBtn) {
            setTimeout(() => chatBubble.classList.add('visible'), 2000);
            closeBtn.addEventListener('click', () => chatBubble.classList.remove('visible'));
        }
    }

    function setupDailyProclamation() {
        const proclamationTextEl = document.getElementById('proclamation-text');
        if (!proclamationTextEl) return;

        const proclamations = [
            "Remember to cherish the small, happy moments today! ♡",
            "A cozy day is a perfect day for making memories.",
            "May your day be as sweet as strawberry shortcake!",
            "Let's build a town filled with kindness and joy.",
            "Sending you a pocketful of sunshine and sparkles!",
            "Don't forget to listen to your favorite comfort song today."
        ];
        const randomProclamation = proclamations[Math.floor(Math.random() * proclamations.length)];

        typewriterEffect(proclamationTextEl, randomProclamation);
    }

    function typewriterEffect(element, text) {
        let i = 0;
        element.textContent = "";
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 70); // Kecepatan mengetik (ms)
    }

    function setupTownClockAndWeather() {
        const clockEl = document.getElementById('town-clock');
        const dateEl = document.getElementById('town-date');
        const weatherIconEl = document.getElementById('weather-icon');
        const weatherTextEl = document.getElementById('weather-text');

        if (!clockEl || !dateEl || !weatherIconEl || !weatherTextEl) return;

        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            clockEl.textContent = `${hours}:${minutes}:${seconds}`;

            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateEl.textContent = now.toLocaleDateString('en-US', options);

            let weatherText, weatherIcon;
            if (hours >= 5 && hours < 12) {
                weatherText = "Morning Sunshine ☀️";
                weatherIcon = "images/weather-sun.gif";
            } else if (hours >= 12 && hours < 18) {
                weatherText = "Golden Afternoon 🌇";
                weatherIcon = "images/weather-sunset.gif";
            } else {
                weatherText = "Starry Night 🌙";
                weatherIcon = "images/weather-moon.gif";
            }
            weatherTextEl.textContent = weatherText;
            weatherIconEl.src = weatherIcon;
        }

        updateClock();
        setInterval(updateClock, 1000);
    }

    function setupTownGarden() {
        const plantImg = document.getElementById('plant-image');
        const waterBtn = document.getElementById('water-plant-btn');
        const plantStatus = document.getElementById('plant-status');
        if (!plantImg || !waterBtn || !plantStatus) return;

        let waterCount = 0;
        const growthStages = {
            0: { src: "images/plant-1.gif", status: "The soil is dry. Needs some love!" },
            3: { src: "images/plant-2.gif", status: "A little sprout appeared!" },
            7: { src: "images/plant-3.gif", status: "It's growing bigger!" },
            12: { src: "images/plant-4.gif", status: "A beautiful flower has bloomed! ✨" },
            15: { src: "images/plant-5.gif", status: "It's sparkling with happiness! Keep it up!" }
        };

        waterBtn.addEventListener('click', () => {
            waterCount++;
            plantImg.style.transform = 'scale(1.1)';
            setTimeout(() => { plantImg.style.transform = 'scale(1)'; }, 150);

            let currentStage = 0;
            for (const stage in growthStages) {
                if (waterCount >= stage) {
                    currentStage = stage;
                }
            }
            plantImg.src = growthStages[currentStage].src;
            plantStatus.textContent = growthStages[currentStage].status;

            if (waterCount >= 15) {
                waterBtn.textContent = "Thank You! ♡";
            }
        });
    }

    function setupTownPoll() {
        const voteButtons = document.querySelectorAll('.vote-button');
        const voteThanksMessage = document.getElementById('vote-thanks');
        let votes = { 1: 0, 2: 0, 3: 0 };
        let totalVotes = 0;
        let hasVoted = false;

        voteButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (hasVoted) return;
                hasVoted = true;
                const option = button.dataset.option;
                votes[option]++;
                totalVotes++;
                updatePollResults();
                voteButtons.forEach(btn => btn.disabled = true);
                if (voteThanksMessage) voteThanksMessage.style.display = 'block';
            });
        });

        function updatePollResults() {
            for (const option in votes) {
                const percentage = totalVotes === 0 ? 0 : (votes[option] / totalVotes) * 100;
                const progressBar = document.getElementById(`progress-${option}`);
                const countDisplay = document.getElementById(`count-${option}`);
                if (progressBar) progressBar.style.width = `${percentage}%`;
                if (countDisplay) countDisplay.textContent = `${votes[option]} votes`;
            }
        }
    }

    function setupMemoryJar() {
        const submitMemoryBtn = document.getElementById('submit-memory-btn');
        const memoryText = document.getElementById('memory-text');
        const memoryJarGif = document.querySelector('.memory-jar-gif');

        if (submitMemoryBtn && memoryText && memoryJarGif) {
            submitMemoryBtn.addEventListener('click', () => {
                if (memoryText.value.trim() === '') {
                    alert('Please write a little something first! ♡');
                    return;
                }
                memoryJarGif.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    memoryJarGif.style.transform = 'scale(1) rotate(0deg)';
                }, 200);
                alert('Thank you! Your precious memory is now safe in the jar. ✨');
                memoryText.value = '';
            });
        }
    }

    function setupTownMascot() {
        const mascot = document.getElementById('town-mascot');
        const mascotBubble = document.getElementById('mascot-bubble');
        const mascotText = document.getElementById('mascot-text');
        let bubbleTimeout;

        if (mascot && mascotBubble && mascotText) {
            const mascotPhrases = [
                "Isn't our town the coziest?",
                "Click on the stickers! You can move them!",
                "I hope you're having a wonderful day!",
                "Let's make some happy memories together!",
                "What's your favorite comfort song?",
                "Psst... you're doing great! ♡"
            ];
            mascot.addEventListener('click', () => {
                clearTimeout(bubbleTimeout);
                const randomPhrase = mascotPhrases[Math.floor(Math.random() * mascotPhrases.length)];
                mascotText.textContent = randomPhrase;
                mascotBubble.classList.add('visible');
                bubbleTimeout = setTimeout(() => {
                    mascotBubble.classList.remove('visible');
                }, 4000);
            });
        }
    }

    function setupHoverSounds() {
        const hoverSound = document.getElementById('hover-sound');
        if (hoverSound) {
            const interactiveElements = document.querySelectorAll('.navigation a, .vote-button, #submit-memory-btn, #water-plant-btn');
            interactiveElements.forEach(elem => {
                elem.addEventListener('mouseenter', () => {
                    hoverSound.currentTime = 0;
                    hoverSound.play();
                });
            });
        }
    }
});