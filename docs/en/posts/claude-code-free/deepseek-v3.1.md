---
title: Free Claude Code Usage - Integrating Nvidia deepseek-v3.1
date: 2025-09-23
category:
  - Low-cost Programming
tag:
  - Claude Code
  - Free
  - deepseek
---

## 📋 Before You Begin

This is the second article in the "Free Claude Code Usage" blog series. It will show you how to integrate Nvidia's [deepseek-v3.1](https://build.nvidia.com/deepseek-ai/deepseek-v3_1) model to use Claude Code for free.

Before getting started, you must first install [Chatspeed](https://github.com/aidyou/chatspeed/releases). Chatspeed's proxy module (`CCProxy`) implements conversion between OpenAI compatible format, Claude, Gemini, and Ollama native protocols, which is the key tool to achieve the goal of this article. For Chatspeed installation, please refer to the [Installation Guide](../../guide/installation.md).

## 🚀 Free Claude Code Usage

### 🖥️ Platform and Model

The model we choose for Claude Code integration is [deepseek-v3.1](https://build.nvidia.com/deepseek-ai/deepseek-v3_1) from [NVIDIA NIM](https://build.nvidia.com/models). As of now (2025-09-23), the model call limit on Nvidia is 40 RPM (40 requests per minute), which I've tested works fine with Claude Code. If that's not enough, you can register 2 accounts to rotate them, which will be completely sufficient.

### 📝 NVIDIA NIM Account Registration

1. Click the "Login" button in the upper right corner of [NVIDIA NIM](https://build.nvidia.com/models)
2. Enter your email address in the `Enter your email ID` input box, then click `Next`
3. After entering the page, if your account is not registered, you'll enter the registration page. Enter your `password` and `confirm password`, then click `Create Account`. You can also click `More Options` and choose `Sign in with Google`, `Sign in with Discord`, etc.
4. After registration, you usually need to verify your phone number. Currently, phone number verification does not support phone numbers from `Mainland China and Hong Kong`. You can look for some reliable paid SMS verification platforms for authentication. Don't bother trying free verification services - if you can find one, you're lucky.
5. After completing registration and phone number verification, click your avatar in the upper right corner of the page, then click [API Keys](https://build.nvidia.com/settings/api-keys) to enter key management.
6. Click `Generate API Key` in the upper right corner, enter a `Key Name`, select the expiration period `Expiration`, then click `Generate Key` to create the key.

At this point, the NVIDIA account and key preparation is complete. Copy the key for later use.

### ⚙️ Model Configuration

1. First, install [Chatspeed](https://chatspeed.aidyou.ai) according to the [Installation Guide](../../guide/installation.md)
2. Refer to [Adding Models](../../guide/quickStart.html#adding-models) to add the `deepseek-v3.1` model from `Nvidia` to Chatspeed. The general steps are:
   - Click the menu button in the upper right corner of `Chatspeed`, select `AI Engine`
   - Click the `+` in the upper right corner, enter `nvidia` in the search box of the pop-up page, then click `Import from Preset`
   - You basically don't need to change the information on the `Basic Information` page. Fill in the key you copied above into `API Key`. In addition, some people may not be able to access Nvidia's page. You can set up a proxy in the "General" settings, then select `Follow Network Settings` for `Proxy Type` here, or directly select `HTTP Proxy` here and enter the proxy address. The proxy username and password are optional.
   - Click `Model Information` to enter model configuration, select `Import Model`, then search for and select both `deepseek-v3.1` and `qwen/qwen3-next-80b-a3b-instruct`. After selecting them, click `Save`.
     > We are selecting two models because Claude Code uses a fast model (corresponding to Haiku) for real-time suggestions and a powerful model (corresponding to Sonnet) for complex tasks. In the next steps, we will map Qwen to Haiku and Deepseek to Sonnet.
   - You basically don't need to modify the additional information, just click `Save` to complete the model addition.

> Although this article focuses on integrating `deepseek-v3.1`, if you prefer, you can also choose models like `qwen/qwen3-coder-480b-a35b-instruct` or `moonshotai/kimi-k2-instruct-0905`.

## 🔄 Proxy Model Configuration

For proxy model configuration, you can refer to the [CCProxy Configuration Guide](../../ccproxy/configuration.md) and configure according to the steps:

- `Proxy Group`: You can add a separate proxy group, for example, name it `ds`
- `Proxy Service`: For `claude-3-5-haiku-20241022` you can select the `qwen/qwen3-next-80b-a3b-instruct` added above, and for `claude-sonnet-4-20250514` select the `deepseek-v3.1` added above
- `Proxy Key`: You can create a dedicated key for `ClaudeCode`

## 🔌 Integrating with `Claude Code`

To integrate the proxy model with Claude Code, you can refer to the [Claude Code Integration Guide](../../ccproxy/claude-code.md)

At this point, you can happily use `Claude Code` for free 😄
