---
title: Jane 6.0 Documentation
---

<style>
  :root {
    --cyan: #00e5ff;
    --cyan-dark: #0097a7;
    --bg-dark: #0a1628;
    --card-bg: #0f1a30;
    --text-primary: #e0e0e0;
    --glow: 0 0 10px #00e5ff, 0 0 20px #00e5ff, 0 0 30px #00e5ff;
  }

  body {
    background: linear-gradient(135deg, var(--bg-dark) 0%, #0a0f20 100%);
    color: var(--text-primary);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(0, 229, 255, 0.05) 0%, transparent 100%),
      radial-gradient(circle at 90% 80%, rgba(0, 229, 255, 0.03) 0%, transparent 100%);
    background-attachment: fixed;
    margin: 0;
    padding: 0;
  }

  .hero-section {
    position: relative;
    min-height: 70vh;
    background: radial-gradient(circle at center, var(--bg-dark) 0%, #000c1a 100%);
    overflow: hidden;
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: 
      linear-gradient(120deg, rgba(10, 22, 40, 0.95) 0%, #0a1025 100%),
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="none" width="100" height="100"/><path d="M0 100 L100 0 M90 100 L100 90 M20 100 L100 20 M30 100 L100 30 M40 100 L100 40 M50 100 L100 50 M60 100 L100 60 M70 100 L100 70 M80 100 L100 80 M90 100 L100 90" fill="none" stroke="rgba(0, 229, 255, 0.05)" stroke-width="0.5"/></svg>');
    background-size: 100% 100%;
  }

  .grid-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(10, 22, 40, 0.9) 1px, transparent 1px),
      linear-gradient(90deg, rgba(10, 22, 40, 0.9) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: -1;
    opacity: 0.3;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
  }

  .hero-glow {
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .hero-title {
    font-size: 4.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    animation: title-glow 4s infinite alternate;
  }

  @keyframes title-glow {
    0% { text-shadow: 0 0 10px #00e5ff, 0 0 20px #00e5ff, 0 0 30px #00e5ff; }
    50% { text-shadow: 0 0 15px #00e5ff, 0 0 30px #00e5ff, 0 0 45px #00e5ff; }
    100% { text-shadow: 0 0 10px #00e5ff, 0 0 20px #00e5ff, 0 0 30px #00e5ff; }
  }

  .hero-subtitle {
    font-size: 1.8rem;
    max-width: 800px;
    margin: 0 auto 2rem;
    color: #e0e0e0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  }

  .hero-cta {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 14px 36px;
    border-radius: 8px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--cyan);
    background: transparent;
    color: var(--cyan);
    z-index: 1;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--cyan-dark) 0%, var(--cyan) 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 151, 167, 0.4);
  }

  .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 151, 167, 0.5);
  }

  .btn::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    transform: rotate(30deg);
    z-index: -1;
  }

  .btn-primary::before {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, var(--cyan) 0%, #00c7e0 100%);
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
  }

  .feature-card {
    background: var(--card-bg);
    border: 1px solid rgba(0, 229, 255, 0.15);
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .feature-card:hover {
    transform: translateY(-10px);
    border-color: var(--cyan);
    box-shadow: 0 15px 40px rgba(0, 151, 167, 0.3);
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 229, 255, 0.03) 0%, transparent 100%);
    z-index: -1;
  }

  .feature-card:hover::before {
    background: linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, transparent 100%);
  }

  .feature-icon {
    width: 80px;
    height: 80px;
    background: rgba(0, 229, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    position: relative;
  }

  .feature-icon::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid var(--cyan);
    animation: pulse 3s infinite;
  }

  .feature-icon::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 60%;
    background: var(--card-bg);
    border-radius: 50%;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.5); }
    70% { box-shadow: 0 0 0 15px rgba(0, 229, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 229, 255, 0); }
  }

  .feature-title {
    color: var(--cyan);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .feature-content p {
    color: #c0c0c0;
    margin-bottom: 1.25rem;
  }

  .highlight-box {
    background: rgba(0, 229, 255, 0.05);
    border-left: 3px solid var(--cyan);
    padding: 1.5rem;
    border-radius: 0 4px 4px 0;
    margin: 2rem 0;
  }

  .highlight-box h3 {
    color: var(--cyan);
    margin-top: 0;
  }

  .feature-list {
    padding-left: 1.25rem;
    margin-top: 1rem;
  }

  .feature-list li {
    margin-bottom: 0.75rem;
    position: relative;
  }

  .feature-list li::before {
    content: '•';
    color: var(--cyan);
    font-size: 2rem;
    position: absolute;
    left: -1.25rem;
    top: -0.25rem;
  }

  .card-glow {
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: all 0.5s ease;
  }

  .feature-card:hover .card-glow {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }

  .glow-effect {
    box-shadow: var(--glow);
  }

  .pulse-effect {
    animation: pulse-glow 2s infinite;
  }

  @keyframes pulse-glow {
    0% { box-shadow: 0 0 15px rgba(0, 229, 255, 0.5); }
    50% { box-shadow: 0 0 25px rgba(0, 229, 255, 0.8); }
    100% { box-shadow: 0 0 15px rgba(0, 229, 255, 0.5); }
  }

  .section-title {
    text-align: center;
    font-size: 2.5rem;
    color: var(--cyan);
    margin: 3rem 0 2rem;
    position: relative;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: var(--cyan);
    border-radius: 3px;
  }

  .getting-started {
    background: var(--card-bg);
    border-radius: 15px;
    padding: 3rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    margin: 4rem 0;
    position: relative;
    overflow: hidden;
  }

  .getting-started::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 229, 255, 0.05) 0%, transparent 100%);
    z-index: -1;
  }

  .step-card {
    background: rgba(15, 26, 48, 0.7);
    border: 1px solid rgba(0, 229, 255, 0.15);
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    height: 100%;
    position: relative;
  }

  .step-number {
    display: inline-block;
    width: 60px;
    height: 60px;
    background: var(--cyan-dark);
    color: white;
    border-radius: 50%;
    line-height: 60px;
    font-weight: bold;
    margin-bottom: 1.5rem;
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.4);
  }

  .step-card:hover {
    transform: translateY(-10px);
    border-color: var(--cyan);
  }

  .step-card:hover .step-number {
    background: var(--cyan);
    box-shadow: 0 0 25px rgba(0, 229, 255, 0.6);
  }

  .cta-section {
    background: linear-gradient(135deg, var(--cyan-dark) 0%, var(--cyan) 100%);
    color: white;
    padding: 3.5rem 2rem;
    border-radius: 15px;
    margin: 3rem 0;
    position: relative;
    overflow: hidden;
  }

  .cta-section::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }

  .cta-section::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
    border-radius: 50%;
  }

  .cta-title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 2;
  }

  .cta-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 2;
  }

  .cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .btn-cta {
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: white;
    padding: 12px 32px;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .btn-cta:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  .btn-cta-primary {
    background: white;
    color: var(--cyan);
  }

  .btn-cta-primary:hover {
    background: #f0f0f0;
  }

  .footer {
    text-align: center;
    padding: 3rem 2rem;
    color: #a0a0a0;
    border-top: 1px solid rgba(0, 229, 255, 0.1);
    margin-top: 2rem;
  }

  .footer a {
    color: var(--cyan);
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .footer a:hover {
    color: #00c7e0;
  }

  .footer-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .footer-copyright {
    margin-top: 1.5rem;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
    }
    
    .hero-cta {
      flex-direction: column;
      align-items: center;
    }
  }

  /* Animated binary background */
  .binary-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    pointer-events: none;
    opacity: 0.15;
    font-family: monospace;
    font-size: 1.2rem;
    color: var(--cyan);
    overflow: hidden;
    animation: binary-scroll 30s linear infinite;
  }

  @keyframes binary-scroll {
    0% { transform: translateY(0); }
    100% { transform: translateY(-100%); }
  }

  .binary-column {
    position: absolute;
    top: 0;
    width: 1rem;
    height: 100%;
    animation: binary-flow 15s linear infinite;
    white-space: pre;
    line-height: 1.5rem;
  }

  @keyframes binary-flow {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }

  /* Add these to your existing index.md file */
  .hero-features {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin: 2rem 0;
    flex-wrap: wrap;
  }

  .hero-feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(0, 229, 255, 0.05);
    border-radius: 8px;
    padding: 8px 15px;
    font-size: 0.9rem;
    animation: feature-glow 4s infinite alternate;
  }

  @keyframes feature-glow {
    0% { background: rgba(0, 229, 255, 0.05); }
    50% { background: rgba(0, 229, 255, 0.1); }
    100% { background: rgba(0, 229, 255, 0.05); }
  }
