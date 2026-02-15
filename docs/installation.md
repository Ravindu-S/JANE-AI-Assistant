<div align="center">

# ⚙️ Installation Guide

### JANE AI — Personal Virtual Assistant

</div>

---

## 📋 Table of Contents

- [System Requirements](#-system-requirements)
- [Prerequisites](#-prerequisites)
- [Download](#-download)
- [Installation Steps](#-installation-steps)
- [First-Time Setup](#-first-time-setup)
- [Verify Installation](#-verify-installation)
- [Updating JANE](#-updating-jane)
- [Uninstallation](#-uninstallation)

---

## 💻 System Requirements

### Minimum Requirements

| Component | Requirement |
|-----------|-------------|
| **Operating System** | Windows 10 (64-bit) or later |
| **Processor** | Intel Core i5 / AMD Ryzen 5 or equivalent |
| **RAM** | 8 GB |
| **Storage** | 5 GB free disk space |
| **Microphone** | Required for voice input |
| **Speakers** | Required for voice output |
| **Internet** | Required for initial setup only |

### Recommended Requirements

| Component | Recommendation |
|-----------|----------------|
| **Operating System** | Windows 11 (64-bit) |
| **Processor** | Intel Core i7 / AMD Ryzen 7 or equivalent |
| **RAM** | 16 GB |
| **GPU** | NVIDIA GPU with 4+ GB VRAM |
| **Storage** | 10 GB free disk space |
| **Microphone** | Dedicated USB microphone or headset |

> 💡 **Tip:** A dedicated GPU significantly improves AI response times. Without a GPU, JANE will still work but responses may take longer.

---

## 📦 Prerequisites

Before installing JANE, you need to install the following software:

### 1. Ollama (Required)

Ollama is the AI engine that powers JANE's intelligence.

| | |
|---|---|
| **Download** | [https://ollama.com/download](https://ollama.com/download) |
| **Purpose** | Local AI model inference |
| **License** | Free (MIT License) |

**After installing Ollama:**

1. Open **Command Prompt** or **PowerShell**
2. Run the following command to download the AI model:ollama pull llama3

3. Wait for the download to complete (~4.7 GB)

### 2. Google Chrome (Required)

Required for web browsing and YouTube features.

| | |
|---|---|
| **Download** | [https://www.google.com/chrome/](https://www.google.com/chrome/) |
| **Purpose** | Web search, YouTube playback |
| **License** | Freeware |

---

## 📥 Download

### Latest Release

[![Download JANE AI](https://img.shields.io/badge/Download-JANE%20AI%20v6.0.0-00d4ff?style=for-the-badge&labelColor=0a1628)](https://github.com/Ravindu-S/JANE-AI-Assistant/releases/latest)

1. Go to the [Releases Page](https://github.com/Ravindu-S/JANE-AI-Assistant/releases)
2. Download the latest `JANE-AI-Setup-x.x.x.exe` file
3. Save it to a location you can easily find (e.g., Downloads folder)

---

## 🚀 Installation Steps

### Step 1: Run the Installer

1. Locate the downloaded `JANE-AI-Setup-x.x.x.exe` file
2. **Right-click** → **Run as Administrator** (recommended)
3. If Windows SmartScreen appears, click **More info** → **Run anyway**

### Step 2: Follow the Setup Wizard

1. **Welcome Screen** — Click **Next**
2. **License Agreement** — Read the EULA, check "I accept", click **Next**
3. **Installation Location** — Choose where to install (default is recommended)
4. **Start Menu Folder** — Choose or keep default, click **Next**
5. **Additional Options** — Select desired options:
- ☑️ Create desktop shortcut
- ☑️ Add to Start Menu
6. Click **Install**
7. Wait for installation to complete
8. Click **Finish**

### Step 3: Verify Ollama is Running

Before launching JANE, ensure Ollama is running:

1. Look for the **Ollama icon** in your system tray (bottom-right)
2. If not visible, open Command Prompt and run: ollama serve

3. Keep this running in the background

---

## 🎯 First-Time Setup

### Launching JANE for the First Time

1. **Start Ollama** (if not already running)
2. **Close any Chrome windows** using JANE's profile (regular Chrome is fine)
3. **Launch JANE** from the desktop shortcut or Start Menu
4. **Wait for initialization** — First launch may take 30-60 seconds as AI models load
5. **Listen for the greeting:** *"Hello! I'm Jane, your AI assistant."*

### Test Your Setup

Try these commands to verify everything works:

| Say This | Expected Result |
|----------|-----------------|
| *"Hey Jarvis"* or press **Ctrl+Shift+J** | JANE activates with a message |
| *"What time is it?"* | JANE tells you the current time |
| *"Search for music on YouTube"* | Chrome opens with YouTube search |
| *"Increase the volume"* | System volume increases |

### Recommended First Steps

1. **Test your microphone** — Speak clearly and check if JANE hears you
2. **Adjust wake word sensitivity** — If JANE activates too easily or not enough
3. **Try the hotkey** — Press **Ctrl+Shift+J** for reliable activation
4. **Explore commands** — See [Usage Guide](usage.md) for all commands

---

## ✅ Verify Installation

### Quick Health Check

| Check | How to Verify |
|-------|---------------|
| Ollama running | System tray icon visible, or `ollama list` shows `llama3:latest` |
| JANE launches | No error messages, greeting plays |
| Voice input works | JANE responds to your commands |
| Voice output works | You can hear JANE speaking |
| Browser works | Web search opens Chrome correctly |

### Common First-Time Issues

| Issue | Solution |
|-------|----------|
| "Ollama not running" warning | Start Ollama: `ollama serve` |
| No sound from JANE | Check speaker settings and volume |
| JANE doesn't hear you | Check microphone permissions in Windows Settings |
| Slow first response | Normal — AI models loading, subsequent responses faster |

---

## 🔄 Updating JANE

### Check for Updates

1. Visit the [Releases Page](https://github.com/Ravindu-S/JANE-AI-Assistant/releases)
2. Compare the latest version with your installed version
3. Download the new installer if an update is available

### Update Process

1. **Close JANE** completely
2. **Run the new installer** — it will update your existing installation
3. **Restart JANE**

> ⚠️ Your settings, reminders, and conversation history are preserved during updates.

---

## 🗑️ Uninstallation

### Remove JANE

1. Open **Windows Settings** → **Apps** → **Installed Apps**
2. Search for **JANE AI**
3. Click the **three dots** → **Uninstall**
4. Follow the uninstallation wizard

### Remove Associated Data (Optional)

To completely remove all JANE data:

1. Delete the JANE installation folder
2. Delete JANE's browser profile folder (if you want to remove browser data)

### Remove Prerequisites (Optional)

If you no longer need them:

1. **Ollama** — Uninstall from Windows Apps
2. **Chrome** — Keep if you use it for other purposes

---

## ⚠️ Important Notice

> **Use at your own risk.** This software controls system settings (volume, brightness, applications). The developer is not responsible for any unintended consequences. By installing and using JANE AI, you agree to the terms of the [End User License Agreement](LICENSE).

---

<div align="center">

**Need help?** Check the [FAQ](faq.md) or [report an issue](https://github.com/Ravindu-S/JANE-AI-Assistant/issues)

**[← Back to README](README.md)** · **[Usage Guide →](usage.md)**

</div>