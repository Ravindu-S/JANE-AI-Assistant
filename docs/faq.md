<div align="center">

# ❓ Frequently Asked Questions

### JANE AI — Personal Virtual Assistant

</div>

---

## 📋 Table of Contents

- [General Questions](#-general-questions)
- [Installation & Setup](#-installation--setup)
- [Voice & Activation](#-voice--activation)
- [Commands & Features](#-commands--features)
- [Performance](#-performance)
- [Privacy & Security](#-privacy--security)
- [Troubleshooting](#-troubleshooting)

---

## 🌟 General Questions

### What is JANE AI?

JANE is a fully offline, AI-powered virtual assistant that runs entirely on your computer. She can understand voice commands, control your system, browse the web, play YouTube videos, set reminders, and have natural conversations — all without sending your data to the cloud.

---

### Is JANE really free?

**Yes, completely free.** No subscriptions, no hidden fees, no premium tiers. JANE is free to download and use forever.

---

### Does JANE require internet?

**For core features: No.**

Voice recognition, AI conversations, system control, and reminders work 100% offline.

**Internet is only needed for:**
- Web searches
- YouTube playback
- Initial AI model download (one-time setup)

---

### What AI does JANE use?

JANE uses **Llama 3** (8B parameter model) running locally via **Ollama**. This is a powerful, open-source large language model that processes everything on your computer.

---

### Who created JANE?

JANE was created by **Ravindu Senanayake**.

---

### Can I modify or redistribute JANE?

No. JANE is proprietary software protected by copyright. Please see the [License](LICENSE) for full terms. Reverse engineering, modification, and redistribution are prohibited.

---

## ⚙️ Installation & Setup

### What are the system requirements?

**Minimum:**
- Windows 10 (64-bit)
- Intel i5 / AMD Ryzen 5
- 8 GB RAM
- 5 GB storage
- Microphone & speakers

**Recommended:**
- Windows 11 (64-bit)
- Intel i7 / AMD Ryzen 7
- 16 GB RAM
- NVIDIA GPU with 4+ GB VRAM

See [Installation Guide](installation.md) for full details.

---

### What software do I need to install first?

1. **Ollama** — Download from [ollama.com](https://ollama.com) and run `ollama pull llama3`
2. **Google Chrome** — Download from [google.com/chrome](https://www.google.com/chrome)

---

### Why does first launch take so long?

On first launch, JANE loads AI models into memory. This can take 30-60 seconds depending on your hardware. Subsequent commands will be much faster.

---

### Do I need a GPU?

**No, but it helps significantly.**

| Hardware | Response Time |
|----------|---------------|
| With NVIDIA GPU | 3-10 seconds |
| CPU only | 10-25 seconds |

JANE works perfectly fine on CPU — just expect slightly longer response times.

---

### Why do I need Chrome?

JANE uses Chrome for web browsing and YouTube features. She creates her own browser profile, so your personal Chrome data remains separate.

---

## 🎤 Voice & Activation

### How do I activate JANE?

**Two methods:**

| Method | How |
|--------|-----|
| **Hotkey** (Recommended) | Press **Ctrl+Shift+J** |
| **Wake Word** | Say **"Hey Jarvis"** |

---

### Why "Hey Jarvis" and not "Hey Jane"?

Currently, no pre-trained wake word model exists for "Hey Jane." We use "Hey Jarvis" as it's the closest available option. A custom "Hey Jane" wake word is planned for a future update.

---

### Is JANE always listening?

**No.** JANE only processes audio **after** you activate her (via hotkey or wake word). She does not passively record or listen.

---

### JANE doesn't hear me. What's wrong?

1. **Check activation** — Did you see the activation message?
2. **Check microphone** — Is it connected and unmuted?
3. **Check permissions** — Windows Settings → Privacy → Microphone
4. **Try the hotkey** — Ctrl+Shift+J is more reliable than wake word
5. **Reduce background noise** — Move to a quieter environment

---

### Can I change the wake word?

Not currently. "Hey Jarvis" is the only available wake word. Custom wake word support is planned for the future.

---

## 🎯 Commands & Features

### What can JANE do?

| Category | Examples |
|----------|----------|
| **Volume** | Turn up/down, mute, set to percentage |
| **Brightness** | Increase/decrease, set to percentage |
| **Applications** | Open, close, switch apps |
| **Web Search** | Google search, YouTube search |
| **YouTube** | Play, pause, skip, fullscreen |
| **Reminders** | Set reminders for any time |
| **Screen Reading** | Read or explain what's on screen |
| **Conversation** | Ask questions, chat naturally |
| **Corrections** | Undo, correct mistakes |

See [Usage Guide](usage.md) for complete command list.

---

### Can JANE control Spotify?

Not currently. JANE controls YouTube for music playback. Spotify integration is planned for a future update.

---

### Can JANE control smart home devices?

Not currently. Smart home integration is on the roadmap for future development.

---

### Can JANE remember things between sessions?

Yes. JANE stores conversation history, reminders, and learned preferences locally. She maintains context within a session and remembers your reminders across restarts.

---

### How do I undo a mistake?

Just say **"Undo that"** and JANE will reverse the last action (volume, brightness, browser navigation).

---

### How do reminders work?

1. Say *"Remind me in 5 minutes"* or *"Remind me at 7pm"*
2. JANE confirms the reminder
3. When the time arrives, JANE speaks the reminder aloud
4. The reminder also appears in the console

**Note:** JANE must be running for reminders to trigger.

---

## ⚡ Performance

### Why are responses slow?

AI processing takes time. Expected response times:

| Hardware | Conversation |
|----------|--------------|
| With GPU | 2-5 seconds  |
| CPU only | 5-10 seconds |

**First command after startup is slowest** — models need to load.

---

### How can I make JANE faster?

1. **Use a GPU** — NVIDIA GPU with 4+ GB VRAM significantly improves speed
2. **Keep Ollama running** — Don't restart it frequently
3. **Close heavy applications** — Free up system resources
4. **Be patient on first command** — Subsequent commands are faster

---

### JANE uses too much memory. Is this normal?

AI models require significant memory. With Llama 3 loaded:

| Component | RAM Usage |
|-----------|-----------|
| JANE + Models | 4-8 GB |
| Ollama | 4-6 GB |

16 GB RAM is recommended for comfortable operation.

---

## 🔒 Privacy & Security

### Does JANE send my data anywhere?

**No.** All processing happens locally:

- ❌ No voice recordings uploaded
- ❌ No conversations sent to servers
- ❌ No usage tracking
- ❌ No telemetry
- ❌ No account required

---

### Where is my data stored?

Everything stays in local files on your computer:

- Conversation history → Local database
- Reminders → Local file
- Settings → Local configuration

---

### Is JANE secure?

JANE includes cryptographic verification to ensure software integrity. She will refuse to start if critical files have been tampered with.

---

### Does JANE access my files?

JANE only accesses:
- Her own installation folder
- Her own data storage
- Screen content (only when you ask for screen reading)

She does not browse, read, or upload your personal files.

---

## 🔧 Troubleshooting

### "Ollama not running" error

1. Look for Ollama icon in system tray
2. If not visible, open Command Prompt and run: ollama serve

3. Keep the terminal open and restart JANE

---

### Chrome doesn't open / Browser errors

1. **Close JANE's browser window** if it was left open from a previous session
2. Your regular Chrome windows can stay open — only JANE's profile needs to be closed
3. Retry the browser command

---

### "No sound from JANE"

1. Check speaker/headphone connection
2. Check system volume is not muted
3. Verify correct output device in Windows Sound Settings
4. Try increasing volume manually first

---

### Voice commands not recognized correctly

1. Speak clearly and at normal pace
2. Wait for activation message before speaking
3. Reduce background noise
4. Position microphone closer
5. Check correct microphone is selected in Windows Settings

---

### Reminders not triggering

1. **JANE must be running** — Reminders won't trigger if JANE is closed
2. Use clear time formats: *"in 5 minutes"*, *"at 3pm"*
3. Check reminder was confirmed when you set it

---

### JANE crashes on startup

1. Ensure Ollama is installed and running
2. Run `ollama pull llama3` to ensure model is downloaded
3. Try running JANE as Administrator
4. Check you meet minimum system requirements

---

### Screen reading not working

1. Some text may not be recognized (handwritten, stylized fonts)
2. High-contrast, clear text works best
3. Try *"read this page"* for exact text or *"explain this"* for AI summary

---

### Still having issues?

1. Check the [Usage Guide](usage.md) for correct command syntax
2. Review system requirements in [Installation Guide](installation.md)
3. [Report a bug](https://github.com/Ravindu-S/JANE-AI-Assistant/issues) with details:
- What you tried to do
- What happened
- Your system specs

---

## ⚠️ Important Notice

> **Use at your own risk.** This software controls system settings (volume, brightness, applications). The developer is not responsible for any unintended consequences. See [LICENSE](LICENSE) for full terms.

---

<div align="center">

**Still need help?** [Report an issue](https://github.com/Ravindu-S/JANE-AI-Assistant/issues)

**[← Features](features.md)** · **[Back to README](README.md)** · **[Installation →](installation.md)**

</div>