</style>

<div class="binary-background">
  <div class="binary-column" style="left: 0%;">01010111 10101111 00001011 11001010</div>
  <div class="binary-column" style="left: 10%;">10100011 01010001 11111000 00010101</div>
  <div class="binary-column" style="left: 20%;">11011100 00110101 01011100 11001001</div>
  <div class="binary-column" style="left: 30%;">00011011 10100100 00011001 11100111</div>
  <div class="binary-column" style="left: 40%;">11110011 01001010 10001111 01100101</div>
  <div class="binary-column" style="left: 50%;">10100011 01010001 11111000 00010101</div>
  <div class="binary-column" style="left: 60%;">01011110 11001010 00001111 10001101</div>
  <div class="binary-column" style="left: 70%;">10100111 01001001 11001000 00101001</div>
  <div class="binary-column" style="left: 80%;">00011011 10100100 00011001 11100111</div>
  <div class="binary-column" style="left: 90%;">10010101 00100111 11001010 00010101</div>
</div>

<div class="hero-section">
  <div class="hero-background"></div>
  <div class="grid-pattern"></div>
  <div class="hero-content">
    <div class="hero-glow"></div>
    <h1 class="hero-title glow-effect pulse-effect">JANE 6.0</h1>
    <p class="hero-subtitle">The only fully offline AI virtual assistant that works on Windows without internet</p>
    
    <div class="hero-features">
      <div class="hero-feature">
        <span>🔒 100% Privacy</span>
      </div>
      <div class="hero-feature">
        <span>🧠 Fully Offline</span>
      </div>
      <div class="hero-feature">
        <span>💻 Windows 10/11</span>
      </div>
      <div class="hero-feature">
        <span>⚡ No Data Collection</span>
      </div>
    </div>
    
    <div class="hero-cta">
      <a href="/installation" class="btn btn-primary pulse-effect">Get Started</a>
      <a href="https://github.com/Ravindu-S/JANE-AI-Assistant/releases" class="btn">Download Now</a>
    </div>
  </div>
