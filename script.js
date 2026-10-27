/* ========================================================
   TAILWIND CONFIGURATION & THEME EXTENSIONS
   ======================================================== */
tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            burmese: ['Padauk', 'sans-serif'],
            handwriting: ['Caveat', 'cursive'],
            sans: ['Inter', 'sans-serif']
          },
          colors: {
            roseGold: '#e0a96d',
            softPink: '#ffe4e6',
            midnightWine: '#1f0d1a',
            romanticDark: '#2e0821'
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-7px) rotate(1.5deg)' }
            },
            heartBeat: {
              '0%, 100%': { transform: 'scale(1)' },
              '15%': { transform: 'scale(1.15)' },
              '30%': { transform: 'scale(1)' },
              '45%': { transform: 'scale(1.22)' }
            },
            spinVinyl: {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            },
            glowPulse: {
              '0%, 100%': { opacity: '0.35' },
              '50%': { opacity: '0.8' }
            },
            orbit: {
              '0%': { transform: 'rotate(0deg) translateX(72px) rotate(0deg)' },
              '100%': { transform: 'rotate(360deg) translateX(72px) rotate(-360deg)' }
            },
            orbitReverse: {
              '0%': { transform: 'rotate(360deg) translateX(85px) rotate(-360deg)' },
              '100%': { transform: 'rotate(0deg) translateX(85px) rotate(0deg)' }
            },
            wobbleBounce: {
              '0%': { transform: 'scale(1, 1)' },
              '20%': { transform: 'scale(1.25, 0.75)' },
              '40%': { transform: 'scale(0.8, 1.2)' },
              '60%': { transform: 'scale(1.1, 0.9)' },
              '80%': { transform: 'scale(0.95, 1.05)' },
              '100%': { transform: 'scale(1, 1)' }
            }
          },
          animation: {
            float: 'float 3.5s ease-in-out infinite',
            heartBeat: 'heartBeat 1.8s ease-in-out infinite',
            spinVinyl: 'spinVinyl 8s linear infinite',
            glowPulse: 'glowPulse 2.5s ease-in-out infinite',
            orbit: 'orbit 6s linear infinite',
            orbitReverse: 'orbitReverse 8s linear infinite',
            wobble: 'wobbleBounce 0.65s ease-in-out'
          }
        }
      }
    };

/* ========================================================
   APPLICATION JAVASCRIPT LOGIC
   ======================================================== */
