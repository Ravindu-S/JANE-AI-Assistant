---
layout: null
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JANE 6.0 — Offline AI Assistant</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cyan: #00ffe7;
      --cyan2: #00b4d8;
      --magenta: #ff00aa;
      --yellow: #f5e642;
      --bg: #020c18;
      --bg2: #060f1e;
      --card: #071525;
      --border: rgba(0,255,231,0.18);
      --glow-c: 0 0 8px #00ffe7, 0 0 20px #00ffe7aa;
      --glow-m: 0 0 8px #ff00aa, 0 0 20px #ff00aa88;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: #c8dde8;
      font-family: 'Rajdhani', sans-serif;
      font-size: 1.05rem;
      line-height: 1.65;
      overflow-x: hidden;
      cursor: default;
    }

    /* ───────── SCANLINES OVERLAY ───────── */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0,0,0,0.07) 2px,
        rgba(0,0,0,0.07) 4px
      );
      pointer-events: none;
      z-index: 9999;
    }

    /* ───────── CANVAS MATRIX ───────── */
    #matrix-canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 0;
      pointer-events: none;
      opacity: 0.13;
    }

    /* ───────── NAV ───────── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.85rem 2.5rem;
      background: rgba(2,12,24,0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
    }

    .nav-logo {
      font-family: 'Orbitron', monospace;
      font-size: 1.3rem;
      font-weight: 900;
      color: var(--cyan);
      text-shadow: var(--glow-c);
      letter-spacing: 3px;
    }

    .nav-links { display: flex; gap: 2rem; list-style: none; }
    .nav-links a {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.85rem;
      color: #7fb8c8;
      text-decoration: none;
      letter-spacing: 2px;
      text-transform: uppercase;
      transition: color 0.2s, text-shadow 0.2s;
    }
    .nav-links a:hover { color: var(--cyan); text-shadow: var(--glow-c); }

    /* ───────── HERO ───────── */
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 6rem 2rem 4rem;
      z-index: 2;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,255,231,0.07) 0%, transparent 70%),
        radial-gradient(ellipse 40% 30% at 80% 70%, rgba(255,0,170,0.05) 0%, transparent 60%);
      pointer-events: none;
    }

    /* Grid lines */
    .hero::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(0,255,231,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,231,0.04) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
    }

    /* ── GLITCH TITLE ── */
    .glitch-wrap { position: relative; display: inline-block; }

    .hero-title {
      font-family: 'Orbitron', monospace;
      font-size: clamp(3.5rem, 10vw, 8rem);
      font-weight: 900;
      color: #fff;
      letter-spacing: 0.12em;
      line-height: 1;
      text-shadow: var(--glow-c);
      position: relative;
      animation: flicker 6s infinite;
    }

    .hero-title::before,
    .hero-title::after {
      content: attr(data-text);
      position: absolute;
      top: 0; left: 0;
      width: 100%;
    }
    .hero-title::before {
      color: var(--magenta);
      animation: glitch-1 3s infinite;
      clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
    }
    .hero-title::after {
      color: var(--cyan);
      animation: glitch-2 3.5s infinite;
      clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
    }

    @keyframes glitch-1 {
      0%, 90%, 100% { transform: translateX(0); opacity: 0; }
      91% { transform: translateX(-4px); opacity: 0.9; }
      93% { transform: translateX(4px); opacity: 0.6; }
      95% { transform: translateX(-2px); opacity: 0.8; }
      97% { transform: translateX(0); opacity: 0; }
    }
    @keyframes glitch-2 {
      0%, 85%, 100% { transform: translateX(0); opacity: 0; }
      86% { transform: translateX(3px); opacity: 0.7; }
      88% { transform: translateX(-3px); opacity: 0.5; }
      90% { transform: translateX(1px); opacity: 0; }
    }
    @keyframes flicker {
      0%, 95%, 100% { opacity: 1; }
      96% { opacity: 0.85; }
      97% { opacity: 1; }
      98% { opacity: 0.9; }
    }

    .hero-version {
      font-family: 'Share Tech Mono', monospace;
      font-size: 1rem;
      color: var(--magenta);
      letter-spacing: 6px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      text-shadow: var(--glow-m);
    }

    .hero-subtitle {
      font-size: clamp(1rem, 2.5vw, 1.35rem);
      color: #7fb8c8;
      max-width: 600px;
      margin: 1.5rem auto 2rem;
      font-weight: 300;
      letter-spacing: 0.5px;
    }

    /* ── BADGES ── */
    .badges {
      display: flex;
      gap: 0.85rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 2.5rem;
    }
    .badge {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.75rem;
      padding: 6px 14px;
      border: 1px solid var(--border);
      border-radius: 2px;
      color: var(--cyan);
      letter-spacing: 1.5px;
      text-transform: uppercase;
      background: rgba(0,255,231,0.04);
      transition: all 0.25s;
    }
    .badge:hover {
      background: rgba(0,255,231,0.1);
      border-color: var(--cyan);
      box-shadow: var(--glow-c);
    }

    /* ── BUTTONS ── */
    .btn-row { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

    .btn {
      font-family: 'Orbitron', monospace;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      padding: 14px 32px;
      border: none;
      border-radius: 2px;
      text-decoration: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-primary {
      background: linear-gradient(135deg, #008b75, var(--cyan));
      color: #000;
      clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 30px rgba(0,255,231,0.4);
    }

    .btn-outline {
      background: transparent;
      color: var(--cyan);
      border: 1px solid var(--cyan);
      clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
    }
    .btn-outline:hover {
      background: rgba(0,255,231,0.08);
      transform: translateY(-2px);
      box-shadow: var(--glow-c);
    }

    /* Shimmer on hover */
    .btn::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -100%;
      width: 60%;
      height: 200%;
      background: rgba(255,255,255,0.15);
      transform: skewX(-20deg);
      transition: left 0.5s;
    }
    .btn:hover::after { left: 150%; }

    /* ───────── SECTION LAYOUT ───────── */
    section { position: relative; z-index: 2; padding: 6rem 2rem; }
    .container { max-width: 1100px; margin: 0 auto; }

    .section-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }
    .section-eyebrow {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.75rem;
      color: var(--magenta);
      letter-spacing: 5px;
      text-transform: uppercase;
      margin-bottom: 0.75rem;
      text-shadow: var(--glow-m);
    }
    .section-title {
      font-family: 'Orbitron', monospace;
      font-size: clamp(1.6rem, 4vw, 2.4rem);
      font-weight: 700;
      color: #fff;
      letter-spacing: 2px;
    }
    .section-title span { color: var(--cyan); }

    /* ───────── FEATURE CARDS ───────── */
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 2rem;
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s, transform 0.3s;
    }
    .card:hover {
      border-color: var(--cyan);
      transform: translateY(-6px);
      box-shadow: 0 0 30px rgba(0,255,231,0.1), inset 0 0 30px rgba(0,255,231,0.02);
    }

    /* Corner accent */
    .card::before {
      content: '';
      position: absolute;
      top: 0; right: 0;
      width: 40px; height: 40px;
      border-top: 2px solid var(--cyan);
      border-right: 2px solid var(--cyan);
      transition: width 0.3s, height 0.3s;
    }
    .card:hover::before { width: 60px; height: 60px; }

    .card::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 40px; height: 40px;
      border-bottom: 2px solid var(--magenta);
      border-left: 2px solid var(--magenta);
      transition: width 0.3s, height 0.3s;
    }
    .card:hover::after { width: 60px; height: 60px; }

    .card-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
      display: block;
    }

    .card h3 {
      font-family: 'Orbitron', monospace;
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--cyan);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 0.75rem;
    }

    .card p { color: #7fb8c8; font-size: 0.95rem; margin-bottom: 1rem; }

    .card ul {
      list-style: none;
      padding: 0;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.8rem;
      color: #5a8a9a;
    }
    .card ul li { padding: 4px 0; }
    .card ul li::before { content: '> '; color: var(--cyan); }

    /* ───────── STEPS ───────── */
    .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; }

    .step {
      text-align: center;
      padding: 2.5rem 1.5rem;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px;
      transition: all 0.3s;
      position: relative;
    }
    .step:hover {
      border-color: var(--cyan);
      box-shadow: 0 0 30px rgba(0,255,231,0.12);
      transform: translateY(-5px);
    }

    .step-num {
      font-family: 'Orbitron', monospace;
      font-size: 3rem;
      font-weight: 900;
      color: transparent;
      -webkit-text-stroke: 1px var(--cyan);
      line-height: 1;
      margin-bottom: 1rem;
      text-shadow: none;
      filter: drop-shadow(0 0 8px var(--cyan));
    }

    .step h3 {
      font-family: 'Orbitron', monospace;
      font-size: 0.9rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #fff;
      margin-bottom: 0.5rem;
    }
    .step p { color: #7fb8c8; font-size: 0.9rem; }

    /* Connector line between steps */
    .step::after {
      content: '//';
      position: absolute;
      right: -1.25rem;
      top: 50%;
      transform: translateY(-50%);
      font-family: 'Share Tech Mono', monospace;
      color: var(--border);
      font-size: 1.2rem;
      pointer-events: none;
    }
    .step:last-child::after { display: none; }

    /* ───────── SPECS / INFO BOX ───────── */
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    @media (max-width: 640px) { .info-grid { grid-template-columns: 1fr; } }

    .spec-block {
      background: var(--card);
      border: 1px solid var(--border);
      border-left: 3px solid var(--cyan);
      padding: 1.5rem;
      border-radius: 0 4px 4px 0;
    }
    .spec-block h4 {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.75rem;
      color: var(--magenta);
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .spec-block p {
      font-size: 0.95rem;
      color: #7fb8c8;
    }

    /* ───────── TERMINAL ───────── */
    .terminal {
      background: #000d1a;
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 1.5rem 2rem;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.88rem;
      color: var(--cyan);
      position: relative;
      overflow: hidden;
    }
    .terminal::before {
      content: '● ● ●';
      position: absolute;
      top: 0.6rem;
      left: 1rem;
      font-size: 0.6rem;
      color: #444;
      letter-spacing: 4px;
    }
    .terminal .line { padding: 2px 0; }
    .terminal .prompt { color: var(--magenta); }
    .terminal .comment { color: #3a6070; }
    .terminal .output { color: #7fb8c8; }
    .terminal .success { color: #00ff88; }

    /* Blinking cursor */
    .cursor {
      display: inline-block;
      width: 8px;
      height: 1em;
      background: var(--cyan);
      vertical-align: text-bottom;
      animation: blink 1s infinite;
    }
    @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

    /* ───────── CTA SECTION ───────── */
    .cta-section {
      text-align: center;
      padding: 6rem 2rem;
      position: relative;
      z-index: 2;
      background: linear-gradient(180deg, transparent, rgba(0,255,231,0.025) 50%, transparent);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }

    .cta-section h2 {
      font-family: 'Orbitron', monospace;
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      color: #fff;
      letter-spacing: 3px;
      margin-bottom: 1rem;
    }
    .cta-section p {
      color: #7fb8c8;
      max-width: 550px;
      margin: 0 auto 2rem;
    }

    /* ───────── FOOTER ───────── */
    footer {
      position: relative;
      z-index: 2;
      text-align: center;
      padding: 2.5rem 2rem;
      border-top: 1px solid var(--border);
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.78rem;
      color: #2a5060;
      letter-spacing: 1px;
    }
    footer a { color: var(--cyan); text-decoration: none; }
    footer a:hover { text-shadow: var(--glow-c); }

    /* ───────── DIVIDER ───────── */
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--cyan), var(--magenta), var(--cyan), transparent);
      margin: 0 auto;
      max-width: 600px;
      opacity: 0.4;
    }

    /* ───────── ANIMATED STAT NUMBERS ───────── */
    .stats-row {
      display: flex;
      justify-content: center;
      gap: 3rem;
      flex-wrap: wrap;
      margin: 3rem 0;
    }
    .stat {
      text-align: center;
    }
    .stat-num {
      font-family: 'Orbitron', monospace;
      font-size: 2.5rem;
      font-weight: 900;
      color: var(--cyan);
      text-shadow: 0 0 6px rgba(0,255,231,0.35);
      display: block;
    }
    .stat-label {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.72rem;
      color: #3a7080;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    /* ───────── SCROLL REVEAL ───────── */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ───────── RESPONSIVE ───────── */
    @media (max-width: 768px) {
      nav { padding: 0.75rem 1.25rem; }
      .nav-links { gap: 1rem; }
      .card-grid { grid-template-columns: 1fr; }
      .step::after { display: none; }
    }
  </style>
</head>
<body>

<!-- Matrix canvas -->
<canvas id="matrix-canvas"></canvas>

<!-- NAV -->
<nav>
  <span class="nav-logo">JANE</span>
  <ul class="nav-links">
    <li><a href="#features">Features</a></li>
    <li><a href="#install">Install</a></li>
    <li><a href="#specs">Specs</a></li>
    <li><a href="https://github.com/Ravindu-S/JANE-AI-Assistant" target="_blank">GitHub</a></li>
  </ul>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-version">VERSION 6.0 — STABLE RELEASE</div>
  <div class="glitch-wrap">
    <h1 class="hero-title" data-text="JANE">JANE</h1>
  </div>
  <p class="hero-subtitle">The fully offline AI virtual assistant for Windows. No cloud. No surveillance. No compromise.</p>

  <div class="badges">
    <span class="badge"> 100% Offline</span>
    <span class="badge"> Llama 3 8B</span>
    <span class="badge"> Windows 10/11</span>
    <span class="badge"> Zero Data Collection</span>
    <span class="badge"> Voice-First</span>
  </div>

  <div class="btn-row">
    <a href="#install" class="btn btn-primary">Get Started</a>
    <a href="https://github.com/Ravindu-S/JANE-AI-Assistant/releases" target="_blank" class="btn btn-outline">Download</a>
  </div>

  <div class="stats-row" style="margin-top:4rem;">
    <div class="stat">
      <span class="stat-num" data-target="100">0</span>
      <span class="stat-label">% Local Processing</span>
    </div>
    <div class="stat">
      <span class="stat-num" data-target="0">1</span>
      <span class="stat-label">KB Data Sent</span>
    </div>
    <div class="stat">
      <span class="stat-num" data-target="6">0</span>
      <span class="stat-label">Major Version</span>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- FEATURES -->
<section id="features">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-eyebrow">// Capabilities</p>
      <h2 class="section-title">Built for <span>Power Users</span></h2>
    </div>
    <div class="card-grid">
      <div class="card reveal">
        <span class="card-icon">🧠</span>
        <h3>Offline AI Engine</h3>
        <p>Powered by Ollama + Llama 3 8B running entirely on your hardware. No internet dependency for core AI features.</p>
        <ul>
          <li>Local model inference</li>
          <li>Context-aware conversations</li>
          <li>Advanced NLU</li>
          <li>Privacy-first architecture</li>
        </ul>
      </div>
      <div class="card reveal">
        <span class="card-icon">🎙</span>
        <h3>Voice-First Interface</h3>
        <p>Activate with "Hey Jarvis" or Ctrl+Shift+J. Jane understands natural language — no rigid commands.</p>
        <ul>
          <li>Wake word detection</li>
          <li>Emotional intelligence</li>
          <li>Correction & feedback system</li>
          <li>Hotkey activation</li>
        </ul>
      </div>
      <div class="card reveal">
        <span class="card-icon">🖥</span>
        <h3>System Control</h3>
        <p>Full control over your Windows environment using only your voice.</p>
        <ul>
          <li>Volume & brightness control</li>
          <li>App management (open/close/switch)</li>
          <li>Media playback control</li>
          <li>Reminders & alarms</li>
        </ul>
      </div>
      <div class="card reveal">
        <span class="card-icon">🔍</span>
        <h3>Web & Screen Analysis</h3>
        <p>Interact with your screen intelligently. Jane reads and explains what's on display.</p>
        <ul>
          <li>OCR screen reading</li>
          <li>AI-powered screen explanation</li>
          <li>Google search & YouTube</li>
          <li>Ad skipping (YouTube)</li>
        </ul>
      </div>
      <div class="card reveal">
        <span class="card-icon">🔐</span>
        <h3>Privacy & Security</h3>
        <p>Cryptographic identity verification, file integrity checking, and zero data transmission.</p>
        <ul>
          <li>Cryptographic identity verification</li>
          <li>File integrity checking</li>
          <li>Anti-tampering protection</li>
          <li>No telemetry, ever</li>
        </ul>
      </div>
      <div class="card reveal">
        <span class="card-icon">⚙</span>
        <h3>Deep Integration</h3>
        <p>Seamlessly embedded in your Windows workflow. Lightweight, fast, always ready.</p>
        <ul>
          <li>System tray integration</li>
          <li>Instant hotkey response</li>
          <li>Always-ready background service</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- INSTALL STEPS -->
<section id="install">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-eyebrow">// Quick Start</p>
      <h2 class="section-title">Up in <span>3 Steps</span></h2>
    </div>
    <div class="steps">
      <div class="step reveal">
        <div class="step-num">01</div>
        <h3>Download</h3>
        <p>Grab the latest installer from the GitHub releases page.</p>
      </div>
      <div class="step reveal">
        <div class="step-num">02</div>
        <h3>Install</h3>
        <p>Run the setup wizard and follow on-screen instructions.</p>
      </div>
      <div class="step reveal">
        <div class="step-num">03</div>
        <h3>Activate</h3>
        <p>Press Ctrl+Shift+J or say "Hey Jarvis" to launch Jane.</p>
      </div>
    </div>

    <!-- Terminal -->
    <div class="terminal reveal" style="margin-top:3rem;">
      <div class="line" style="margin-top:1rem;"><span class="prompt">jane@local:~$</span> <span>jane --version</span></div>
      <div class="line output">JANE AI Assistant v6.0.0 (stable)</div>
      <div class="line comment"># Built with Ollama + Llama 3 8B</div>
      <div class="line" style="margin-top:0.5rem;"><span class="prompt">jane@local:~$</span> <span>jane --status</span></div>
      <div class="line success">✔ AI Engine: Online (local)</div>
      <div class="line success">✔ Voice Recognition: Ready</div>
      <div class="line success">✔ Privacy Mode: Active</div>
      <div class="line success">✔ Data Transmitted: 0 bytes</div>
      <div class="line" style="margin-top:0.5rem;"><span class="prompt">jane@local:~$</span> <span class="cursor"></span></div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- SPECS -->
<section id="specs">
  <div class="container">
    <div class="section-header reveal">
      <p class="section-eyebrow">// System Requirements</p>
      <h2 class="section-title">Technical <span>Specifications</span></h2>
    </div>
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem;" class="reveal">

      <!-- Minimum -->
      <div style="background:var(--card); border:1px solid rgba(0,255,100,0.2); border-top: 3px solid #00ff88; border-radius:4px; padding:1.75rem;">
        <div style="font-family:'Share Tech Mono',monospace; font-size:0.7rem; letter-spacing:3px; color:#00ff88; margin-bottom:1rem;">🟢 // MINIMUM — CPU-ONLY</div>
        <table style="width:100%; border-collapse:collapse; font-size:0.88rem;">
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem; width:40%;">OS</td><td style="color:#c8dde8;">Windows 10 v1809+ (64-bit)</td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">CPU</td><td style="color:#c8dde8;">6-core 3.0 GHz+<br><span style="font-size:0.78rem;color:#3a7080;">i5 10th gen+ / Ryzen 5 5000+</span></td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">RAM</td><td style="color:#c8dde8;">16 GB</td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">GPU</td><td style="color:#c8dde8;">Not required (CPU-only mode)</td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">Storage</td><td style="color:#c8dde8;">12 GB free (SSD recommended)</td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">Audio</td><td style="color:#c8dde8;">Microphone required</td></tr>
        </table>
        <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid rgba(0,255,100,0.12); font-family:'Share Tech Mono',monospace; font-size:0.75rem; color:#3a7080;">
          Chat: 8–10s &nbsp;|&nbsp; OCR: 15–20s
        </div>
      </div>

      <!-- Recommended -->
      <div style="background:var(--card); border:1px solid rgba(245,230,66,0.2); border-top: 3px solid #f5e642; border-radius:4px; padding:1.75rem;">
        <div style="font-family:'Share Tech Mono',monospace; font-size:0.7rem; letter-spacing:3px; color:#f5e642; margin-bottom:1rem;">🟡 // RECOMMENDED — WITH GPU</div>
        <table style="width:100%; border-collapse:collapse; font-size:0.88rem;">
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem; width:40%;">OS</td><td style="color:#c8dde8;">Windows 10 v1809+ (64-bit)</td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">CPU</td><td style="color:#c8dde8;">8-core 3.5 GHz+<br><span style="font-size:0.78rem;color:#3a7080;">i7 10th gen+ / Ryzen 7 5000+</span></td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">RAM</td><td style="color:#c8dde8;">32 GB</td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">GPU</td><td style="color:#c8dde8;">NVIDIA GTX 1660 / RTX 2060+<br><span style="font-size:0.78rem;color:#3a7080;">6 GB VRAM</span></td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">Storage</td><td style="color:#c8dde8;">12 GB free SSD</td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">Audio</td><td style="color:#c8dde8;">Microphone required</td></tr>
        </table>
        <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid rgba(245,230,66,0.12); font-family:'Share Tech Mono',monospace; font-size:0.75rem; color:#3a7080;">
          Chat: 3–8s &nbsp;|&nbsp; OCR: 8–15s
        </div>
      </div>

      <!-- Best -->
      <div style="background:var(--card); border:1px solid rgba(255,140,0,0.2); border-top: 3px solid #ff8c00; border-radius:4px; padding:1.75rem;">
        <div style="font-family:'Share Tech Mono',monospace; font-size:0.7rem; letter-spacing:3px; color:#ff8c00; margin-bottom:1rem;">🟠 // BEST EXPERIENCE — HIGH-END GPU</div>
        <table style="width:100%; border-collapse:collapse; font-size:0.88rem;">
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem; width:40%;">OS</td><td style="color:#c8dde8;">Windows 11 (64-bit)</td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">CPU</td><td style="color:#c8dde8;">8-core 4.0 GHz+<br><span style="font-size:0.78rem;color:#3a7080;">i7/i9 12th gen+ / Ryzen 7/9 5000+</span></td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">RAM</td><td style="color:#c8dde8;">32 GB</td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">GPU</td><td style="color:#c8dde8;">NVIDIA RTX 3070+<br><span style="font-size:0.78rem;color:#3a7080;">8 GB VRAM or more</span></td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">Storage</td><td style="color:#c8dde8;">20 GB free NVMe SSD</td></tr>
          <tr><td style="color:#3a7080; padding:4px 0; font-family:'Share Tech Mono',monospace; font-size:0.75rem;">Audio</td><td style="color:#c8dde8;">Quality microphone</td></tr>
        </table>
        <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid rgba(255,140,0,0.12); font-family:'Share Tech Mono',monospace; font-size:0.75rem; color:#3a7080;">
          Chat: 1–3s &nbsp;|&nbsp; OCR: 3–8s
        </div>
      </div>

    </div>
  </div>
</section>

<!-- CTA -->
<div class="cta-section">
  <h2 class="reveal">Your AI. Your Machine. Your Rules.</h2>
  <p class="reveal">Jane 6.0 puts the power of AI in your hands — without sending a single byte to the cloud.</p>
  <div class="btn-row reveal">
    <a href="https://github.com/Ravindu-S/JANE-AI-Assistant/releases" target="_blank" class="btn btn-primary">Download Now</a>
    <a href="https://github.com/Ravindu-S/JANE-AI-Assistant" target="_blank" class="btn btn-outline">View on GitHub</a>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <p>JANE 6.0 — Fully Offline AI for Windows</p>
  <p style="margin-top:0.5rem;">Copyright &copy; 2021–present <a href="https://github.com/Ravindu-S" target="_blank">Ravindu Senanayake</a>. All Rights Reserved.</p>
  <p style="margin-top:0.5rem;">Proprietary software. See <a href="LICENSE">LICENSE</a> for full terms.</p>
</footer>

<script>
  /* ── MATRIX RAIN ── */
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let cols, drops;

  function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fontSize = 13;
    cols = Math.floor(canvas.width / fontSize);
    drops = Array(cols).fill(1);
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(2,12,24,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ffe7';
    ctx.font = '13px Share Tech Mono, monospace';
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.95 ? '#fff' : `rgba(0,255,231,${Math.random() * 0.6 + 0.2})`;
      ctx.fillText(ch, i * 13, y * 13);
      if (y * 13 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  initMatrix();
  window.addEventListener('resize', initMatrix);
  setInterval(drawMatrix, 45);

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  /* ── STAT COUNTER ANIMATION ── */
  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.target);
      const start = parseInt(el.textContent);
      const duration = 1500;
      const step = (target - start) / (duration / 16);
      let current = start;
      const timer = setInterval(() => {
        current += step;
        if ((step > 0 && current >= target) || (step < 0 && current <= target)) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  const heroObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); heroObserver.disconnect(); }
  }, { threshold: 0.5 });
  heroObserver.observe(document.querySelector('.stats-row'));

  /* ── GLITCH TITLE - RANDOM SKEW ── */
  const title = document.querySelector('.hero-title');
  setInterval(() => {
    if (Math.random() > 0.92) {
      title.style.transform = `skewX(${(Math.random()-0.5)*4}deg)`;
      setTimeout(() => title.style.transform = '', 80 + Math.random()*100);
    }
  }, 500);

  /* ── CUSTOM CURSOR GLOW ── */
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; width:16px; height:16px; border-radius:50%;
    background:rgba(0,255,231,0.5); pointer-events:none; z-index:10000;
    transform:translate(-50%,-50%); transition:transform 0.1s;
    box-shadow:0 0 12px #00ffe7, 0 0 24px #00ffe788;
    mix-blend-mode:screen;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
</script>
</body>
</html>
