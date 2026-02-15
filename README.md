Markdown

<div align="center">

# JANE AI

### Personal Virtual Assistant — Fully Offline, AI-Powered

[![License](https://img.shields.io/badge/License-Proprietary%20EULA-0a1628?style=for-the-badge&labelColor=0a1628&color=00d5ff)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows%2010%2F11-0a1628?style=for-the-badge&logo=windows&logoColor=00d5ff&labelColor=0a1628&color=00d5ff)]()
[![Version](https://img.shields.io/badge/Version-6.0.0-0a1628?style=for-the-badge&labelColor=0a1628&color=00d5ff)](https://github.com/Ravindu_S/JANE-AI-Assistant/releases)
[![Downloads](https://img.shields.io/github/downloads/Ravindu_S/JANE-AI-Assistant/total?style=for-the-badge&label=Downloads&labelColor=0a1628&color=00d5ff)](https://github.com/Ravindu_S/JANE-AI-Assistant/releases)

## Built With

<div align="center">

<img src="assets/logos/python.png" width="70" alt="Python 3.13">
<img src="assets/logos/llama.png" width="80" alt="Llama 3">

**Python 3.13** • **Llama 3 (8B)**

</div>

**Smart • Private • Fully Offline • AI-Powered**

[Download](#download) • [Features](#features) • [Installation](#installation) • [Usage](#usage) • [FAQ](#faq) • [Report Bug](https://github.com/Ravindu_S/JANE-AI-Assistant/issues)

---

![JANE AI Banner](assets/banner.webp)

</div>

---

## Why JANE?

Unlike Siri, Alexa, or Google Assistant — **JANE runs entirely on YOUR machine**.
No cloud. No data collection. No internet required for core features.
Your voice, your commands, your privacy.

- ✓ All AI processing happens locally
- ✓ No data sent to any server
- ✓ No account required
- ✓ No subscription fees
- ✓ Works without internet (core features)


---

## Download

### Latest Version: v6.0.0

| Platform | Download |
|----------|----------|
| Windows 10/11 (64-bit) | [**⬇️ JANE_AI_Setup_v6.0.0.exe**](https://github.com/Ravindu_S/JANE-AI-Assistant/releases/latest) |

> **Prerequisites Required:** [Ollama](https://ollama.com/download) and [Google Chrome](https://www.google.com/chrome/) must be installed before using JANE. See [Installation](#installation) for details.

> **Currently Windows only.** macOS and Linux support planned for future releases.

---

## Features

### Voice Interaction
| Feature | Description |
|---------|-------------|
| **Wake Word** | Say "Hey Jarvis" to activate JANE |
| **Hotkey** | Press `Ctrl+Shift+J` for instant activation |
| **Speech Recognition** | Advanced offline speech recognition |
| **Text-to-Speech** | Natural voice synthesis (fully offline) |

### AI-Powered Intelligence
| Feature | Description |
|---------|-------------|
| **Natural Language Understanding** | No rigid commands — speak naturally |
| **Context-Aware Conversations** | Remembers what you said before |
| **Intent Classification** | AI decides what you want (not keyword matching) |
| **Correction Support** | Say "No, the other one" and JANE adapts |
| **Undo System** | "Undo that" reverses any action |

### System Control
| Feature | Description |
|---------|-------------|
| **Volume Control** | System + browser volume (independent) |
| **Brightness Control** | Screen brightness adjustment |
| **App Management** | Launch, close, switch applications |
| **Reminders** | "Remind me in 5 minutes" |

### Web & Media
| Feature | Description |
|---------|-------------|
| **Google Search** | "Search for Python tutorials" |
| **YouTube** | Search, play, pause, skip, fullscreen |
| **Result Selection** | "Open the first one" after searching |
| **Ad Skip** | Automatically skips YouTube ads when possible |

### Screen Analysis
| Feature | Description |
|---------|-------------|
| **Screenshot** | "Take a screenshot" |
| **Screen Reading** | "Read my screen" — OCR-powered |
| **Screen Explanation** | "What's on my screen?" — AI-powered analysis |

### Conversation
| Feature | Description |
|---------|-------------|
| **General Chat** | "Tell me about machine learning" |
| **Questions** | "What is the capital of France?" |
| **Social** | Greetings, thanks, farewells — natural responses |
| **Personality** | Empathetic, adaptive emotional responses |

### Security
| Feature | Description |
|---------|-------------|
| **Authentication** | Verified creator identity |
| **Integrity Protection** | Protection against unauthorized modification |

---

## Screenshots

<div align="center">

| Startup | Listening | Response |
|---------|-----------|----------|
| ![Startup](screenshots/startup.png) | ![Listening](screenshots/listening.png) | ![Response](screenshots/response.png) |

| YouTube Control | Volume Control | Screen Analysis |
|----------------|----------------|-----------------|
| ![YouTube](screenshots/youtube.png) | ![Volume](screenshots/volume.png) | ![Screen](screenshots/screen.png) |

</div>

---

## Installation

### Prerequisites

Before installing JANE, you must install:

#### 1. Ollama (Required — AI Engine)
- Download from: https://ollama.com/download
- Install Ollama
- Open Terminal/PowerShell and run:
  ```
  ollama pull llama3
  ```
- Wait for the model to download (~4.7 GB)
- Ollama runs automatically in the background after installation


#### 2. Google Chrome (Required — Web Features)
- Download from: https://www.google.com/chrome/
- Install Chrome
- That's it — JANE creates its own Chrome profile automatically


### Install JANE

1. Download `JANE_AI_Setup_v6.0.0.exe` from the Releases page
2. Run the installer
3. Follow the installation wizard
4. Launch JANE from the desktop shortcut or Start Menu
5. Wait for the greeting: "Hello! I'm Jane, your AI assistant."
6. Done!


### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **OS** | Windows 10 (64-bit) | Windows 11 (64-bit) |
| **CPU** | Intel i5 / Ryzen 5 | Intel i7 / Ryzen 7 |
| **RAM** | 8 GB | 16 GB |
| **GPU** | Not required | NVIDIA 4+ GB VRAM |
| **Storage** | 5 GB free | 10 GB free |
| **Microphone** | Any microphone | USB mic or headset |
| **Speakers** | Any speakers | Any speakers |

> **GPU Acceleration:** An NVIDIA GPU with 4+ GB VRAM significantly speeds up AI responses through Ollama. Without a GPU, responses take 10-22 seconds. With a GPU, responses are much faster.

---

## Usage

### Activation

| Method | How | Reliability |
|--------|-----|-------------|
| **Hotkey** | Press `Ctrl+Shift+J` | ⭐⭐⭐ Most reliable |
| **Wake Word** | Say "Hey Jarvis" | ⭐⭐ Good |
| **Voice Detection** | Just start speaking loudly | ⭐ Fallback |

### Command Examples

<details>
<summary><b>Volume Control</b></summary>

- "Turn up the volume"
- "Lower the volume"
- "Mute"
- "Set volume to 50 percent"
- "No, the browser volume" (switches target)
- "Undo that" (reverses change)

</details>

<details>
<summary><b>Brightness Control</b></summary>

- "Increase the brightness"
- "Make it dimmer"
- "Set brightness to 70 percent"
- "That's not enough" (continues adjusting)
- "Too much" (reverses direction)

</details>

<details>
<summary><b>Web Search & YouTube</b></summary>

- "Search for Python tutorials on YouTube"
- "Google machine learning basics"
- "Open the first result"
- "Play the second one"
- "Pause"
- "Skip to the next video"
- "Go fullscreen"

</details>

<details>
<summary><b>Application Control</b></summary>

- "Open Chrome"
- "Launch VS Code"
- "Close Notepad"
- "Switch to Discord"
- "Open the browser" (opens JANE's Chrome profile)

</details>

<details>
<summary><b>Reminders</b></summary>

- "Set a reminder for 5 minutes from now"
- "Remind me in one hour"
- "Remind me to take pills at 7pm"

</details>

<details>
<summary><b>Screen Analysis</b></summary>

- "Take a screenshot"
- "Read this page for me" (reads exact text via OCR)
- "What is on my screen?" (AI summarizes content)
- "Explain what I'm looking at" (AI analyzes context)

</details>

<details>
<summary><b>Conversation</b></summary>

- "What is the capital of France?"
- "Tell me about machine learning"
- "How are you today?"
- "Thanks for your help"

</details>

<details>
<summary><b>Corrections & Undo</b></summary>

- "Undo that" (reverses last action)
- "No, I meant the system volume" (corrects target)
- "That's wrong" (triggers correction flow)
- "Cancel" (cancels current operation)

</details>

### Follow-up Commands

JANE remembers context across commands:
You: "Search for cats on YouTube"
JANE: "Searching for cats on YouTube."

You: (activate) "Open the first one"
JANE: "Opening: Funny Cats Compilation..."

You: (activate) "Skip to the next one"
JANE: "Skipping to next video."

You: (activate) "Lower the volume"
JANE: "Browser volume now at 80%."

You: (activate) "No, the system volume"
JANE: "Got it. System volume now at 80%."


---


> **All AI processing happens locally on your machine. Nothing is sent to the cloud.**

---

## FAQ

<details>
<summary><b>Is JANE free to use?</b></summary>
Yes! JANE is completely free for personal, non-commercial use.
</details>

<details>
<summary><b>Is my data safe?</b></summary>
Absolutely. ALL processing happens locally on YOUR device. No data is ever sent to any server. Your conversations, voice recordings, and commands never leave your machine.
</details>

<details>
<summary><b>Does JANE need the internet?</b></summary>
Core features (volume, brightness, apps, reminders, conversation) work fully offline. Internet is only needed for web search and YouTube features.
</details>

<details>
<summary><b>Why "Hey Jarvis" instead of "Hey Jane"?</b></summary>
A custom "Hey Jane" wake word is planned for future releases. In the meantime, use the hotkey `Ctrl+Shift+J` for the most reliable activation.
</details>

<details>
<summary><b>Why are responses slow (10-22 seconds)?</b></summary>
JANE runs a full AI model locally on your hardware. An NVIDIA GPU with 4+ GB VRAM significantly speeds this up. We're working on faster response times for everyday commands.
</details>

<details>
<summary><b>Will there be macOS/Linux support?</b></summary>
Planned for future releases. Currently Windows 10/11 only.
</details>

<details>
<summary><b>Is the source code available?</b></summary>
No. JANE is proprietary software. The source code is not publicly available. See the <a href="LICENSE">LICENSE</a> for details.
</details>

<details>
<summary><b>Can I redistribute JANE?</b></summary>
No. Redistribution is not permitted. Please direct others to this official repository to download JANE.
</details>

---

## Known Issues

| Issue | Details | Workaround |
|-------|---------|------------|
| Slow AI responses | 10-22 seconds on CPU | Use NVIDIA GPU with Ollama |
| No "Hey Jane" | Uses "Hey Jarvis" model | Use hotkey `Ctrl+Shift+J` |
| YouTube ad skip | Only works on skippable ads | Non-skippable ads must play through |
| Chrome profile conflict | Can't use JANE's Chrome if Chrome is already open with same profile | Close Chrome before starting JANE |
| Emoji in titles | YouTube titles with emoji cause console log errors | Does not affect functionality |

---

## Report a Bug

Found a bug? Help us improve JANE!

[**Report Bug →**](https://github.com/Ravindu_S/JANE-AI-Assistant/issues/new?template=bug_report.md)

## Request a Feature

Have an idea? We'd love to hear it!

[**Request Feature →**](https://github.com/Ravindu_S/JANE-AI-Assistant/issues/new?template=feature_request.md)

---

## Roadmap

| Feature | Priority | Status |
|---------|----------|--------|
| Faster response times | High | Planned |
| Custom "Hey Jane" wake word | High | Planned |
| Streaming speech response | High | Planned |
| Emotion-aware voice variations | Medium | Planned |
| Voice cloning | Medium | Planned |
| Clipboard integration | Medium | Planned |
| File operations | Medium | Planned |
| macOS support | Low | Planned |
| Linux support | Low | Planned |
| Plugin system | Low | Planned |
| Multi-language support | Low | Planned |
| Web dashboard | Low | Planned |
| Smart home integration | Low | Planned |

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for full version history.

---

## License

This software is proprietary. See [LICENSE](LICENSE) for the full End User License Agreement.

- ✓ Free for personal use
- ✓ Download and install freely
- ✓ Bug reports and feedback welcome
- ✗ No redistribution
- ✗ No reverse engineering
- ✗ No commercial use without license
- ✗ No claiming ownership


---

## Creator

<div align="center">

**Ravindu Senanayake**

[![Email](https://img.shields.io/badge/Email-ravinduvidulaka%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:ravinduvidulaka@gmail.com)
[![Country](https://img.shields.io/badge/Country-Sri%20Lanka-orange?style=for-the-badge)]()

</div>

---

## Support the Project

If you find JANE useful:

- **Star** this repository
- **Report** bugs and issues
- **Suggest** new features
- **Share** with friends and communities
- **Spread the word** on social media

---

<div align="center">

**Made with ❤️ in Sri Lanka**

**All AI processing happens locally. Your privacy is guaranteed.**

Copyright © 2021-present Ravindu Senanayake. All Rights Reserved.

</div>