/**
 * JANE Bot — Hexagonal Porcelain Visor Companion
 * Floats in left/right margins, avoids center content column.
 * White porcelain skin, glowing circuit lines, cyan visor, ear panels.
 */
(function () {

  const SIZE         = 90;
  const CONTENT_W    = 1100;   // max-width of page content column
  const MARGIN_PAD   = 14;     // extra buffer from content edge
  const EDGE_PAD     = 12;     // min distance from screen edges
  const SPEED_BASE   = 0.55;
  const DIR_CHANGE   = 4200;

  let posX = 30, posY = 180;
  let velX = SPEED_BASE * 0.4;
  let velY = SPEED_BASE * 0.7;
  let wobble   = 0;
  let isHovered = false;
  let blinkTimer, dirTimer, idleTimer;

  // ── MARGIN ZONES (recalculated on resize) ──
  // Content column is centered; bot must stay outside it
  function getZones() {
    const vw = window.innerWidth;
    const contentLeft  = Math.max(0, (vw - CONTENT_W) / 2);
    const contentRight = Math.min(vw, (vw + CONTENT_W) / 2);
    return {
      // Left margin zone
      lx1: EDGE_PAD,
      lx2: Math.max(EDGE_PAD, contentLeft - MARGIN_PAD - SIZE),
      // Right margin zone
      rx1: Math.min(vw - SIZE - EDGE_PAD, contentRight + MARGIN_PAD),
      rx2: vw - SIZE - EDGE_PAD,
      vy1: 70,
      vy2: window.innerHeight - SIZE - EDGE_PAD,
    };
  }

  // Determine which margin zone bot is in (or should snap to)
  function getZone() {
    const z = getZones();
    const vw = window.innerWidth;
    const mid = vw / 2;
    return posX + SIZE / 2 < mid ? 'left' : 'right';
  }

  // Clamp posX to whichever margin zone bot is currently in
  function clampToZone() {
    const z = getZones();
    const zone = getZone();
    if (zone === 'left') {
      posX = Math.max(z.lx1, Math.min(z.lx2, posX));
    } else {
      posX = Math.max(z.rx1, Math.min(z.rx2, posX));
    }
    const z2 = getZones();
    posY = Math.max(z2.vy1, Math.min(z2.vy2, posY));
  }

  // ── DOM ──
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
      filter:
        drop-shadow(0 6px 16px rgba(0,210,255,0.28))
        drop-shadow(0 2px 6px rgba(0,0,0,0.18));
      transition: filter 0.3s;
    }
    #jb-bot:hover {
      filter:
        drop-shadow(0 6px 28px rgba(0,230,255,0.65))
        drop-shadow(0 0 12px rgba(0,230,255,0.4));
    }

    @keyframes jb-bob {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      30%     { transform: translateY(-7px) rotate(0.8deg); }
      70%     { transform: translateY(-3px) rotate(-0.5deg); }
    }
    #jb-bot { animation: jb-bob 3.2s ease-in-out infinite; }

    @keyframes jb-pop {
      0%   { transform: scale(0) rotate(-20deg); opacity:0; }
      65%  { transform: scale(1.13) rotate(3deg); opacity:1; }
      100% { transform: scale(1) rotate(0deg); }
    }
    #jb-bot.intro {
      animation: jb-pop 0.7s cubic-bezier(.34,1.56,.64,1) forwards,
                 jb-bob 3.2s ease-in-out 0.7s infinite;
    }

    @keyframes jb-wave {
      0%,100% { transform: rotate(0deg); }
      20%  { transform: rotate(-18deg); }
      40%  { transform: rotate(14deg); }
      60%  { transform: rotate(-10deg); }
      80%  { transform: rotate(6deg); }
    }
    #jb-bot.wave {
      animation: jb-wave 1s ease-in-out forwards,
                 jb-bob 3.2s ease-in-out 1s infinite;
    }

    @keyframes jb-bounce {
      0%,100% { transform: scale(1) translateY(0); }
      35%  { transform: scale(0.92) translateY(-18px); }
      65%  { transform: scale(1.06) translateY(5px); }
    }
    #jb-bot.bounce {
      animation: jb-bounce 0.52s ease forwards,
                 jb-bob 3.2s ease-in-out 0.52s infinite;
    }

    /* Visor scan line animation */
    @keyframes jb-scan {
      0%   { transform: translateY(-18px); opacity: 0; }
      10%  { opacity: 0.7; }
      90%  { opacity: 0.5; }
      100% { transform: translateY(18px); opacity: 0; }
    }
    .jb-scanline {
      animation: jb-scan 2.8s ease-in-out infinite;
    }

    /* Circuit pulse */
    @keyframes jb-pulse {
      0%,100% { opacity: 0.35; }
      50%     { opacity: 0.85; }
    }
    .jb-circuit { animation: jb-pulse 3s ease-in-out infinite; }
    .jb-circuit-b { animation: jb-pulse 4.1s ease-in-out infinite 0.8s; }
    .jb-circuit-c { animation: jb-pulse 2.6s ease-in-out infinite 1.5s; }

    /* Antenna glow pulse */
    @keyframes jb-ant {
      0%,100% { r: 2.8; opacity: 0.9; }
      50%     { r: 4; opacity: 1; }
    }
    #jb-ant-dot { animation: jb-ant 1.8s ease-in-out infinite; }

    /* Crack glow pulse */
    @keyframes jb-crack {
      0%,100% { opacity: 0.2; }
      50%     { opacity: 0.55; }
    }
    .jb-crack { animation: jb-crack 3.5s ease-in-out infinite; }

    /* ── BUBBLE ── */
    #jb-bubble {
      position: fixed;
      z-index: 9501;
      background: rgba(4,14,28,0.96);
      border: 1px solid rgba(0,220,255,0.5);
      border-radius: 8px;
      padding: 7px 13px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.68rem;
      color: #00ffe7;
      letter-spacing: 1.5px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transform: scale(0.85) translateY(5px);
      transform-origin: bottom center;
      transition: opacity 0.22s, transform 0.22s;
      box-shadow: 0 0 16px rgba(0,220,255,0.18);
    }
    #jb-bubble.show { opacity:1; transform: scale(1) translateY(0); }
    #jb-bubble::after {
      content: '';
      position: absolute;
      bottom: -7px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 7px solid rgba(0,220,255,0.5);
    }
  `;
  document.head.appendChild(css);

  // ── SVG SKIN ──
  // Hexagonal porcelain face, visor, circuit lines, ear panels, crack glow
  botEl.innerHTML = `
  <svg viewBox="0 0 90 95" width="${SIZE}" height="${SIZE + 5}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Filters -->
      <filter id="jb-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="jb-vglow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="jb-sglow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>

      <!-- Porcelain white gradient — smooth, slightly warm top -->
      <linearGradient id="jb-porcelain" x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%"   stop-color="#ffffff"/>
        <stop offset="40%"  stop-color="#f0f6fa"/>
        <stop offset="100%" stop-color="#d4e4ee"/>
      </linearGradient>

      <!-- Side panel gradient (slightly darker) -->
      <linearGradient id="jb-panel" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#deeaf2"/>
        <stop offset="100%" stop-color="#b8ccd8"/>
      </linearGradient>

      <!-- Visor gradient — dark with cyan tint -->
      <linearGradient id="jb-visor" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%"   stop-color="#001828" stop-opacity="0.92"/>
        <stop offset="50%"  stop-color="#002535" stop-opacity="0.88"/>
        <stop offset="100%" stop-color="#001020" stop-opacity="0.95"/>
      </linearGradient>

      <!-- Visor reflection -->
      <linearGradient id="jb-vrefl" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"  stop-color="white" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="white" stop-opacity="0"/>
      </linearGradient>

      <!-- Neck gradient -->
      <linearGradient id="jb-neck" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stop-color="#ddeaf4"/>
        <stop offset="100%" stop-color="#b0c8d8"/>
      </linearGradient>

      <!-- Clip for visor -->
      <clipPath id="jb-vclip">
        <path d="M22,36 L28,28 L62,28 L68,36 L68,54 L62,60 L28,60 L22,54 Z"/>
      </clipPath>

      <!-- Clip for face -->
      <clipPath id="jb-fclip">
        <polygon points="45,8 72,22 76,52 62,76 28,76 14,52 18,22"/>
      </clipPath>
    </defs>

    <!-- ══ NECK ══ -->
    <rect x="35" y="76" width="20" height="10" rx="3"
          fill="url(#jb-neck)" stroke="#00ccff" stroke-width="0.7" stroke-opacity="0.5"/>
    <!-- Neck detail lines -->
    <line x1="39" y1="78" x2="39" y2="84" stroke="#00ccff" stroke-width="0.6" stroke-opacity="0.35"/>
    <line x1="45" y1="77" x2="45" y2="85" stroke="#00ccff" stroke-width="0.6" stroke-opacity="0.35"/>
    <line x1="51" y1="78" x2="51" y2="84" stroke="#00ccff" stroke-width="0.6" stroke-opacity="0.35"/>

    <!-- ══ EAR PANELS (left & right) ══ -->
    <!-- Left ear panel -->
    <path d="M14,38 L18,28 L18,56 L14,52 Z"
          fill="url(#jb-panel)" stroke="#00ccff" stroke-width="0.8" stroke-opacity="0.6"/>
    <line x1="14.5" y1="36" x2="17.5" y2="32" stroke="#00ccff" stroke-width="0.6" stroke-opacity="0.5"/>
    <line x1="14.5" y1="42" x2="17.5" y2="42" stroke="#00ccff" stroke-width="0.6" stroke-opacity="0.5"/>
    <line x1="14.5" y1="48" x2="17.5" y2="51" stroke="#00ccff" stroke-width="0.6" stroke-opacity="0.5"/>
    <!-- Left ear dot indicator -->
    <circle cx="15.5" cy="44" r="1.8" fill="#00ffe7" opacity="0.8" filter="url(#jb-sglow)"/>

    <!-- Right ear panel -->
    <path d="M76,38 L72,28 L72,56 L76,52 Z"
          fill="url(#jb-panel)" stroke="#00ccff" stroke-width="0.8" stroke-opacity="0.6"/>
    <line x1="75.5" y1="36" x2="72.5" y2="32" stroke="#00ccff" stroke-width="0.6" stroke-opacity="0.5"/>
    <line x1="75.5" y1="42" x2="72.5" y2="42" stroke="#00ccff" stroke-width="0.6" stroke-opacity="0.5"/>
    <line x1="75.5" y1="48" x2="72.5" y2="51" stroke="#00ccff" stroke-width="0.6" stroke-opacity="0.5"/>
    <!-- Right ear dot indicator -->
    <circle cx="74.5" cy="44" r="1.8" fill="#00ffe7" opacity="0.8" filter="url(#jb-sglow)"/>

    <!-- ══ MAIN HEAD — Hexagonal porcelain ══ -->
    <polygon points="45,8 72,22 76,52 62,76 28,76 14,52 18,22"
             fill="url(#jb-porcelain)"
             stroke="#b8d0dc" stroke-width="1"/>

    <!-- Face bevel edges (subtle dark lines for hex facets) -->
    <!-- Top-left facet edge -->
    <line x1="45" y1="8" x2="18" y2="22" stroke="#c8dce8" stroke-width="0.8" opacity="0.7"/>
    <!-- Top-right facet edge -->
    <line x1="45" y1="8" x2="72" y2="22" stroke="#c8dce8" stroke-width="0.8" opacity="0.7"/>
    <!-- Top band divider -->
    <line x1="18" y1="22" x2="72" y2="22" stroke="#d0e2ec" stroke-width="0.6" opacity="0.6"/>
    <!-- Bottom divider -->
    <line x1="14" y1="52" x2="76" y2="52" stroke="#ccdce8" stroke-width="0.6" opacity="0.5"/>

    <!-- ══ SURFACE CRACKS (inner cyan glow through porcelain) ══ -->
    <!-- Fine cracks that glow cyan, like light inside the shell -->
    <path class="jb-crack" d="M30,20 L36,28 L32,34" fill="none"
          stroke="#00ffe7" stroke-width="0.7" stroke-linecap="round"/>
    <path class="jb-crack" d="M58,22 L54,30" fill="none"
          stroke="#00ffe7" stroke-width="0.6" stroke-linecap="round" style="animation-delay:1.2s"/>
    <path class="jb-crack" d="M22,48 L28,44 L26,38" fill="none"
          stroke="#00ffe7" stroke-width="0.6" stroke-linecap="round" style="animation-delay:0.6s"/>
    <path class="jb-crack" d="M62,46 L68,50" fill="none"
          stroke="#00ffe7" stroke-width="0.6" stroke-linecap="round" style="animation-delay:1.8s"/>
    <path class="jb-crack" d="M38,66 L44,72 L50,68" fill="none"
          stroke="#00ffe7" stroke-width="0.65" stroke-linecap="round" style="animation-delay:0.9s"/>

    <!-- ══ CIRCUIT LINES ══ -->
    <!-- Top-left cluster -->
    <g class="jb-circuit" stroke="#00ccff" stroke-width="0.7" fill="none" stroke-linecap="round">
      <path d="M20,24 L26,24 L26,30 L30,30"/>
      <circle cx="20" cy="24" r="1.2" fill="#00ccff"/>
      <circle cx="30" cy="30" r="1.2" fill="#00ccff"/>
    </g>
    <!-- Top-right cluster -->
    <g class="jb-circuit-b" stroke="#00ccff" stroke-width="0.7" fill="none" stroke-linecap="round">
      <path d="M70,24 L64,24 L64,30 L60,30"/>
      <circle cx="70" cy="24" r="1.2" fill="#00ccff"/>
      <circle cx="60" cy="30" r="1.2" fill="#00ccff"/>
    </g>
    <!-- Bottom-left cluster -->
    <g class="jb-circuit-c" stroke="#00ccff" stroke-width="0.7" fill="none" stroke-linecap="round">
      <path d="M18,56 L24,56 L24,62 L30,66"/>
      <circle cx="18" cy="56" r="1.2" fill="#00ccff"/>
    </g>
    <!-- Bottom-right cluster -->
    <g class="jb-circuit" stroke="#00ccff" stroke-width="0.7" fill="none" stroke-linecap="round"
       style="animation-delay:1.4s">
      <path d="M72,56 L66,56 L66,62 L60,66"/>
      <circle cx="72" cy="56" r="1.2" fill="#00ccff"/>
    </g>

    <!-- ══ VISOR ══ -->
    <!-- Visor shape — hexagonal inner window -->
    <path id="jb-visor-path"
          d="M22,36 L28,28 L62,28 L68,36 L68,54 L62,60 L28,60 L22,54 Z"
          fill="url(#jb-visor)"
          stroke="#00ccff" stroke-width="1.4" filter="url(#jb-glow)"/>

    <!-- Visor inner glow rim -->
    <path d="M23,37 L28.5,29.5 L61.5,29.5 L67,37 L67,53 L61.5,58.5 L28.5,58.5 L23,53 Z"
          fill="none" stroke="#00ffe7" stroke-width="0.5" stroke-opacity="0.4"/>

    <!-- Visor scanline (animated) -->
    <clipPath id="jb-vclip2">
      <path d="M22,36 L28,28 L62,28 L68,36 L68,54 L62,60 L28,60 L22,54 Z"/>
    </clipPath>
    <rect class="jb-scanline" x="22" y="28" width="46" height="2.5"
          fill="#00ffe7" opacity="0.55" rx="1" clip-path="url(#jb-vclip2)"/>

    <!-- Visor horizontal data lines -->
    <line x1="24" y1="38" x2="66" y2="38" stroke="#00ccff" stroke-width="0.4" stroke-opacity="0.3" clip-path="url(#jb-vclip2)"/>
    <line x1="23" y1="44" x2="67" y2="44" stroke="#00ccff" stroke-width="0.4" stroke-opacity="0.25" clip-path="url(#jb-vclip2)"/>
    <line x1="24" y1="50" x2="66" y2="50" stroke="#00ccff" stroke-width="0.4" stroke-opacity="0.2" clip-path="url(#jb-vclip2)"/>

    <!-- ══ EYES (inside visor) ══ -->
    <!-- Left eye -->
    <g id="jb-eye-l">
      <ellipse cx="34" cy="44" rx="7.5" ry="6.5"
               fill="#050f1a" stroke="#00ccff" stroke-width="0.8" stroke-opacity="0.7"/>
      <ellipse id="jb-pupil-l" cx="34" cy="44" rx="3.5" ry="3.5"
               fill="#00ffe7" filter="url(#jb-vglow)" opacity="0.95"/>
      <!-- Catchlight -->
      <ellipse cx="31.8" cy="42" rx="1.3" ry="1.1" fill="white" opacity="0.8"/>
    </g>
    <!-- Right eye -->
    <g id="jb-eye-r">
      <ellipse cx="56" cy="44" rx="7.5" ry="6.5"
               fill="#050f1a" stroke="#00ccff" stroke-width="0.8" stroke-opacity="0.7"/>
      <ellipse id="jb-pupil-r" cx="56" cy="44" rx="3.5" ry="3.5"
               fill="#00ffe7" filter="url(#jb-vglow)" opacity="0.95"/>
      <ellipse cx="53.8" cy="42" rx="1.3" ry="1.1" fill="white" opacity="0.8"/>
    </g>

    <!-- Visor top gloss reflection -->
    <path d="M30,30 Q45,27 62,30 L62,34 Q45,31 30,34 Z"
          fill="url(#jb-vrefl)" clip-path="url(#jb-vclip2)"/>

    <!-- ══ MOUTH STRIP (below visor) ══ -->
    <rect x="30" y="62" width="30" height="7" rx="3.5"
          fill="#d8eaf4" stroke="#00ccff" stroke-width="0.7" stroke-opacity="0.5"/>
    <!-- LED dots smile -->
    <g id="jb-mouth" filter="url(#jb-sglow)">
      <circle class="jb-led" cx="35" cy="65.5" r="1.4" fill="#00ffe7" opacity="0.5"/>
      <circle class="jb-led" cx="39" cy="65.5" r="1.4" fill="#00ffe7" opacity="0.7"/>
      <circle class="jb-led" cx="43" cy="65.5" r="1.4" fill="#00ffe7" opacity="0.9"/>
      <circle class="jb-led" cx="47" cy="65.5" r="1.4" fill="#00ffe7" opacity="0.9"/>
      <circle class="jb-led" cx="51" cy="65.5" r="1.4" fill="#00ffe7" opacity="0.7"/>
      <circle class="jb-led" cx="55" cy="65.5" r="1.4" fill="#00ffe7" opacity="0.5"/>
    </g>

    <!-- Outer hex border glow -->
    <polygon points="45,8 72,22 76,52 62,76 28,76 14,52 18,22"
             fill="none" stroke="#00ccff" stroke-width="1.2"
             stroke-opacity="0.6" filter="url(#jb-glow)"/>

    <!-- Top highlight sheen -->
    <path d="M32,10 Q45,6 58,10 L60,18 Q45,13 30,18 Z"
          fill="white" opacity="0.25"/>

    <!-- ══ ANTENNA ══ -->
    <line x1="45" y1="8" x2="45" y2="1"
          stroke="#00ccff" stroke-width="1.3" stroke-opacity="0.9"/>
    <circle id="jb-ant-dot" cx="45" cy="1" r="2.8"
            fill="#00ffe7" filter="url(#jb-vglow)" opacity="0.95"/>
  </svg>
  `;

  // ── MESSAGES ──
  const msgs = {
    intro: ['JANE.BOT ONLINE ⚡', 'HEY THERE! 👋', 'HELLO, HUMAN!'],
    hover: ['PSST... HI! 👀', 'NEED HELP? 🤔', 'CLICK ME!', 'JANE v6.0 🔒'],
    click: ['STAY OFFLINE 🔒', 'NO CLOUD. EVER.', 'PRIVACY = POWER ⚡', 'BEEP BOOP! 🤖', 'I AM JANE!', '100% LOCAL ✓'],
    idle:  ['SCANNING... 👀', 'ALL SYSTEMS GO ✓', 'STILL WATCHING!', 'BOT MODE: ON 🔵'],
  };
  function pick(t) { const a = msgs[t]; return a[Math.floor(Math.random() * a.length)]; }

  // ── BUBBLE ──
  let bubTO;
  function showBubble(text, dur = 2500) {
    clearTimeout(bubTO);
    bubbleEl.textContent = text;
    const bx = posX + SIZE / 2;
    const by = posY - 44;
    bubbleEl.style.left = Math.max(8, Math.min(window.innerWidth - 195, bx - 80)) + 'px';
    bubbleEl.style.top  = Math.max(8, by) + 'px';
    bubbleEl.classList.add('show');
    bubTO = setTimeout(() => bubbleEl.classList.remove('show'), dur);
  }

  // ── EYES ──
  const pupL = botEl.querySelector('#jb-pupil-l');
  const pupR = botEl.querySelector('#jb-pupil-r');
  const eyL  = botEl.querySelector('#jb-eye-l');
  const eyR  = botEl.querySelector('#jb-eye-r');
  const leds = botEl.querySelectorAll('.jb-led');

  function setEyes(dx, dy) {
    const mx = 2, my = 1.5;
    const x = Math.max(-1, Math.min(1, dx));
    const y = Math.max(-1, Math.min(1, dy));
    pupL.setAttribute('cx', 34 + x * mx);
    pupL.setAttribute('cy', 44 + y * my);
    pupR.setAttribute('cx', 56 + x * mx);
    pupR.setAttribute('cy', 44 + y * my);
  }

  document.addEventListener('mousemove', e => {
    const bx = posX + SIZE / 2;
    const by = posY + SIZE / 2;
    setEyes((e.clientX - bx) / 140, (e.clientY - by) / 140);
  });

  // ── BLINK ──
  function doBlink() {
    [eyL, eyR].forEach(g => {
      g.style.transform = 'scaleY(0.07)';
      g.style.transformOrigin = 'center 44px';
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
    }, 2500 + Math.random() * 2600);
  }
  scheduleBlink();

  // ── LED MOUTH ANIMATION ──
  let ledIdx = 0, ledDir = 1;
  setInterval(() => {
    leds.forEach((d, i) => {
      const dist = Math.abs(i - ledIdx);
      d.setAttribute('opacity', dist === 0 ? '1' : dist === 1 ? '0.55' : '0.2');
    });
    ledIdx += ledDir;
    if (ledIdx >= leds.length - 1 || ledIdx <= 0) ledDir *= -1;
  }, 160);

  // ── UFO MOVEMENT (margin-aware) ──
  function newDir() {
    const z = getZones();
    const zone = getZone();
    // Pick a random target within current margin zone
    const tx = zone === 'left'
      ? z.lx1 + Math.random() * Math.max(0, z.lx2 - z.lx1)
      : z.rx1 + Math.random() * Math.max(0, z.rx2 - z.rx1);
    const ty = z.vy1 + Math.random() * (z.vy2 - z.vy1);

    const dx = tx - posX, dy = ty - posY;
    const dist = Math.hypot(dx, dy) || 1;
    const spd = SPEED_BASE * (0.5 + Math.random() * 0.85);
    velX = (dx / dist) * spd;
    velY = (dy / dist) * spd;
  }

  function scheduleDir() {
    dirTimer = setTimeout(() => {
      // Occasionally switch to other margin zone (30% chance)
      if (Math.random() < 0.30) {
        const z = getZones();
        const zone = getZone();
        if (zone === 'left' && z.rx2 > z.rx1) {
          posX = z.rx1 + 5;
        } else if (z.lx2 > z.lx1) {
          posX = z.lx2 - 5;
        }
      }
      newDir();
      scheduleDir();
    }, DIR_CHANGE * (0.6 + Math.random() * 0.85));
  }

  // ── ANIMATION LOOP ──
  function loop() {
    if (!isHovered) {
      wobble += 0.036;
      posX += velX + Math.sin(wobble * 0.65) * 0.3;
      posY += velY + Math.cos(wobble) * 0.2;

      clampToZone();

      // If vel pushing into content, reverse X
      const z = getZones();
      const zone = getZone();
      if (zone === 'left'  && posX >= z.lx2) velX = -Math.abs(velX);
      if (zone === 'left'  && posX <= z.lx1) velX =  Math.abs(velX);
      if (zone === 'right' && posX <= z.rx1) velX =  Math.abs(velX);
      if (zone === 'right' && posX >= z.rx2) velX = -Math.abs(velX);
      if (posY <= z.vy1) velY =  Math.abs(velY);
      if (posY >= z.vy2) velY = -Math.abs(velY);

      botEl.style.left = posX + 'px';
      botEl.style.top  = posY + 'px';
    }
    requestAnimationFrame(loop);
  }

  // ── INTERACTIONS ──
  botEl.addEventListener('mouseenter', () => {
    isHovered = true;
    showBubble(pick('hover'), 2000);
  });
  botEl.addEventListener('mouseleave', () => {
    isHovered = false;
    setEyes(0, 0);
  });
  botEl.addEventListener('click', () => {
    botEl.classList.remove('wave', 'bounce');
    void botEl.offsetWidth;
    botEl.classList.add(Math.random() > 0.5 ? 'wave' : 'bounce');
    showBubble(pick('click'), 2200);
    doBlink(); setTimeout(doBlink, 210);
  });

  idleTimer = setInterval(() => {
    if (!isHovered && Math.random() > 0.5) showBubble(pick('idle'), 2000);
  }, 11000);

  // ── INTRO ──
  const z0 = getZones();
  posX = z0.lx1 + 10;
  posY = 200;
  botEl.style.left    = posX + 'px';
  botEl.style.top     = posY + 'px';
  botEl.style.opacity = '0';

  newDir();
  scheduleDir();

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

  loop();

})();
