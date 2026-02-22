/**
 * JANE Bot — Low-Poly White Tile Companion
 * UFO-style free movement, cartoon eyes, speech bubbles
 */
(function () {

  const SIZE       = 90;
  const SPEED      = 0.6;
  const DIR_CHANGE = 4000;
  const MARGIN     = 20;

  let posX = 80, posY = 160;
  let velX = SPEED, velY = SPEED * 0.6;
  let isHovered = false;
  let wobble = 0;
  let blinkTimer, dirTimer, idleTimer;

  // ── ROOT ──
  const botEl = document.createElement('div');
  botEl.id = 'jb-bot';
  document.body.appendChild(botEl);

  const bubbleEl = document.createElement('div');
  bubbleEl.id = 'jb-bubble';
  document.body.appendChild(bubbleEl);

  // ── STYLES ──
  const css = document.createElement('style');
  css.textContent = `
    #jb-bot {
      position: fixed;
      width: ${SIZE}px;
      height: ${SIZE}px;
      pointer-events: all;
      cursor: pointer;
      z-index: 9500;
      will-change: left, top;
      filter: drop-shadow(0 6px 18px rgba(0,200,255,0.3))
              drop-shadow(0 0 6px rgba(0,200,255,0.15));
      transition: filter 0.3s;
    }
    #jb-bot:hover {
      filter: drop-shadow(0 6px 26px rgba(0,220,255,0.65))
              drop-shadow(0 0 14px rgba(0,220,255,0.45));
    }
    @keyframes jb-bob {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-8px); }
    }
    #jb-bot { animation: jb-bob 3s ease-in-out infinite; }

    @keyframes jb-pop {
      0%   { transform: scale(0) rotate(-15deg); opacity:0; }
      70%  { transform: scale(1.12) rotate(3deg); opacity:1; }
      100% { transform: scale(1) rotate(0deg); opacity:1; }
    }
    #jb-bot.intro {
      animation: jb-pop 0.65s cubic-bezier(.34,1.56,.64,1) forwards,
                 jb-bob 3s ease-in-out 0.65s infinite;
    }
    @keyframes jb-wave {
      0%,100% { transform: rotate(0deg) translateY(0); }
      20%     { transform: rotate(-16deg) translateY(-4px); }
      40%     { transform: rotate(13deg) translateY(-4px); }
      60%     { transform: rotate(-10deg) translateY(-2px); }
      80%     { transform: rotate(6deg); }
    }
    #jb-bot.wave {
      animation: jb-wave 1s ease-in-out forwards,
                 jb-bob 3s ease-in-out 1s infinite;
    }
    @keyframes jb-bounce {
      0%,100% { transform: scale(1) translateY(0); }
      35%     { transform: scale(0.93) translateY(-16px); }
      65%     { transform: scale(1.05) translateY(4px); }
    }
    #jb-bot.bounce {
      animation: jb-bounce 0.55s ease forwards,
                 jb-bob 3s ease-in-out 0.55s infinite;
    }

    /* ── BUBBLE ── */
    #jb-bubble {
      position: fixed;
      z-index: 9501;
      background: rgba(4,14,28,0.96);
      border: 1px solid rgba(0,220,255,0.55);
      border-radius: 10px;
      padding: 7px 13px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.7rem;
      color: #00ffe7;
      letter-spacing: 1.5px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transform: scale(0.85) translateY(4px);
      transform-origin: bottom center;
      transition: opacity 0.22s, transform 0.22s;
      box-shadow: 0 0 18px rgba(0,220,255,0.18);
    }
    #jb-bubble.show {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    #jb-bubble::after {
      content: '';
      position: absolute;
      bottom: -7px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 7px solid rgba(0,220,255,0.55);
    }
  `;
  document.head.appendChild(css);

  // ── SVG — Low-poly white tile face ──
  botEl.innerHTML = `
  <svg viewBox="0 0 90 90" width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="jb-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="jb-eglow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="3" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>

      <!-- Tile gradients simulating lit low-poly faces -->
      <linearGradient id="jb-tA" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#d0e6f0"/>
      </linearGradient>
      <linearGradient id="jb-tB" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#eef6fb"/>
        <stop offset="100%" stop-color="#b8d0dc"/>
      </linearGradient>
      <linearGradient id="jb-tC" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#c8dce8"/>
        <stop offset="100%" stop-color="#e8f4fa"/>
      </linearGradient>
      <linearGradient id="jb-tD" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="#daeaf4"/>
        <stop offset="100%" stop-color="#a8c0cc"/>
      </linearGradient>

      <clipPath id="jb-hclip">
        <ellipse cx="45" cy="43" rx="30" ry="32"/>
      </clipPath>
    </defs>

    <!-- Neck -->
    <rect x="37" y="73" width="16" height="9" rx="3"
          fill="#ccdce8" stroke="#00ccff" stroke-width="0.8" stroke-opacity="0.7"/>

    <!-- ── LOW-POLY TILES (clipped to head ellipse) ── -->
    <!-- Row 1 — top -->
    <polygon points="15,22 35,11 30,32"     fill="url(#jb-tA)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.7" clip-path="url(#jb-hclip)"/>
    <polygon points="35,11 55,11 45,30"     fill="url(#jb-tB)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.65" clip-path="url(#jb-hclip)"/>
    <polygon points="55,11 75,22 60,32"     fill="url(#jb-tA)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.7" clip-path="url(#jb-hclip)"/>

    <!-- Row 2 -->
    <polygon points="15,22 30,32 16,44"     fill="url(#jb-tC)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.6" clip-path="url(#jb-hclip)"/>
    <polygon points="30,32 45,30 36,48"     fill="url(#jb-tA)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.75" clip-path="url(#jb-hclip)"/>
    <polygon points="45,30 60,32 54,48"     fill="#f4faff"     stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.8"  clip-path="url(#jb-hclip)"/>
    <polygon points="60,32 75,22 74,44"     fill="url(#jb-tB)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.6" clip-path="url(#jb-hclip)"/>

    <!-- Row 3 -->
    <polygon points="16,44 30,32 20,58"     fill="url(#jb-tD)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.5" clip-path="url(#jb-hclip)"/>
    <polygon points="30,32 36,48 24,60"     fill="url(#jb-tC)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.55" clip-path="url(#jb-hclip)"/>
    <polygon points="36,48 54,48 45,65"     fill="url(#jb-tA)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.7" clip-path="url(#jb-hclip)"/>
    <polygon points="54,48 74,44 66,60"     fill="url(#jb-tC)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.55" clip-path="url(#jb-hclip)"/>

    <!-- Row 4 — chin -->
    <polygon points="20,58 24,60 28,74"     fill="url(#jb-tD)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.45" clip-path="url(#jb-hclip)"/>
    <polygon points="24,60 45,65 36,76"     fill="url(#jb-tB)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.5" clip-path="url(#jb-hclip)"/>
    <polygon points="45,65 66,60 54,76"     fill="url(#jb-tC)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.5" clip-path="url(#jb-hclip)"/>
    <polygon points="66,60 70,58 62,74"     fill="url(#jb-tD)" stroke="#00ccff" stroke-width="0.65" stroke-opacity="0.45" clip-path="url(#jb-hclip)"/>

    <!-- Outer head ring -->
    <ellipse cx="45" cy="43" rx="30" ry="32"
             fill="none" stroke="#00ccff" stroke-width="1.6"
             stroke-opacity="0.75" filter="url(#jb-glow)"/>

    <!-- Inner highlight (top gloss) -->
    <ellipse cx="41" cy="24" rx="13" ry="6"
             fill="white" opacity="0.22" clip-path="url(#jb-hclip)"/>

    <!-- ── EYES ── -->
    <g id="jb-eye-l">
      <!-- Eye white area (dark for cartoon look) -->
      <ellipse cx="31" cy="42" rx="8.5" ry="7.5"
               fill="#0e1822" stroke="#00ccff" stroke-width="1.1" stroke-opacity="0.9"/>
      <!-- Pupil (cyan glow dot) -->
      <ellipse id="jb-pupil-l" cx="31" cy="42" rx="3.2" ry="3.2"
               fill="#00ffe7" filter="url(#jb-eglow)" opacity="0.95"/>
      <!-- Catchlight -->
      <ellipse cx="28.8" cy="40" rx="1.2" ry="1.2" fill="white" opacity="0.85"/>
    </g>

    <g id="jb-eye-r">
      <ellipse cx="59" cy="42" rx="8.5" ry="7.5"
               fill="#0e1822" stroke="#00ccff" stroke-width="1.1" stroke-opacity="0.9"/>
      <ellipse id="jb-pupil-r" cx="59" cy="42" rx="3.2" ry="3.2"
               fill="#00ffe7" filter="url(#jb-eglow)" opacity="0.95"/>
      <ellipse cx="56.8" cy="40" rx="1.2" ry="1.2" fill="white" opacity="0.85"/>
    </g>

    <!-- ── SMILE ── -->
    <path id="jb-smile" d="M-8,0 Q0,6 8,0"
          transform="translate(45,63)"
          fill="none" stroke="#00ccff" stroke-width="1.8"
          stroke-linecap="round" filter="url(#jb-glow)" opacity="0.85"/>

    <!-- ── ANTENNA ── -->
    <line x1="45" y1="11" x2="45" y2="3"
          stroke="#00ccff" stroke-width="1.3" stroke-opacity="0.9"/>
    <circle cx="45" cy="2.5" r="2.8"
            fill="#00ffe7" filter="url(#jb-eglow)" opacity="0.95"/>

    <!-- Cheek blush -->
    <ellipse cx="21" cy="51" rx="5" ry="3" fill="#ffaaaa" opacity="0.15"/>
    <ellipse cx="69" cy="51" rx="5" ry="3" fill="#ffaaaa" opacity="0.15"/>
  </svg>
  `;

  // ── MESSAGES ──
  const msgs = {
    intro: ['JANE.BOT ONLINE ⚡', 'HEY THERE! 👋', 'HELLO HUMAN!'],
    hover: ['PSST... HI!', 'NEED HELP? 🤔', 'CLICK ME! 👆', 'JANE v6.0 🔒'],
    click: ['STAY OFFLINE 🔒', 'NO CLOUD. EVER.', 'PRIVACY = POWER', 'BEEP BOOP! 🤖', 'I AM JANE!', '100% LOCAL ⚡'],
    idle:  ['SCANNING... 👀', 'ALL SYSTEMS GO ✓', 'STILL HERE!', 'BOT MODE: ON'],
  };
  function pick(t) { const a = msgs[t]; return a[Math.floor(Math.random() * a.length)]; }

  // ── BUBBLE ──
  let bubbleTO;
  function showBubble(text, dur = 2500) {
    clearTimeout(bubbleTO);
    bubbleEl.textContent = text;
    const bx = posX + SIZE / 2;
    const by = posY - 42;
    bubbleEl.style.left = Math.max(8, Math.min(window.innerWidth - 190, bx - 80)) + 'px';
    bubbleEl.style.top  = Math.max(8, by) + 'px';
    bubbleEl.classList.add('show');
    bubbleTO = setTimeout(() => bubbleEl.classList.remove('show'), dur);
  }

  // ── PUPILS ──
  const pupL = botEl.querySelector('#jb-pupil-l');
  const pupR = botEl.querySelector('#jb-pupil-r');
  const eyL  = botEl.querySelector('#jb-eye-l');
  const eyR  = botEl.querySelector('#jb-eye-r');
  const sml  = botEl.querySelector('#jb-smile');

  function setEyes(dx, dy) {
    const mx = 2.2, my = 1.6;
    const x = Math.max(-1, Math.min(1, dx));
    const y = Math.max(-1, Math.min(1, dy));
    pupL.setAttribute('cx', 31 + x * mx);
    pupL.setAttribute('cy', 42 + y * my);
    pupR.setAttribute('cx', 59 + x * mx);
    pupR.setAttribute('cy', 42 + y * my);
  }

  document.addEventListener('mousemove', (e) => {
    const bx = posX + SIZE / 2;
    const by = posY + SIZE / 2;
    setEyes((e.clientX - bx) / 130, (e.clientY - by) / 130);
  });

  // ── BLINK ──
  function doBlink() {
    [eyL, eyR].forEach(g => {
      g.style.transform = 'scaleY(0.08)';
      g.style.transformOrigin = 'center';
      g.style.transition = 'transform 0.07s';
    });
    setTimeout(() => {
      [eyL, eyR].forEach(g => { g.style.transform = 'scaleY(1)'; });
    }, 110);
  }
  function scheduleBlink() {
    blinkTimer = setTimeout(() => {
      doBlink();
      if (Math.random() > 0.5) setTimeout(doBlink, 230);
      scheduleBlink();
    }, 2600 + Math.random() * 2400);
  }
  scheduleBlink();

  // ── SMILE ──
  function setSmile(t) {
    if (t === 'happy') sml.setAttribute('d', 'M-9,0 Q0,9 9,0');
    else               sml.setAttribute('d', 'M-8,0 Q0,6 8,0');
  }

  // ── UFO MOVEMENT ──
  function newDir() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const toBias = Math.atan2(cy - posY, cx - posX);
    const dist = Math.hypot(cx - posX, cy - posY) / Math.max(cx, cy);
    const spread = Math.PI * (dist > 0.65 ? 1.2 : 1.9);
    const angle = toBias + (Math.random() - 0.5) * spread;
    const spd = SPEED * (0.45 + Math.random() * 0.9);
    velX = Math.cos(angle) * spd;
    velY = Math.sin(angle) * spd;
  }

  function scheduleDir() {
    dirTimer = setTimeout(() => { newDir(); scheduleDir(); },
      DIR_CHANGE * (0.55 + Math.random() * 0.9));
  }
  newDir();
  scheduleDir();

  // ── ANIMATION LOOP ──
  function loop() {
    if (!isHovered) {
      wobble += 0.038;
      posX += velX + Math.sin(wobble * 0.6) * 0.35;
      posY += velY + Math.cos(wobble * 0.9) * 0.22;

      const maxX = window.innerWidth  - SIZE - MARGIN;
      const maxY = window.innerHeight - SIZE - MARGIN;
      const minY = MARGIN + 55;

      if (posX < MARGIN) { posX = MARGIN; velX =  Math.abs(velX) * 0.9; }
      if (posX > maxX)   { posX = maxX;   velX = -Math.abs(velX) * 0.9; }
      if (posY < minY)   { posY = minY;   velY =  Math.abs(velY) * 0.9; }
      if (posY > maxY)   { posY = maxY;   velY = -Math.abs(velY) * 0.9; }

      botEl.style.left = posX + 'px';
      botEl.style.top  = posY + 'px';
    }
    requestAnimationFrame(loop);
  }
  loop();

  // ── INTERACTIONS ──
  botEl.addEventListener('mouseenter', () => {
    isHovered = true;
    setSmile('happy');
    showBubble(pick('hover'), 2000);
  });
  botEl.addEventListener('mouseleave', () => {
    isHovered = false;
    setSmile('normal');
    setEyes(0, 0);
  });
  botEl.addEventListener('click', () => {
    botEl.classList.remove('wave', 'bounce');
    void botEl.offsetWidth;
    botEl.classList.add(Math.random() > 0.5 ? 'wave' : 'bounce');
    setSmile('happy');
    showBubble(pick('click'), 2200);
    doBlink(); setTimeout(doBlink, 200);
    setTimeout(() => setSmile('normal'), 1600);
  });

  idleTimer = setInterval(() => {
    if (!isHovered && Math.random() > 0.5) showBubble(pick('idle'), 2000);
  }, 11000);

  // ── INTRO ──
  botEl.style.left    = posX + 'px';
  botEl.style.top     = posY + 'px';
  botEl.style.opacity = '0';
  setTimeout(() => {
    botEl.style.opacity = '1';
    botEl.classList.add('intro');
    setTimeout(() => showBubble(pick('intro'), 2800), 500);
    setTimeout(() => {
      botEl.classList.remove('intro');
      botEl.classList.add('wave');
      setTimeout(() => botEl.classList.remove('wave'), 1100);
    }, 700);
  }, 900);

})();
