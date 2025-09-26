---
title: Crush 接入指南
description: 本指南介绍如何将 Chatspeed 的 CCProxy 模型与 Crush 集成，Crush 是一款强大的编程智能体，利用模型的原生工具调用能力。内容涵盖安装、配置和使用测试。
keywords: Crush, 接入指南, CCProxy, Chatspeed, 编程智能体, 工具调用, 安装, 配置, VS Code, Cline
---
# `Crush` 接入指南

Crush 是一款强大的编程智能体，其体验类似于 `VS Code` 的 `Cline` 插件，但值得注意的是，截至目前（2025-09-22），它利用了模型的原生工具调用能力。

## 📋 前提条件

在开始使用前，请确保已完成以下步骤：

1. 确保已安装 [Chatspeed](../guide/installation.md)
2. 根据[快速开始](../guide/quickStart.md)添加了必要的模型
3. 已完成[CCProxy 基础配置](configuration.md)
4. 已添加所需的代理模型
5. 已配置好代理密钥

> 对于 `Crush` 你可以创建单独的代理分组，但 **代理分组** 不是必要条件。

## 🖥️ Crush 安装

通过包管理安装：

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

对于 Windows 用户：

```powershell
# Winget
winget install charmbracelet.crush

# Scoop
scoop bucket add charm https://github.com/charmbracelet/scoop-bucket.git
scoop install crush
```

更多安装方式请参考[Crush](https://github.com/charmbracelet/crush)

## 🔌 将 CCProxy 接入 Crush

将 CCProxy 中的模型接入 Crush 最简便的方式是编辑配置文件。`Crush` 的配置文件可以是基于项目的，也可以是全局的，名称通常是 `crush.json` 或者 `.crush.json`。采用全局配置的情况下，对于 `macOS` 或者 `Linux` 来说文件为 `$HOME/.config/crush/crush.json`，`Windows` 则是 `%USERPROFILE%\AppData\Local\crush\crush.json`

对于模型的配置，我建议采用全局方式，这样你在任何项目都可以使用。下面以 `macOS` 用户为例。

1. 编辑`$HOME/.config/crush/crush.json`，如果文件不存在则创建
2. 将模型配置添加到文件中并保存：

```json
{
  "$schema": "https://charm.land/crush.json",
  "providers": {
    "Chatspeed": {
      "name": "Chatspeed",
      "base_url": "http://localhost:11434/compat_mode/v1",
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

其中：

- `base_url`：我使用了工具兼容模式 `compat_mode`，这对一些开源平台或者 `Ollama` 部署的模型来说非常有用，如果你配置的模型不支持原生工具调用则 `crush` 的工具调用可能无法正常工作，你可以点击[工具兼容模式](../posts/experience-sharing/why-compat-mode.md)了解其作用。你还可以通过[代理 API](../api/)来了解代理 URL 的构成。
- `API_KEY`：请在 `Chatspeed` 菜单 `代理` 点击进入然后选择 `代理访问密钥` ，请从列表中拷贝，您可以拷贝已存在的密钥或者单独为 `Crush` 创建一个专用的。
- 所有添加到`models`数组中的模型，都必须在`Chatspeed`中配置，请从 `Chatspeed` 菜单 `代理` 点击进入 `代理服务` 界面配置。

## 🧪 使用测试

遵循上述配置后，`Crush` 应该可以正常使用。在您项目根目录执行 `crush` 命令，进入 `crush` 界面。常用的快捷键如下：

- `ctrl+p` 显示命令工具界面
  - `New Session` 创建新的会话
  - `Switch Session` 切换会话
  - `Switch Model` 切换模型
  - `Toggle Yolo Mode` 切换 Yolo 模式
  - `Toggle Help` 切换帮助模式——在底部显示更多/少量快捷键操作信息
  - `Initialize Project` 初始化项目
- `ctrl+n` 创建新的会话
- `shift+enter` 在命令行输入时用来换行
