---
title: 免费使用 Claude Code：集成 grok-4-fast
date: 2025-09-26
category:
  - 低成本编程
tag:
  - Claude Code
  - 免费
  - grok
description: 本指南介绍如何通过集成 OpenRouter 的 grok-4-fast 模型免费使用 Claude Code。内容涵盖账户注册、Chatspeed 中的模型配置以及 Vercel AI Gateway 替代方案。
---

## 📋 开始之前

本篇是“免费使用 Claude Code”系列博客的第三篇，将向你展示如何通过接入 [OpenRouter](https://openrouter.ai/) 的 [grok-4-fast](https://openrouter.ai/x-ai/grok-4-fast:free) 模型，实现免费使用 Claude Code。

在开始之前，你必须先安装 [Chatspeed](https://github.com/aidyou/chatspeed/releases)。Chatspeed 的代理模块 [CCProxy](../../ccproxy) 实现了在 OpenAI 兼容格式、Claude、Gemini、Ollama 原生协议之间的任意转换，是实现本文目标的关键工具。关于 Chatspeed 的安装，请参考[安装指南](../../guide/installation.md)。

> 该模型我个人仅用于`Claude Code`小范围开发以及在`Zed`编辑器中的使用，并非高频使用场景。对于高频使用场景，建议考虑密钥轮换或负载均衡策略。

## 🚀 免费使用 Claude Code

### 🖥️ 平台及模型

本次我们选用接入 Claude Code 的模型是[OpenRouter](https://openrouter.ai/)的 [grok-4-fast](https://openrouter.ai/x-ai/grok-4-fast:free)。关于这个模型的调用限制，我尚不清楚其是否与 `OpenRouter` 的其他免费模型相同。我用它接入 `Claude Code` 写过一些小东西，没遇到频率限制。

> 应该特别注意，用这个免费模型，数据可能被用于训练，OpenRouter 上的原文是“Prompts and completions may be used by xAI or OpenRouter to improve future models.”

> 由于我平时主要用 `Gemini CLI`和`Qwen Code`，所以这个模型用得不多，需要使用者自行测试。

### 📝 OpenRouter

#### 账户注册 —— 主选账户

1. 访问 [OpenRouter](https://openrouter.ai/) 官网，点击右上角的"Sign in"按钮
2. 你可以选择使用 Github 账号、Google 账号或 MetaMask 钱包登录，也可以点击对话框底部的[Sign up](https://openrouter.ai/CLERK-ROUTER/VIRTUAL/sign-up)直接注册新账户
3. 登录/注册完成后，鼠标悬停头像会显示下拉菜单，选择[Keys](https://openrouter.ai/settings/keys)
4. 点击 `Create API Key` 按钮开始创建 API 密钥
5. 在弹出的对话框中为 API 密钥命名（填写 `Name` 字段，例如 "grok Key"），然后点击`Create`。由于我们旨在免费使用模型，因此“Credit limit (optional)”字段可留空。
6. 创建成功后，系统会显示 API 密钥，请立即复制并妥善保存，因为密钥只会显示一次

至此，OpenRouter 的账户和 API 密钥准备完成。

#### ⚙️ 配置模型

1. 请先根据[安装指南](../../guide/installation.md)安装好 [Chatspeed](https://chatspeed.aidyou.ai)
2. 参考[添加模型](../../guide/quickStart.html#添加模型)将 `OpenRouter` 的 `grok-4-fast:free` 模型添加到 Chatspeed 中，大致步骤：
   - 点击 `Chatspeed` 右上角菜单按钮，选择 `AI引擎`
   - 点击右上角的 `+`，在弹出页面的搜索框输入`openrouter`，然后点击 `从预设导入`
   - `基本信息`
     - 界面上的其他信息通常无需修改，将您之前复制的 API 密钥填入 `API密钥` 字段即可。
     - `代理类型`：如果你访问不了`vercel`的网站，那么你就必须使用代理，如果你的“网络设置”中已经设置了代理你可以选择“跟随网络设置”，也可以在这里单独设置“HTTP 代理”
   - 点击`模型信息`进入模型配置，选择`导入模型`，在搜索框中搜索 `grok-4`，然后选择`x-ai/grok-4-fast:free`并保存
   - 点击`保存`，模型添加完成

至此 OpenRouter 平台的 grok-4-fast:free 模型添加完成。

### 📝 Vercel AI Gateway

#### 账户注册 —— 备选账户

> 我是注册完并测试的时候发现需要绑定信用卡，所以后面步骤我就没测试了，如果有信用卡的可以试下。未绑定信用卡会出现如下错误：
> customer_verification_required: AI Gateway requires a valid credit card on file to service requests. Please visit https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card to add a card and unlock your free credits.

1. 访问 [Vercel](https://vercel.com/) 官网，点击右上角的"Sign Up"按钮注册账户
2. 你可以选择使用邮箱注册或通过 Google、GitHub、GitLab、Bitbucket 等第三方账户登录
3. 注册完成后，登录 Vercel 后点击头像，然后选择下拉菜单的`Dashboard`，然后在顶部导航栏找到"AI Gateway"点击进入
4. 在 AI Gateway 页面中，点击左侧边栏的"API Keys"
5. 点击"Create Key"按钮创建新的 API 密钥
6. 在弹出的对话框中为 API 密钥命名（例如 "dev"），然后点击创建
7. 创建成功后，系统会显示 API 密钥，请立即复制并妥善保存，因为密钥只会显示一次
8. 绑定信用卡：在顶部菜单中选择“Settings”，然后进入左侧菜单的“Billing”选项，在页面中找到“Payment Method”并点击进入，随后点击“Add Card”并按照提示完成信用卡绑定。
   至此，Vercel AI Gateway 的账户和 API 密钥准备完成。

### ⚙️ 配置 Vercel AI Gateway 模型

1. 同样在 [Chatspeed](https://chatspeed.aidyou.ai) 中配置 Vercel AI Gateway 模型
2. 参考[添加模型](../../guide/quickStart.html#添加模型)将 `Vercel AI Gateway` 的模型添加到 Chatspeed 中，大致步骤：
   - 点击 `Chatspeed` 右上角菜单按钮，选择 `AI引擎`
   - 点击右上角的 `+`，在弹出页面的搜索框输入`vercel`，然后点击 `+手动添加`
   - `基本信息`界面需要填写：
     - `API 协议`：选择 `OpenAI`
     - `请求地址`：`https://ai-gateway.vercel.sh/v1`
     - `API密钥`：填入你上面复制的 Vercel AI Gateway API 密钥
     - `代理类型`：如果你访问不了`vercel`的网站，那么你就必须使用代理，如果你的“网络设置”中已经设置了代理你可以选择“跟随网络设置”，也可以在这里单独设置“HTTP 代理”
   - 点击`模型信息`进入模型配置，选择`导入模型`
     - 在搜索框中搜索`grok-4`，然后选择`xai/grok-4-fast-non-reasoning`（推理模型响应较慢，我个人更偏好非推理模型；如果您喜欢，也可以选择`xai/grok-4-fast-reasoning`）。
     - 点击“保存”
   - 点击`保存`，模型添加完成

### 🔄 配置代理模型

关于代理模型的配置你可以参考[CCProxy配置指南](../../ccproxy/configuration.md)，按步骤配置：

- `代理分组`：你可以添加一个单独的代理分组，比如名字叫`grok`
- `代理服务`：`claude-3-5-haiku-20241022`和`claude-sonnet-4-20250514`均可选择上面已添加的`x-ai/grok-4-fast:free`模型。如果您已注册 `Vercel` 账户并绑定了信用卡，也可以将 `Vercel` 中的 `xai/grok-4-fast-non-reasoning` 模型一并选中，这样可以达到负载均衡提高调用频率，降低`429`的概率。
- `代理密钥`：你可以创建一个单独的`ClaudeCode`专用密钥，也可以使用你之前的其他密钥，看你自己喜好。

### 🔌 接入 `Claude Code`

将上面的代理模型接入 Claude Code 你可以参考[Claude Code 接入指南](../../ccproxy/claude-code.md)

至此你可以愉快地免费使用 `Claude Code` 了😄
