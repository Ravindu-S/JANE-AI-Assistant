/**
 * JANE Bot — Floating Cyberpunk Companion
 * A floating bot face that waves, follows scroll, switches sides,
 * and looks at content like a side profile.
 * 
 * Usage: Add <script src="jane-bot.js"></script> to index.md before </body>
 */

(function () {
  // ── CONFIG ──
  const SWITCH_CHANCE = 0.3;       // probability of switching sides on scroll stop
  const FLOAT_SPEED   = 120;       // ms per scroll position update
  const LOOK_DELAY    = 600;       // ms after scroll stop before looking inward
  const BOT_SIZE      = 90;        // px

  // ── STATE ──
  let side        = 'left';        // 'left' | 'right'
  let looking     = 'front';       // 'front' | 'inward' | 'user'
  let isScrolling = false;
  let scrollTimer = null;
  let floatTimer  = null;
  let targetY     = 120;
  let currentY    = 120;
  let introduced  = false;
  let isHovered   = false;
  let clickCount  = 0;

  // ── BUILD DOM ──
  const wrapper = document.createElement('div');
  wrapper.id = 'jane-bot-wrapper';

  const bot = document.createElement('div');
  bot.id = 'jane-bot';

  const bubble = document.createElement('div');
  bubble.id = 'jane-bubble';

  wrapper.appendChild(bubble);
  wrapper.appendChild(bot);
  document.body.appendChild(wrapper);

  // ── STYLES ──
  const style = document.createElement('style');
  style.textContent = `
    #jane-bot-wrapper {
      position: fixed;
      left: 18px;
      top: 120px;
      z-index: 9000;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      pointer-events: none;
      transition: left 0.7s cubic-bezier(0.34,1.56,0.64,1),
                  right 0.7s cubic-bezier(0.34,1.56,0.64,1),
                  top 0.4s ease;
    }

    #jane-bot-wrapper.right-side {
      left: unset;
      right: 18px;
      align-items: flex-end;
    }

    #jane-bot {
      width: ${BOT_SIZE}px;
      height: ${BOT_SIZE}px;
      cursor: pointer;
      pointer-events: all;
      position: relative;
      transform-origin: center bottom;
      animation: bot-float 3.5s ease-in-out infinite;
      transition: transform 0.5s ease;
      filter: drop-shadow(0 0 10px rgba(0,255,231,0.4));
    }

    #jane-bot:hover {
      filter: drop-shadow(0 0 18px rgba(0,255,231,0.8));
    }

    /* Face orientation transitions */
    #jane-bot.face-front   { transform: scaleX(1); }
    #jane-bot.face-inward  { transform: scaleX(-1); }
    #jane-bot.face-right   { transform: scaleX(1); }
    #jane-bot.right-side #jane-bot.face-inward { transform: scaleX(1); }

    @keyframes bot-float {
      0%,100% { margin-bottom: 0px; }
      50%      { margin-bottom: 10px; }
    }

    /* ── WAVE animation ── */
    @keyframes bot-wave {
      0%   { transform: scaleX(var(--sx,1)) rotate(0deg); }
      15%  { transform: scaleX(var(--sx,1)) rotate(-12deg); }
      30%  { transform: scaleX(var(--sx,1)) rotate(10deg); }
      45%  { transform: scaleX(var(--sx,1)) rotate(-10deg); }
      60%  { transform: scaleX(var(--sx,1)) rotate(8deg); }
      75%  { transform: scaleX(var(--sx,1)) rotate(-6deg); }
      100% { transform: scaleX(var(--sx,1)) rotate(0deg); }
    }
    #jane-bot.waving {
      animation: bot-wave 1.2s ease-in-out, bot-float 3.5s ease-in-out 1.2s infinite;
    }

    /* ── SPEECH BUBBLE ── */
    #jane-bubble {
      background: rgba(2,12,24,0.95);
      border: 1px solid rgba(0,255,231,0.4);
      border-radius: 6px;
      padding: 8px 13px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.72rem;
      color: #00ffe7;
      letter-spacing: 1px;
      max-width: 160px;
      pointer-events: none;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      position: relative;
      box-shadow: 0 0 15px rgba(0,255,231,0.15);
      line-height: 1.4;
      order: -1;
    }

    #jane-bot-wrapper.right-side #jane-bubble {
      text-align: right;
    }

    /* bubble tail */
    #jane-bubble::after {
      content: '';
      position: absolute;
      bottom: -7px;
      left: 18px;
      width: 12px;
      height: 7px;
      background: rgba(2,12,24,0.95);
      clip-path: polygon(0 0, 100% 0, 50% 100%);
      border-left: 1px solid rgba(0,255,231,0.4);
      border-right: 1px solid rgba(0,255,231,0.4);
    }

    #jane-bot-wrapper.right-side #jane-bubble::after {
      left: unset;
      right: 18px;
    }

    #jane-bubble.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── GLITCH on scroll ── */
    @keyframes bot-glitch {
      0%,100% { clip-path: none; filter: drop-shadow(0 0 10px rgba(0,255,231,0.4)); }
      20% { clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%); filter: drop-shadow(3px 0 0 #ff00aa) drop-shadow(-3px 0 0 #00ffe7); }
      40% { clip-path: none; filter: drop-shadow(0 0 10px rgba(0,255,231,0.4)); }
      60% { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); filter: drop-shadow(-3px 0 0 #ff00aa); }
      80% { clip-path: none; }
    }
    #jane-bot.glitching {
      animation: bot-glitch 0.4s steps(1) forwards, bot-float 3.5s ease-in-out 0.4s infinite;
    }
  `;
  document.head.appendChild(style);

  // ── SVG FACE ──
  // Front-facing cyberpunk helmet, drawn to scaleX flip for side profile effect
  bot.innerHTML = `
    <svg viewBox="0 0 90 90" width="${BOT_SIZE}" height="${BOT_SIZE}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="helmGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#0a2535"/>
          <stop offset="100%" stop-color="#020c18"/>
        </radialGradient>
        <radialGradient id="visorGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#00ffe7" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#001a2e" stop-opacity="0.9"/>
        </radialGradient>
        <filter id="glow-f">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="visor-glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- Neck -->
      <rect x="34" y="72" width="22" height="10" rx="3" fill="#071525" stroke="#00ffe744" stroke-width="1"/>
      <rect x="38" y="74" width="3" height="6" rx="1" fill="#00ffe733"/>
      <rect x="49" y="74" width="3" height="6" rx="1" fill="#00ffe733"/>

      <!-- Helmet body -->
      <ellipse cx="45" cy="42" rx="31" ry="34" fill="url(#helmGrad)" stroke="#00ffe744" stroke-width="1.2"/>

      <!-- Helmet top ridge -->
      <ellipse cx="45" cy="12" rx="16" ry="5" fill="#0a2535" stroke="#00ffe766" stroke-width="1"/>
      <rect x="40" y="8" width="10" height="8" rx="2" fill="#071525" stroke="#00ffe755" stroke-width="0.8"/>

      <!-- Side panels -->
      <rect x="10" y="35" width="8" height="18" rx="3" fill="#071525" stroke="#00ffe733" stroke-width="1"/>
      <rect x="72" y="35" width="8" height="18" rx="3" fill="#071525" stroke="#00ffe733" stroke-width="1"/>

      <!-- Side vents -->
      <line x1="12" y1="39" x2="18" y2="39" stroke="#00ffe755" stroke-width="1"/>
      <line x1="12" y1="43" x2="18" y2="43" stroke="#00ffe755" stroke-width="1"/>
      <line x1="12" y1="47" x2="18" y2="47" stroke="#00ffe755" stroke-width="1"/>
      <line x1="72" y1="39" x2="78" y2="39" stroke="#00ffe755" stroke-width="1"/>
      <line x1="72" y1="43" x2="78" y2="43" stroke="#00ffe755" stroke-width="1"/>
      <line x1="72" y1="47" x2="78" y2="47" stroke="#00ffe755" stroke-width="1"/>

      <!-- Visor main -->
      <path d="M18 36 Q18 22 45 22 Q72 22 72 36 L72 52 Q72 62 45 62 Q18 62 18 52 Z"
            fill="url(#visorGrad)" stroke="#00ffe7" stroke-width="1.5" filter="url(#visor-glow)"/>

      <!-- Visor scan line -->
      <line x1="20" y1="42" x2="70" y2="42" stroke="#00ffe7" stroke-width="0.6" opacity="0.4"/>
      <line x1="20" y1="46" x2="70" y2="46" stroke="#00ffe7" stroke-width="0.4" opacity="0.25"/>

      <!-- Visor reflection -->
      <path d="M24 28 Q35 26 42 30" stroke="rgba(255,255,255,0.15)" stroke-width="2" fill="none" stroke-linecap="round"/>

      <!-- Eyes (inside visor) -->
      <g id="bot-eye-left" filter="url(#glow-f)">
        <ellipse cx="33" cy="41" rx="7" ry="5" fill="#001520" stroke="#00ffe7" stroke-width="1"/>
        <ellipse id="pupil-left" cx="33" cy="41" rx="3.5" ry="3.5" fill="#00ffe7" opacity="0.9"/>
        <ellipse cx="31.5" cy="39.5" rx="1" ry="1" fill="white" opacity="0.5"/>
      </g>
      <g id="bot-eye-right" filter="url(#glow-f)">
        <ellipse cx="57" cy="41" rx="7" ry="5" fill="#001520" stroke="#00ffe7" stroke-width="1"/>
        <ellipse id="pupil-right" cx="57" cy="41" rx="3.5" ry="3.5" fill="#00ffe7" opacity="0.9"/>
        <ellipse cx="55.5" cy="39.5" rx="1" ry="1" fill="white" opacity="0.5"/>
      </g>

      <!-- Mouth / chin area -->
      <rect x="30" y="62" width="30" height="7" rx="3" fill="#071525" stroke="#00ffe733" stroke-width="1"/>
      <!-- Mouth LEDs -->
      <g id="bot-mouth">
        <circle cx="35" cy="65.5" r="1.5" fill="#00ffe7" opacity="0.9"/>
        <circle cx="40" cy="65.5" r="1.5" fill="#00ffe7" opacity="0.7"/>
        <circle cx="45" cy="65.5" r="1.5" fill="#00ffe7" opacity="0.9"/>
        <circle cx="50" cy="65.5" r="1.5" fill="#00ffe7" opacity="0.7"/>
        <circle cx="55" cy="65.5" r="1.5" fill="#00ffe7" opacity="0.9"/>
      </g>

      <!-- Top antenna -->
      <line x1="45" y1="8" x2="45" y2="2" stroke="#00ffe7" stroke-width="1.2"/>
      <circle cx="45" cy="2" r="2" fill="#00ffe7" opacity="0.9" filter="url(#glow-f)"/>

      <!-- Chin detail -->
      <rect x="36" y="69" width="18" height="3" rx="1.5" fill="#0a2535" stroke="#00ffe722" stroke-width="0.8"/>
    </svg>
  `;

  // ── MESSAGES ──
  const messages = {
    intro:   ['JANE.BOT ONLINE', 'HEY THERE! 👋', 'WELCOME!'],
    hover:   ['HELLO, HUMAN', 'NEED HELP?', 'CLICK ME!', 'JANE v6.0 ⚡'],
    click:   ['GOOD CHOICE!', 'STAY OFFLINE 🔒', 'PRIVACY FIRST', 'NO CLOUD. EVER.', 'I AM JANE 🤖', 'BEEP BOOP!'],
    scroll:  ['LOOKING AROUND...', 'INTERESTING...', 'AH, I SEE!', 'NICE SPECS!'],
    idle:    ['STILL HERE!', 'BOT MODE: ON', 'SYSTEMS GO ✓'],
  };

  function getMessage(type) {
    const arr = messages[type];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── BUBBLE ──
  let bubbleTimer = null;
  function showBubble(text, duration = 2400) {
    clearTimeout(bubbleTimer);
    bubble.textContent = text;
    bubble.classList.add('visible');
    bubbleTimer = setTimeout(() => bubble.classList.remove('visible'), duration);
  }

  // ── EYE MOVEMENT ──
  const pupilL = bot.querySelector('#pupil-left');
  const pupilR = bot.querySelector('#pupil-right');

  function setEyes(dx, dy) {
    // dx/dy in range -1 to 1
    const mx = 2, my = 1.5;
    pupilL.setAttribute('cx', 33 + dx * mx);
    pupilL.setAttribute('cy', 41 + dy * my);
    pupilR.setAttribute('cx', 57 + dx * mx);
    pupilR.setAttribute('cy', 41 + dy * my);
  }

  // Eyes look at cursor
  bot.addEventListener('mousemove', (e) => {
    const rect = bot.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 80));
    const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 80));
    setEyes(dx, dy);
  });

  bot.addEventListener('mouseleave', () => {
    setEyes(0, 0);
    isHovered = false;
  });

  // ── BLINK ──
  const eyeL = bot.querySelector('#bot-eye-left');
  const eyeR = bot.querySelector('#bot-eye-right');

  function blink() {
    [eyeL, eyeR].forEach(e => e.style.transform = 'scaleY(0.1)');
    [eyeL, eyeR].forEach(e => e.style.transformOrigin = '50% 50%');
    [eyeL, eyeR].forEach(e => e.style.transition = 'transform 0.08s');
    setTimeout(() => {
      [eyeL, eyeR].forEach(e => e.style.transform = 'scaleY(1)');
    }, 100);
  }

  setInterval(() => {
    blink();
    if (Math.random() > 0.6) setTimeout(blink, 250);
  }, 2800 + Math.random() * 2000);

  // ── MOUTH PULSE (smile animation) ──
  const mouthDots = bot.querySelectorAll('#bot-mouth circle');
  let mouthDir = 1, mouthIdx = 0;

  setInterval(() => {
    mouthDots.forEach((d, i) => d.setAttribute('opacity', i === mouthIdx ? '1' : '0.3'));
    mouthIdx += mouthDir;
    if (mouthIdx >= mouthDots.length - 1 || mouthIdx <= 0) mouthDir *= -1;
  }, 180);

  // ── SIDE SWITCHING ──
  function setSide(newSide, lookDir) {
    side = newSide;
    if (side === 'right') {
      wrapper.classList.add('right-side');
    } else {
      wrapper.classList.remove('right-side');
    }
    setLook(lookDir || 'front');
  }

  // ── LOOK DIRECTION ──
  // 'front'  = face forward (scaleX 1)
  // 'inward' = face toward page content (scaleX flip based on side)
  // 'user'   = face outward toward user
  function setLook(dir) {
    looking = dir;
    let sx = 1;
    if (dir === 'inward') {
      sx = side === 'left' ? -1 : 1;
    } else if (dir === 'user') {
      sx = side === 'left' ? 1 : -1;
    } else {
      sx = 1;
    }
    bot.style.setProperty('--sx', sx);
    bot.style.transform = `scaleX(${sx})`;
  }

  // ── SCROLL HANDLING ──
  let lastScrollY = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    const winH    = window.innerHeight;

    // Move bot to follow scroll (clamped)
    targetY = Math.max(80, Math.min(scrollY + winH * 0.35, scrollY + winH - BOT_SIZE - 40));

    // Glitch on fast scroll
    const delta = Math.abs(scrollY - lastScrollY);
    if (delta > 60 && !isScrolling) {
      bot.classList.add('glitching');
      setTimeout(() => bot.classList.remove('glitching'), 420);
    }
    lastScrollY = scrollY;

    // Look inward while scrolling
    if (!isHovered) setLook('inward');
    isScrolling = true;

    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      isScrolling = false;

      // Randomly switch sides
      if (Math.random() < SWITCH_CHANCE) {
        const newSide = side === 'left' ? 'right' : 'left';
        setSide(newSide, 'inward');
        showBubble(getMessage('scroll'));
      }

      // After settling, look back at user
      setTimeout(() => {
        if (!isHovered) setLook('user');
      }, LOOK_DELAY);

    }, 350);
  }

  // Smooth Y position update
  function updatePosition() {
    currentY += (targetY - currentY) * 0.08;
    wrapper.style.top = Math.round(currentY) + 'px';
    requestAnimationFrame(updatePosition);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(updatePosition);

  // ── CLICK INTERACTION ──
  bot.addEventListener('click', () => {
    clickCount++;
    showBubble(getMessage('click'), 2000);
    blink();
    blink();
    // do a little wave
    bot.classList.remove('waving');
    void bot.offsetWidth;
    bot.classList.add('waving');
    setTimeout(() => bot.classList.remove('waving'), 1300);
  });

  bot.addEventListener('mouseenter', () => {
    isHovered = true;
    setLook('user');
    showBubble(getMessage('hover'), 1800);
  });

  // ── INTRO WAVE ──
  setTimeout(() => {
    introduced = true;
    bot.classList.add('waving');
    showBubble(getMessage('intro'), 2800);
    setTimeout(() => {
      bot.classList.remove('waving');
      setLook('user');
    }, 1400);
  }, 900);

  // ── IDLE MESSAGES ──
  setInterval(() => {
    if (!isHovered && !isScrolling && Math.random() > 0.6) {
      showBubble(getMessage('idle'), 2000);
    }
  }, 12000);

})();
