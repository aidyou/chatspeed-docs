---
title: 免费使用 Claude Code：集成 Nvidia deepseek-v3.1
date: 2025-09-23
category:
  - 低成本编程
tag:
  - Claude Code
  - 免费
  - deepseek
description: 本文展示如何通过接入 Nvidia 的 deepseek-v3.1 模型免费使用 Claude Code，详细介绍了 Chatspeed 的 CCProxy 模块如何实现协议转换。
keywords: 免费使用 Claude Code, Nvidia, deepseek-v3.1, Chatspeed, CCProxy, 协议转换, 低成本编程, Claude Code, 免费, deepseek
---

## 📋 开始之前

本篇是“免费使用 Claude Code”系列博客的第二篇，将向你展示如何通过接入 Nvidia 的 [deepseek-v3.1](https://build.nvidia.com/deepseek-ai/deepseek-v3_1) 模型，实现免费使用 Claude Code。

在开始之前，你必须先安装 [Chatspeed](https://github.com/aidyou/chatspeed/releases)。Chatspeed 的代理模块 [CCProxy](../../ccproxy/) 实现了在 OpenAI 兼容格式、Claude、Gemini、Ollama 原生协议之间的任意转换，是实现本文目标的关键工具。关于 Chatspeed 的安装，请参考[安装指南](../../guide/installation.md)。

## 🚀 免费使用 Claude Code

### 🖥️ 平台及模型

本次我们选用接入 Claude Code 的模型是[NVIDIA NIM](https://build.nvidia.com/models)的 [deepseek-v3.1](https://build.nvidia.com/deepseek-ai/deepseek-v3_1)。截止目前（2025-09-23），Nvidia上的模型调用限制是 40 RPM（每分钟40个请求），经过我测试，在 Claude Code 中跑没有问题。如果不够的话，可以注册2个账户进行轮换，那样就完全足够。

### 📝 Nvidia NIM 账户注册

1. 从[NVIDIA NIM](https://build.nvidia.com/models)右上角的“Login”按钮点击进去
2. 在 `Enter your email ID` 输入框中输入你的邮箱地址，点击 `Next`
3. 进入界面后，如果你的账户没有注册过，会进入注册页面，输入`密码`和`确认密码`，然后点击 `创建账户` 即可。你也可以点击`更多选项`，然后选择 `使用 Google 登录`、`使用 Discord 登录` 等。
4. 注册完成后，你通常需要进行手机号验证，当前手机号验证不支持`中国大陆和香港`的手机号，可以寻找一些可靠的收费接码平台进行认证。免费接码基本不用试，如果你能找到算你运气好。
5. 完成注册并通过手机号认证后，点击页面右上角的头像，然后点击[API Keys](https://build.nvidia.com/settings/api-keys)就能进入密钥管理。
6. 点击页面右上角`Generate API Key`，输入`Key Name`，选择有效期`Expiration`，然后点击`Generate Key`创建密钥。

至此，Nvidia 的账户和密钥准备完成。拷贝密钥待后面使用。

### ⚙️ 配置模型

1. 请先根据[安装指南](../../guide/installation.md)安装好 [Chatspeed](https://chatspeed.aidyou.ai)
2. 参考[添加模型](../../guide/quickStart.html#添加模型)将 `Nvidia` 的 `deepseek-v3.1` 模型添加到 Chatspeed 中，大致步骤：
   - 点击 `Chatspeed` 右上角菜单按钮，选择 `AI引擎`
   - 点击右上角的 `+`，在弹出页面的搜索框输入`nvidia`，然后点击 `从预设导入`
   - `基本信息`界面的信息你基本上不需要动，将你上面拷贝的密钥填入 `API密钥` 即可。另外，有些人可能访问不了 Nvidia 的页面，可以在“通用”设置中设置代理，然后此处的`代理类型`选择`跟随网络设置`，或者直接在这里选择`HTTP 代理`，然后输入代理地址，代理用户名和密码是可选的。
   - 点击`模型信息`进入模型配置，选择`导入模型`，在搜索框中分别搜索并选择 `deepseek-v3.1` 和 `qwen/qwen3-next-80b-a3b-instruct`，完成选择后，点击`保存`。
     > 我们选择这两个模型，是因为 Claude Code 会使用一个快速模型（对应 Haiku）处理实时建议，和一个强大模型（对应 Sonnet）处理复杂任务。在后续步骤中，我们会将 Qwen 映射到 Haiku，将 Deepseek 映射到 Sonnet。
   - 附加信息你基本上不用修改，直接点击`保存`，模型添加完成

> 虽说本文讲的是接入`deepseek-v3.1`，如果你愿意或者喜欢，你也可以选择`qwen/qwen3-coder-480b-a35b-instruct`、`moonshotai/kimi-k2-instruct-0905`等模型

## 🔄 配置代理模型

关于代理模型的配置你可以参考[CCProxy配置指南](../../ccproxy/configuration.md)，按步骤配置：

- `代理分组`：你可以添加一个单独的代理分组，比如名字叫`ds`
- `代理服务`：`claude-3-5-haiku-20241022`你可以选择上面添加的`qwen/qwen3-next-80b-a3b-instruct`，`claude-sonnet-4-20250514`则选择上面添加的`deepseek-v3.1`
- `代理密钥`：你可以创建一个单独的`ClaudeCode`专用密钥

## 🔌 接入 `Claude Code`

将上面的代理模型接入 Claude Code你可以参考[Claude Code 接入指南](../../ccproxy/claude-code.md)

至此你可以愉快地免费使用 `Claude Code` 了😄
