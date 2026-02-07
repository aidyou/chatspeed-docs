---
title: Crush Integration Guide
description: This guide explains how to integrate Chatspeed's CCProxy models with Crush, a powerful programming agent leveraging native tool-calling capabilities. It covers installation, configuration, and usage testing.
keywords: Crush, Integration Guide, CCProxy, Chatspeed, programming agent, tool-calling, installation, configuration, VS Code, Cline
---
# Crush Integration Guide

[Crush](https://github.com/charmbracelet/crush) is a powerful programming agent. The experience is somewhat similar to the `Cline` plugin for `VS Code`, but notably, as of September 22, 2025, it leverages models' native tool-calling capabilities.

## 📋 Prerequisites

Before getting started, please ensure you have completed the following steps:

1. Ensure [Chatspeed](../guide/installation.md) is installed
2. Added the necessary models according to [Quick Start](../guide/quickStart.md)
3. Completed [CCProxy Basic Configuration](configuration.md)
4. Added the required proxy models
5. Configured the proxy key

> For `Crush`, you can create a separate proxy group, but **proxy groups** are not a requirement.

## 🖥️ Crush Installation

Installation via package managers:

```sh
# Homebrew
brew install charmbracelet/tap/crush

# NPM
npm install -g @charmland/crush

# Arch Linux (btw)
yay -S crush-bin

# Nix
nix run github:numtide/nix-ai-tools#crush
```

For Windows users:

```powershell
# Winget
winget install charmbracelet.crush

# Scoop
scoop bucket add charm https://github.com/charmbracelet/scoop-bucket.git
scoop install crush
```

For more installation methods, please refer to [Crush](https://github.com/charmbracelet/crush)

## 🔌 Integrating CCProxy with Crush

The simplest way to integrate CCProxy models with Crush is by editing the configuration file. Crush configuration files can be project-based or global, typically named `crush.json` or `.crush.json`. For global configuration, on `macOS` or `Linux` the file is `$HOME/.config/crush/crush.json`, and on `Windows` it is `%USERPROFILE%\AppData\Local\crush\crush.json`

For model configuration, I recommend using the global approach so you can use it in any project. The following example is for `macOS` users.

1. Edit `$HOME/.config/crush/crush.json`, create it if it doesn't exist
2. Add the model configuration to the file and save:

```json
{
  "$schema": "https://charm.land/crush.json",
  "providers": {
    "Chatspeed": {
      "name": "Chatspeed",
      "base_url": "http://localhost:11435/compat_mode/v1",
      "type": "openai",
      "api_key": "{API_KEY}",
      "models": [
        {
          "name": "gemini2.5-flash",
          "id": "gemini2.5-flash",
          "context_window": 1000000,
          "default_max_tokens": 8192
        },
        {
          "name": "deepseek-r1-0528",
          "id": "deepseek-r1-0528",
          "context_window": 64000,
          "default_max_tokens": 4096
        },
        {
          "name": "deepseek-v3.1",
          "id": "deepseek-v3.1",
          "context_window": 128000,
          "default_max_tokens": 8192
        }
      ]
    }
  }
}
```

Where:

- `base_url`: I used the tool compatibility mode `compat_mode`, which is very useful for some open-source platforms or models deployed with `Ollama`. If your configured model doesn't support native tool calling, `crush`'s tool calls might not function correctly. You can click [Tool Compatibility Mode](../posts/experience-sharing/why-compat-mode.md) to understand its function. You can also check [Proxy API](../api/) to understand the proxy URL structure.
- `API_KEY`: Please go to the `Chatspeed` menu `Proxy` and then select `Proxy Access Key`. Please copy from the list. You can copy an existing key or create a dedicated one for `Crush`.
- All models added to the `models` array must be configured in `Chatspeed`. Please go to the `Chatspeed` menu `Proxy` and then enter the `Proxy Services` interface to configure.

## 🧪 Usage Testing

Following the above configuration, `Crush` should now function correctly. Execute the `crush` command in your project root directory to enter the `crush` interface. Common shortcuts are as follows:

- `ctrl+p` Show command tool interface
  - `New Session` Create a new session
  - `Switch Session` Switch session
  - `Switch Model` Switch model
  - `Toggle Yolo Mode` Toggle Yolo mode
  - `Toggle Help` Toggle help mode—show more/fewer shortcut operation information at the bottom
  - `Initialize Project` Initialize project
- `ctrl+n` Create a new session
- `shift+enter` Used for line breaks when entering in command line