/* ----------------------------------------------------
       1. CANVAS BACKGROUND (Jasmine Petals & Glow Hearts)
       ---------------------------------------------------- */
    const canvas = document.getElementById('petalsCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const PARTICLE_COUNT = 24;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * 50;
        this.size = 10 + Math.random() * 14;
        this.speedY = 0.7 + Math.random() * 1.3;
        this.speedX = Math.sin(Math.random() * 10) * 0.7;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.isHeart = Math.random() > 0.65;
        this.opacity = 0.35 + Math.random() * 0.45;
      }
      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) * 0.5 + this.speedX;
        this.rotation += this.rotSpeed;

        if (this.y > height + 30 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.isHeart) {
          ctx.fillStyle = '#f472b6';
          ctx.beginPath();
          const d = this.size * 0.6;
          ctx.moveTo(0, d / 4);
          ctx.quadraticCurveTo(0, 0, d / 4, 0);
          ctx.quadraticCurveTo(d / 2, 0, d / 2, d / 4);
          ctx.quadraticCurveTo(d / 2, 0, (3 * d) / 4, 0);
          ctx.quadraticCurveTo(d, 0, d, d / 4);
          ctx.quadraticCurveTo(d, d / 2, (3 * d) / 4, (3 * d) / 4);
          ctx.lineTo(d / 2, d);
          ctx.lineTo(d / 4, (3 * d) / 4);
          ctx.quadraticCurveTo(0, d / 2, 0, d / 4);
          ctx.fill();
        } else {
          ctx.fillStyle = '#fffafb';
          ctx.strokeStyle = '#fbcfe8';
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(0, -this.size / 2);
          ctx.quadraticCurveTo(this.size / 2, 0, 0, this.size / 2);
          ctx.quadraticCurveTo(-this.size / 2, 0, 0, -this.size / 2);
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = new Particle();
      p.y = Math.random() * height;
      particles.push(p);
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }

    window.onload = function() {
      animateParticles();
    };

    /* ----------------------------------------------------
       2. SWIPABLE 3-TRACK VINYL PLAYER & NO-DOWNLOAD AUDIO LOGIC
       ---------------------------------------------------- */
    const playlist = [
      {
        title: "စပယ်ဖြူလေးနဲ့တွေ့တဲ့နောက်",
        artist: "G Fatt",
        file: "sapal_phyu.mp3",
        tag: "Than Sin's Favorite 🤍",
        icon: "🌸"
      },
      {
        title: "ဝဋ်ကြွေး",
        artist: "Eternal Gosh",
        file: "wutt_kway.mp3",
        tag: "Than Sin's Pick 🎧",
        icon: "✨"
      },
      {
        title: "Wings",
        artist: "Adjustor",
        file: "wings.mp3",
        tag: "Wings for Than Sin 🕊️",
        icon: "🤍"
      }
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;
    let audioContext = null;
    let synthInterval = null;
    let isSynthRunning = false;

    const mainAudio = document.getElementById('mainAudio');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const vinylDisk = document.getElementById('vinylDisk');
    const tonearm = document.getElementById('tonearm');
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const trackTag = document.getElementById('trackTag');
    const trackBadge = document.getElementById('trackBadge');
    const vinylIcon = document.getElementById('vinylIcon');
    const eqVisualizer = document.getElementById('eqVisualizer');
    const dot0 = document.getElementById('dot0');
    const dot1 = document.getElementById('dot1');
    const dot2 = document.getElementById('dot2');

    function updateTrackUI() {
      const track = playlist[currentTrackIndex];
      songTitle.textContent = track.title;
      songArtist.textContent = track.artist;
      trackTag.textContent = track.tag;
      trackBadge.textContent = `${currentTrackIndex + 1} / 3`;
      vinylIcon.textContent = track.icon;

      [dot0, dot1, dot2].forEach((dot, idx) => {
        if (idx === currentTrackIndex) {
          dot.className = "w-3.5 h-1.5 rounded-full bg-rose-400 transition-all duration-300";
        } else {
          dot.className = "w-1.5 h-1.5 rounded-full bg-rose-400/40 transition-all duration-300";
        }
      });
    }

    // Built-in romantic piano chime synth
    function startRomanticSynth() {
      if (isSynthRunning) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!audioContext) audioContext = new AudioCtx();
        if (audioContext.state === 'suspended') audioContext.resume();

        const chords = [
          [261.63, 329.63, 392.00, 493.88], // Cmaj7
          [220.00, 261.63, 329.63, 392.00], // Am7
          [174.61, 220.00, 261.63, 329.63], // Fmaj7
          [196.00, 246.94, 293.66, 392.00]  // G
        ];
        let chordIdx = 0;
        let noteIdx = 0;

        synthInterval = setInterval(() => {
          if (!isPlaying) return;
          const currentChord = chords[chordIdx];
          const freq = currentChord[noteIdx % currentChord.length];

          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioContext.currentTime);

          gain.gain.setValueAtTime(0.001, audioContext.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.75);

          osc.connect(gain);
          gain.connect(audioContext.destination);

          osc.start();
          osc.stop(audioContext.currentTime + 0.8);

          noteIdx++;
          if (noteIdx % 4 === 0) {
            chordIdx = (chordIdx + 1) % chords.length;
          }
        }, 400);

        isSynthRunning = true;
      } catch (e) {
        console.log("Web Audio synth unavailable:", e);
      }
    }

    function stopRomanticSynth() {
      if (synthInterval) {
        clearInterval(synthInterval);
        synthInterval = null;
      }
      isSynthRunning = false;
    }

    function playCurrentTrack() {
      const track = playlist[currentTrackIndex];
      
      // Stop previous synth if any
      stopRomanticSynth();

      // Check if track file exists or has valid source
      if (track.file) {
        mainAudio.src = track.file;
        const playPromise = mainAudio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            isPlaying = true;
            setPlayerPlayingUI(true);
          }).catch(err => {
            console.log("Direct MP3 not found. Switching to built-in romantic melody synthesizer:", err);
            startRomanticSynth();
            isPlaying = true;
            setPlayerPlayingUI(true);
          });
        }
      } else {
        startRomanticSynth();
        isPlaying = true;
        setPlayerPlayingUI(true);
      }
    }

    function toggleMusic() {
      if (isPlaying) {
        mainAudio.pause();
        stopRomanticSynth();
        isPlaying = false;
        setPlayerPlayingUI(false);
      } else {
        playCurrentTrack();
      }
    }

    function setPlayerPlayingUI(playing) {
      if (playing) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        vinylDisk.classList.add('animate-spinVinyl');
        tonearm.classList.remove('tonearm-idle');
        tonearm.classList.add('tonearm-playing');
        eqVisualizer.classList.remove('hidden');
      } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        vinylDisk.classList.remove('animate-spinVinyl');
        tonearm.classList.remove('tonearm-playing');
        tonearm.classList.add('tonearm-idle');
        eqVisualizer.classList.add('hidden');
      }
    }

    function nextSong() {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      updateTrackUI();
      if (isPlaying) {
        playCurrentTrack();
      }
    }

    function prevSong() {
      currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      updateTrackUI();
      if (isPlaying) {
        playCurrentTrack();
      }
    }

    // Touch Swipe Gesture for Phones & Tablets
    const playerBox = document.getElementById('playerSwipeBox');
    let touchStartX = 0;
    let touchEndX = 0;

    playerBox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    playerBox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    }, { passive: true });

    function handleSwipeGesture() {
      const threshold = 35;
      if (touchEndX < touchStartX - threshold) {
        nextSong();
      } else if (touchEndX > touchStartX + threshold) {
        prevSong();
      }
    }

    // Direct Browser-in-Memory Audio Upload (Cannot be intercepted by download managers)
    function handleCustomAudioUpload(event) {
      const file = event.target.files[0];
      if (file) {
        stopRomanticSynth();
        const objectURL = URL.createObjectURL(file);
        playlist[currentTrackIndex].file = objectURL;
        playlist[currentTrackIndex].title = file.name.replace(/\.[^/.]+$/, "");
        updateTrackUI();
        mainAudio.src = objectURL;
        mainAudio.play().then(() => {
          isPlaying = true;
          setPlayerPlayingUI(true);
        });
      }
    }

    /* ----------------------------------------------------
       3. SURPRISE UNLOCKING LOGIC (Welcome Gate)
       ---------------------------------------------------- */
    function unlockSurprise() {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fda4af', '#f43f5e', '#fff1f2', '#fb7185', '#ffffff']
      });

      playCurrentTrack();

      const gate = document.getElementById('welcomeGate');
      gate.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        gate.style.display = 'none';
      }, 1000);
    }

    /* ----------------------------------------------------
       4. INTERACTIVE STICKER CORNER (TAP TO CYCLE IMAGES)
       ---------------------------------------------------- */
    const stickerImages = [
      { src: "sticker.png", fallback: "https://api.iconify.design/fluent-emoji:smiling-face-with-hearts.svg" },
      { src: "sticker2.png", fallback: "https://api.iconify.design/fluent-emoji:face-blowing-a-kiss.svg" },
      { src: "sticker3.png", fallback: "https://api.iconify.design/fluent-emoji:smiling-face-with-heart-eyes.svg" },
      { src: "sticker4.png", fallback: "https://api.iconify.design/fluent-emoji:cat-with-wry-smile.svg" },
      { src: "sticker5.png", fallback: "https://api.iconify.design/fluent-emoji:partying-face.svg" }
    ];
    let currentStickerIdx = 0;

    const stickerQuotes = [
      "ချစ်စရာလေး 🙈🤍",
      "ဟောဒီမှာ အသည်းကျော်လေး 🥰",
      "ရှက်မနေနဲ့ဗျာ Than Sin ရေ 😜",
      "ဒီ Sticker လေးကို ကြည့်ပြီး ပြုံးနေရတာ 🌸",
      "ကြည့်မဝတဲ့ အသည်းယားစရာလေး 💖",
      "လူမိသွားပြီ Than Sin ရေ 😜🤍"
    ];
    let quoteIndex = 0;

    function playStickerChime() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!audioContext) audioContext = new AudioCtx();
        if (audioContext.state === 'suspended') audioContext.resume();

        const chimeNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        chimeNotes.forEach((freq, idx) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioContext.currentTime + idx * 0.07);

          gain.gain.setValueAtTime(0.001, audioContext.currentTime + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + idx * 0.07 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + idx * 0.07 + 0.45);

          osc.connect(gain);
          gain.connect(audioContext.destination);

          osc.start(audioContext.currentTime + idx * 0.07);
          osc.stop(audioContext.currentTime + idx * 0.07 + 0.5);
        });
      } catch (e) {
        console.log("Sticker chime error:", e);
      }
    }

    function triggerStickerInteraction(e) {
      if (e) e.stopPropagation();

      const container = document.getElementById('stickerHeroContainer');
      
      container.classList.remove('animate-wobble');
      void container.offsetWidth;
      container.classList.add('animate-wobble');

      // Cycle to next sticker image smoothly
      const stickerImg = document.getElementById('mainStickerImg');
      currentStickerIdx = (currentStickerIdx + 1) % stickerImages.length;
      const nextSticker = stickerImages[currentStickerIdx];
      
      stickerImg.style.opacity = '0.3';
      stickerImg.style.transform = 'scale(0.8) rotate(-10deg)';
      
      setTimeout(() => {
        stickerImg.src = nextSticker.src;
        stickerImg.onerror = function() {
          this.src = nextSticker.fallback;
        };
        stickerImg.style.opacity = '1';
        stickerImg.style.transform = 'scale(1.1) rotate(0deg)';
        setTimeout(() => {
          stickerImg.style.transform = 'scale(1)';
        }, 180);
      }, 100);

      playStickerChime();

      // Show cute floating speech bubble
      const anchor = document.getElementById('speechBubbleAnchor');
      anchor.innerHTML = '';
      const bubble = document.createElement('div');
      bubble.className = "absolute floating-bubble-anim px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs sm:text-sm font-semibold shadow-lg border border-white/40 tracking-wide pointer-events-none whitespace-nowrap z-40";
      bubble.textContent = stickerQuotes[quoteIndex % stickerQuotes.length];
      quoteIndex++;
      anchor.appendChild(bubble);

      // Particle fountain around sticker
      const rect = container.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      for (let i = 0; i < 9; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';
        particle.style.left = `${originX}px`;
        particle.style.top = `${originY}px`;
        particle.style.zIndex = '99';
        
        const angle = (Math.PI * 2 / 9) * i + (Math.random() - 0.5) * 0.5;
        const distance = 55 + Math.random() * 45;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 25;
        const rot = (Math.random() - 0.5) * 180;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.setProperty('--rot', `${rot}deg`);

        const symbols = ['💖', '✨', '🌸', '🤍', '⭐'];
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.fontSize = `${14 + Math.random() * 10}px`;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 900);
      }
    }

    function loadCustomSticker(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById('mainStickerImg').src = e.target.result;
          triggerStickerInteraction();
        };
        reader.readAsDataURL(file);
      }
    }

    /* ----------------------------------------------------
       5. 3D POLAROID CARD FLIP & IMAGE CUSTOMIZER
       ---------------------------------------------------- */
    function flipCard(cardId) {
      const card = document.getElementById(cardId);
      card.classList.toggle('rotate-y-180');
    }

    function loadCustomImage(event, imgId) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById(imgId).src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    /* ----------------------------------------------------
       6. RUNAWAY BUTTON & PROPOSAL LOGIC
       ---------------------------------------------------- */
    let dodgeCount = 0;
    let yesScale = 1;
    const toastMessages = [
      "မိအောင်ဖမ်းလေ Than Sin ရေ 😜",
      "စဉ်းစားမနေနဲ့တော့ဗျာ 🙈",
      "လက်ခံတယ်ကိုပဲ နှိပ်တော့နော် 🤍",
      "ဖမ်းလို့မမိဘူးနော် စပယ်ဖြူလေး 🌸",
      "ကဲ... လက်ခံလိုက်တော့ဗျာ 🙈💖"
    ];

    function showToast(text) {
      const toast = document.getElementById('toastNotification');
      const toastText = document.getElementById('toastText');
      toastText.textContent = text;
      toast.classList.remove('opacity-0', 'pointer-events-none');
      toast.classList.add('opacity-100');
      setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0', 'pointer-events-none');
      }, 1800);
    }

    function dodgeMaybeBtn(e) {
      if (e) e.preventDefault();
      const btn = document.getElementById('maybeBtn');
      const yesBtn = document.getElementById('yesBtn');

      dodgeCount++;
      const msg = toastMessages[(dodgeCount - 1) % toastMessages.length];
      showToast(msg);

      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 70;
      btn.style.transform = `translate(${randomX}px, ${randomY}px)`;

      yesScale += 0.08;
      yesBtn.style.transform = `scale(${Math.min(yesScale, 1.4)})`;
    }

    function handleMaybeProposal() {
      dodgeMaybeBtn();
    }

    function handleAcceptProposal() {
      const end = Date.now() + 3.5 * 1000;
      const colors = ['#f43f5e', '#fda4af', '#fb7185', '#e11d48', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      const modal = document.getElementById('acceptModal');
      const box = document.getElementById('acceptBox');
      modal.classList.remove('opacity-0', 'pointer-events-none');
      box.classList.remove('scale-90');
      box.classList.add('scale-100');
    }

    function closeAcceptModal() {
      const modal = document.getElementById('acceptModal');
      const box = document.getElementById('acceptBox');
      modal.classList.add('opacity-0', 'pointer-events-none');
      box.classList.remove('scale-100');
      box.classList.add('scale-90');
    }

    function copyTelegramConfessionText() {
      const text = "ငါ လက်ခံလိုက်ပါပြီ Than Sin ရေ 🤍 ဒီနေ့ကစပြီး ငါတို့နှစ်ယောက် အတူတူပေါ့ 🌸✨";
      const tempInput = document.createElement('textarea');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      showToast("Telegram အတွက် စာလွှာကို ကူးယူပြီးပါပြီ 📋🤍");
    }
