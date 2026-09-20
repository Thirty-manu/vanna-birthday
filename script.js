// ===========================================================
// Yovanna's Rainbow Birthday — script.js
// Vanilla JS only. No frameworks, no backend.
// ===========================================================

(function () {
  'use strict';

  /* ---------------- element references ---------------- */
  const openingScreen = document.getElementById('opening');
  const letsGoBtn = document.getElementById('letsGoBtn');
  const world = document.getElementById('world');
  const finale = document.getElementById('finale');

  const musicCard = document.getElementById('musicCard');
  const musicBtn = document.getElementById('musicBtn');
  const musicIcon = document.getElementById('musicIcon');
  const musicLabel = document.getElementById('musicLabel');
  const birthdayAudio = document.getElementById('birthdayAudio');

  const toast = document.getElementById('toast');

  const discoveryCountEl = document.getElementById('discoveryCount');
  const discoveryTotalEl = document.getElementById('discoveryTotal');
  const allFoundMsg = document.getElementById('allFoundMsg');
  const hiddenRainbows = Array.from(document.querySelectorAll('.hidden-rainbow'));

  const flowerButtons = Array.from(document.querySelectorAll('.flower-btn'));
  const wishMessage = document.getElementById('wishMessage');

  const wandBtn = document.getElementById('wandBtn');
  const bubbleField = document.getElementById('bubbleField');
  const bubbleMessage = document.getElementById('bubbleMessage');

  const friendButtons = Array.from(document.querySelectorAll('.friend-card'));
  const friendMessage = document.getElementById('friendMessage');

  const finalSurpriseBtn = document.getElementById('finalSurpriseBtn');
  const confettiLayer = document.getElementById('confettiLayer');

  /* ---------------- toast helper ---------------- */
  let toastTimer = null;
  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  /* ---------------- audio handling ---------------- */
  let audioIsPlaying = false;

  function setMusicButtonState(playing) {
    audioIsPlaying = playing;
    if (playing) {
      musicIcon.textContent = '🎶';
      musicLabel.textContent = 'Pause song';
      musicBtn.setAttribute('aria-label', 'Pause birthday song');
    } else {
      musicIcon.textContent = '🎵';
      musicLabel.textContent = 'Play song';
      musicBtn.setAttribute('aria-label', 'Play birthday song');
    }
  }

  function attemptAutoplay() {
    if (!birthdayAudio) return;
    const playPromise = birthdayAudio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => setMusicButtonState(true))
        .catch(() => {
          // Autoplay blocked — keep the visible button for manual play.
          setMusicButtonState(false);
        });
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (!birthdayAudio) return;
      if (audioIsPlaying) {
        birthdayAudio.pause();
        setMusicButtonState(false);
      } else {
        const playPromise = birthdayAudio.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise
            .then(() => setMusicButtonState(true))
            .catch(() => {
              setMusicButtonState(false);
              showToast('Tap again to play the song 🎵');
            });
        }
      }
    });
  }

  if (birthdayAudio) {
    birthdayAudio.addEventListener('error', () => {
      setMusicButtonState(false);
    });
  }

  /* ---------------- opening -> world transition ---------------- */
  let worldRevealed = false;

  function revealWorld() {
    if (worldRevealed) return;
    worldRevealed = true;

    openingScreen.classList.add('hidden');
    world.classList.remove('hidden');
    musicCard.classList.remove('hidden');

    world.scrollIntoView({ behavior: 'smooth', block: 'start' });
    attemptAutoplay();
  }

  if (letsGoBtn) {
    letsGoBtn.addEventListener('click', revealWorld);
  }

  /* ---------------- hidden rainbow discoveries ---------------- */
  let foundCount = 0;
  const totalRainbows = hiddenRainbows.length;
  if (discoveryTotalEl) discoveryTotalEl.textContent = String(totalRainbows);

  hiddenRainbows.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('found')) return;
      btn.classList.add('found');
      foundCount += 1;
      if (discoveryCountEl) discoveryCountEl.textContent = String(foundCount);
      showToast('You found a rainbow! 🌈');

      if (foundCount >= totalRainbows) {
        setTimeout(() => {
          showToast('Yovanna found all the rainbows! 🌈✨');
          if (allFoundMsg) allFoundMsg.classList.remove('hidden');
        }, 400);
      }
    });
  });

  /* ---------------- wish garden ---------------- */
  const wishMessages = [
    'A bright wish is flying to Yovanna! 💕',
    'A sunshine wish for you! ☀️',
    'A sparkly wish just bloomed! ✨'
  ];

  const sparkleEmojis = ['✨', '🌟', '💫', '⭐'];

  function spawnSparkleBurst(button) {
    for (let i = 0; i < 5; i++) {
      const bit = document.createElement('span');
      bit.className = 'sparkle-bit';
      bit.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
      const angle = (Math.PI * 2 * i) / 5 + Math.random() * 0.5;
      const distance = 30 + Math.random() * 20;
      bit.style.setProperty('--sx', Math.cos(angle) * distance + 'px');
      bit.style.setProperty('--sy', Math.sin(angle) * distance - 20 + 'px');
      bit.style.left = '50%';
      bit.style.top = '50%';
      button.appendChild(bit);
      setTimeout(() => {
        if (bit.parentNode) bit.parentNode.removeChild(bit);
      }, 850);
    }
  }

  flowerButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const message = wishMessages[index % wishMessages.length];
      if (wishMessage) wishMessage.textContent = message;
      btn.classList.remove('blooming');
      // force reflow so the animation can restart on repeated taps
      void btn.offsetWidth;
      btn.classList.add('blooming');
      spawnSparkleBurst(btn);
      setTimeout(() => {
        btn.classList.remove('blooming');
      }, 600);
    });
  });

  /* ---------------- bubble adventure ---------------- */
  const bubbleColors = [
    'rgba(255,255,255,0.85)',
    'rgba(255, 150, 190, 0.65)',
    'rgba(150, 210, 255, 0.65)',
    'rgba(180, 255, 190, 0.65)',
    'rgba(255, 220, 130, 0.65)',
    'rgba(210, 170, 255, 0.65)',
    'rgba(255, 180, 120, 0.6)'
  ];

  let poppedCount = 0;
  let championShown = false;

  function createBubble() {
    if (!bubbleField) return;
    const bubble = document.createElement('button');
    bubble.className = 'pop-bubble';
    bubble.setAttribute('aria-label', 'Pop the bubble');

    const size = 30 + Math.random() * 46;
    const startX = 8 + Math.random() * 78; // percent
    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];

    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = startX + '%';
    bubble.style.bottom = '-10px';
    bubble.style.background =
      'radial-gradient(circle at 32% 28%, rgba(255,255,255,.95), ' + color + ' 60%)';

    const duration = 5 + Math.random() * 4;
    bubble.style.transition =
      'transform ' + duration + 's linear, opacity ' + duration + 's linear';

    bubbleField.appendChild(bubble);

    // start the float upward on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const riseHeight = bubbleField.clientHeight + 40;
        bubble.style.transform = 'translateY(-' + riseHeight + 'px)';
        bubble.style.opacity = '0.15';
      });
    });

    const removeTimer = setTimeout(() => {
      if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
    }, duration * 1000 + 200);

    bubble.addEventListener('click', () => {
      popBubble(bubble, removeTimer);
    });
    bubble.addEventListener('touchstart', (e) => {
      e.preventDefault();
      popBubble(bubble, removeTimer);
    }, { passive: false });
  }

  function popBubble(bubble, removeTimer) {
    if (bubble.dataset.popped) return;
    bubble.dataset.popped = 'true';
    clearTimeout(removeTimer);

    const rect = bubble.getBoundingClientRect();
    const fieldRect = bubbleField.getBoundingClientRect();

    const popText = document.createElement('span');
    popText.className = 'pop-text';
    popText.textContent = 'POP! ✨';
    popText.style.left = (rect.left - fieldRect.left) + 'px';
    popText.style.top = (rect.top - fieldRect.top) + 'px';
    bubbleField.appendChild(popText);

    if (bubble.parentNode) bubble.parentNode.removeChild(bubble);

    setTimeout(() => {
      if (popText.parentNode) popText.parentNode.removeChild(popText);
    }, 650);

    poppedCount += 1;

    if (poppedCount >= 6 && !championShown) {
      championShown = true;
      if (bubbleMessage) {
        bubbleMessage.textContent = 'Wow! Yovanna is a bubble champion! 🫧🌈';
      }
      for (let i = 0; i < 5; i++) {
        setTimeout(createBubble, i * 180);
      }
    }
  }

  if (wandBtn) {
    wandBtn.addEventListener('click', () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(createBubble, i * 220);
      }
    });
  }

  /* ---------------- birthday friends ---------------- */
  const friendMessages = {
    butterfly: 'The butterfly is dancing for you! 💕',
    unicorn: 'A unicorn hug for Yovanna! 🦄',
    bunny: 'The bunny says happy birthday! 🐰'
  };

  friendButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-friend');
      if (friendMessage && friendMessages[key]) {
        friendMessage.textContent = friendMessages[key];
      }
      btn.style.transform = 'scale(1.08)';
      setTimeout(() => { btn.style.transform = ''; }, 300);
    });
  });

  /* ---------------- gentle scroll-reveal for storybook cards ---------------- */
  const revealCards = Array.from(document.querySelectorAll('.paper-card'));
  if ('IntersectionObserver' in window && revealCards.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.25 }
    );
    revealCards.forEach((card) => revealObserver.observe(card));
  } else {
    // no IntersectionObserver support — just show everything
    revealCards.forEach((card) => card.classList.add('in-view'));
  }

  /* ---------------- ambient magic dust ---------------- */
  function spawnDustInto(container) {
    if (!container) return;
    const mote = document.createElement('div');
    mote.className = 'dust-mote';
    const size = 4 + Math.random() * 6;
    mote.style.width = size + 'px';
    mote.style.height = size + 'px';
    mote.style.left = Math.random() * 100 + '%';
    mote.style.bottom = '-10px';
    mote.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    const duration = 7 + Math.random() * 6;
    mote.style.animationDuration = duration + 's';
    container.appendChild(mote);
    setTimeout(() => {
      if (mote.parentNode) mote.parentNode.removeChild(mote);
    }, duration * 1000 + 300);
  }

  const worldDust = document.getElementById('worldDust');
  const finaleDust = document.getElementById('finaleDust');
  setInterval(() => {
    if (worldRevealed && world && !world.classList.contains('hidden')) {
      spawnDustInto(worldDust);
    }
    if (finale && !finale.classList.contains('hidden')) {
      spawnDustInto(finaleDust);
    }
  }, 900);

  /* ---------------- final surprise + confetti ---------------- */
  const confettiColors = ['#F2666B', '#FFA94D', '#FFDD57', '#8CE99A', '#74C0FC', '#B197FC', '#F783AC'];

  function launchConfetti() {
    if (!confettiLayer) return;
    const pieceCount = 40;
    for (let i = 0; i < pieceCount; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const size = 6 + Math.random() * 6;
      piece.style.width = size + 'px';
      piece.style.height = (size * 0.4) + 'px';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const duration = 3 + Math.random() * 2.5;
      piece.style.animationDuration = duration + 's';
      piece.style.animationDelay = (Math.random() * 0.6) + 's';
      confettiLayer.appendChild(piece);
      setTimeout(() => {
        if (piece.parentNode) piece.parentNode.removeChild(piece);
      }, (duration + 1) * 1000);
    }
  }

  function revealFinale() {
    world.classList.add('hidden');
    finale.classList.remove('hidden');
    finale.scrollIntoView({ behavior: 'smooth', block: 'start' });
    launchConfetti();
    setTimeout(launchConfetti, 900);
  }

  if (finalSurpriseBtn) {
    finalSurpriseBtn.addEventListener('click', revealFinale);
  }

})();