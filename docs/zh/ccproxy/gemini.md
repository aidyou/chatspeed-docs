---
title: Gemini CLI 接入指南
description: 本指南提供了使用定制版 Gemini CLI (llxprt-code) 接入 Chatspeed 的 CCProxy 的完整教程。它使 Gemini CLI 能够使用 CCProxy 代理的任何模型。
keywords: Gemini CLI, 接入指南, CCProxy, Chatspeed, llxprt-code, 代理模型, 定制版本, OpenAI 兼容, 工具兼容模式, 配置
---
# `Gemini CLI` 接入指南

> 使用定制版 `Gemini CLI` 接入 CCProxy 的完整指南

`Gemini CLI` 是一个命令行界面的编程智能体，原版的`Gemini CLI`只能接入`Gemini`自己的模型，我们需要通过使用定制分支 [llxprt-code](https://github.com/acoliver/llxprt-code)，让它可以接入 CCProxy 代理的任何模型。

## 📦 一、获取定制版本

由于 Gemini CLI 官方仓库仅支持 Google 的 Gemini 模型，我们需要使用支持接入其他模型的分支，本文以 [llxprt-code](https://github.com/acoliver/llxprt-code) 为例，您可以使用自己喜欢的其他分支。

### 🖥️ 安装 `llxprt-code`

首先确保你的系统已安装了 [Node.js 20](https://nodejs.org/en/download) 以上版本。

您可以通过 npm 安装：

```sh
npm install -g @vybestack/llxprt-code
```

或者直接通过 npx 执行：

```sh
npx https://github.com/acoliver/llxprt-code
```

## 🔌 接入 `llxprt`

### 📋 前置条件

在开始使用前，请确保已完成以下步骤：

1. 已安装 [Chatspeed](../guide/installation.md)
2. 根据[快速开始](../guide/quickStart.md)添加了必要的模型
3. 已完成[CCProxy 基础配置](configuration.md)
4. 已添加所需的代理模型
5. 已配置好代理密钥

> 对于 `llxprt`，模型是自己指定的，所以配置 **代理分组** 不是必要条件。

### 📝 配置 `llxprt`

1. 在命令行切换到您的项目目录，执行 `llxprt` 进入
2. 进入`llxprt`后按下面顺序执行配置：
   - `/provider openai`
   - `/baseurl http://127.0.0.1:11434/compat_mode/v1`
   - `/key {ProxyKey}`
   - `/model {ModelName}`

**其中：**

- `/baseurl http://127.0.0.1:11434/compat_mode/v1` 我们设置为工具兼容模式，在这个模式下可以更好地拓展模型的能力，如果您想使用原生工具调用，将地址设置为 `http://127.0.0.1:11434/v1`
- `/model {ModelName}`：指定要使用的模型名称，例如 `qwen3-coder`。模型可以从 [Chatspeed](https://chatspeed.aidyou.ai) 的设置中获取，按顺序点击菜单：`代理 -> 代理服务`，找到你喜欢的模型拷贝即可。
- `/key {ProxyKey}`：代理密钥可以从 [Chatspeed](https://chatspeed.aidyou.ai) 的设置中获取，按顺序点击菜单：`代理 -> 代理访问密钥`，您可以单独创建一个 `llxprt` 专用的密钥也可以用之前已存在的其他密钥。

3. 经过上文设置后，`llxprt`即可正常使用。
4. 如果您在使用过程想切换模型，直接执行`/model`就可以选择列表（有多个的话）中的模型了。

运行大概是这个样子：

```shell
╭────────────╮
│  > 你是？  │
╰────────────╯

✦ 我是 Claude，由 Anthropic 开发的 AI 助手。我专门协助软件工程任务，能够帮助你理解代码、修复 bug、添加功能、重构代码以及执行各种编程相关的工作。

  我会通过使用工具来完成任务，比如读取和编辑文件、搜索内容、运行 shell 命令等。我的目标是高效、准确地帮助你完成软件开发工作。

  有什么我可以帮你的吗？
```

> 备注：`llxprt`似乎修改了系统提示词，否则也不会说自己是`Claude`，也或许是凑巧 😄