</div>

<div class="content-section" style="max-width: 1200px; margin: 0 auto; padding: 2rem 1rem;">

  <div class="feature-grid">
    <div class="feature-card">
      <div class="card-glow"></div>
      <div class="feature-icon">
        <img src="assets/logos/ai.png" alt="AI" style="width: 45px; height: 45px;">
      </div>
      <h3 class="feature-title">Offline AI Power</h3>
      <div class="feature-content">
        <p>No internet required for core features. All AI processing happens locally on your device with Ollama + Llama 3.</p>
        <ul class="feature-list">
          <li>100% local processing</li>
          <li>Works without internet</li>
          <li>Privacy-first design</li>
          <li>Llama 3 8B model</li>
        </ul>
      </div>
    </div>
    
    <div class="feature-card">
      <div class="card-glow"></div>
      <div class="feature-icon">
        <img src="assets/logos/security.png" alt="Security" style="width: 45px; height: 45px;">
      </div>
      <h3 class="feature-title">Privacy First</h3>
      <div class="feature-content">
        <p>Your conversations, voice recordings, and data never leave your device. No cloud, no data collection.</p>
        <ul class="feature-list">
          <li>End-to-end local processing</li>
          <li>Zero data transmission</li>
          <li>Cryptographic identity verification</li>
          <li>File integrity checking</li>
        </ul>
      </div>
    </div>
    
    <div class="feature-card">
      <div class="card-glow"></div>
      <div class="feature-icon">
        <img src="assets/logos/voice.png" alt="Voice" style="width: 45px; height: 45px;">
      </div>
      <h3 class="feature-title">Natural Interaction</h3>
      <div class="feature-content">
        <p>Speak naturally - no rigid commands. Jane understands context and adapts to your style.</p>
        <ul class="feature-list">
          <li>Context-aware conversations</li>
          <li>Emotional intelligence</li>
          <li>Advanced NLU</li>
          <li>Correction system</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="getting-started">
    <h2 class="section-title">Getting Started in 3 Steps</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem;">
      <div class="step-card">
        <div class="step-number">1</div>
        <h3>Download</h3>
        <p>Get the latest installer from the releases page</p>
      </div>
      
      <div class="step-card">
        <div class="step-number">2</div>
        <h3>Install</h3>
        <p>Run the installer and follow the wizard</p>
      </div>
      
      <div class="step-card">
        <div class="step-number">3</div>
        <h3>Activate</h3>
        <p>Press Ctrl+Shift+J to start using Jane</p>
      </div>
    </div>
  </div>

  <div class="highlight-box">
    <h3>Why Jane is Different</h3>
    <p>Jane 6.0 is the only AI assistant that runs entirely on your machine. No cloud, no data collection, no internet required for core features. Everything happens locally on your device - your privacy is guaranteed.</p>
  </div>

  <div class="feature-section" style="margin: 4rem 0;">
    <h2 class="section-title">Key Features</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
      <div style="background: var(--card-bg); border-radius: 10px; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
        <h3 style="color: var(--cyan); margin-bottom: 1rem;">Voice-First Interaction</h3>
        <ul style="padding-left: 1.25rem; margin-top: 1rem;">
          <li>Wake word "Hey Jarvis"</li>
          <li>Hotkey activation (Ctrl+Shift+J)</li>
          <li>Natural language understanding</li>
          <li>Context-aware conversations</li>
          <li>Emotional intelligence</li>
        </ul>
      </div>
      
      <div style="background: var(--card-bg); border-radius: 10px; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
        <h3 style="color: var(--cyan); margin-bottom: 1rem;">System Control</h3>
        <ul style="padding-left: 1.25rem; margin-top: 1rem;">
          <li>Volume control (system + browser)</li>
          <li>Brightness control</li>
          <li>App management (open/close/switch)</li>
          <li>Media control (play/pause/skip)</li>
          <li>Reminders & alarms</li>
        </ul>
      </div>
      
      <div style="background: var(--card-bg); border-radius: 10px; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
        <h3 style="color: var(--cyan); margin-bottom: 1rem;">Web & Screen Analysis</h3>
        <ul style="padding-left: 1.25rem; margin-top: 1rem;">
          <li>Google search & YouTube</li>
          <li>Screen reading (OCR)</li>
          <li>Screen explanation (AI analysis)</li>
          <li>Screenshot capture</li>
          <li>Ad skipping for YouTube</li>
        </ul>
      </div>
      
      <div style="background: var(--card-bg); border-radius: 10px; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
        <h3 style="color: var(--cyan); margin-bottom: 1rem;">Privacy & Security</h3>
        <ul style="padding-left: 1.25rem; margin-top: 1rem;">
          <li>100% local processing</li>
          <li>No internet required (core features)</li>
          <li>Cryptographic identity verification</li>
          <li>File integrity checking</li>
          <li>Anti-tampering protection</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="cta-section">
    <h2 class="cta-title">Ready to Experience the Future?</h2>
    <p class="cta-subtitle">Jane 6.0 puts AI in your hands, without compromising your privacy or requiring internet connection.</p>
    <div class="cta-buttons">
      <a href="/installation" class="btn btn-cta btn-cta-primary">Installation Guide</a>
      <a href="https://github.com/Ravindu-S/JANE-AI-Assistant/releases" class="btn btn-cta">Download Now</a>
    </div>
  </div>
</div>

<div class="footer">
  <div class="footer-content">
    <p>Jane 6.0 - A fully offline AI virtual assistant for Windows</p>
    <p>Copyright © 2021-present Ravindu Senanayake. All Rights Reserved.</p>
    <p class="footer-copyright">This software is proprietary. See <a href="LICENSE">LICENSE</a> for full terms.</p>
  </div>
</div>

<script>
  // Add subtle animations for visual interest
  document.addEventListener('DOMContentLoaded', function() {
    // Add subtle pulse effect to cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.zIndex = '10';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.zIndex = '1';
      });
    });
    
    // Add a subtle glow effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button =>
