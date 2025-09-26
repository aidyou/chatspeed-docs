---
title: Free Claude Code - Integrating grok-4-fast
date: 2025-09-26
category:
  - Low-Cost Programming
tag:
  - Claude Code
  - Free
  - grok
description: This guide explains how to use Claude Code for free by integrating OpenRouter's grok-4-fast model. It covers account registration, Chatspeed model configuration, and Vercel AI Gateway as an alternative.
---

## 📋 Before You Start

This is the third article in the "Free Claude Code" blog series, demonstrating how to use Claude Code for free by integrating [OpenRouter](https://openrouter.ai/)'s [grok-4-fast](https://openrouter.ai/x-ai/grok-4-fast:free) model.

Before you begin, you must install [Chatspeed](https://github.com/aidyou/chatspeed/releases). Chatspeed's proxy module [CCProxy](../../ccproxy) enables arbitrary conversion between OpenAI compatible formats, Claude, Gemini, and Ollama native protocols, making it a key tool for achieving the goal of this article. For Chatspeed installation, please refer to the [Installation Guide](../../guide/installation.md).

> I personally use this model for small-scale `Claude Code` development and within the `Zed` editor, not for high-frequency scenarios. For high-frequency use cases, it is recommended to consider key rotation or load balancing strategies.

## 🚀 Free Claude Code

### 🖥️ Platform and Model

This time, the model we choose to integrate with Claude Code is [OpenRouter](https://openrouter.ai/)'s [grok-4-fast](https://openrouter.ai/x-ai/grok-4-fast:free). Regarding the call limits of this model, I am not yet sure if they are the same as other free models on `OpenRouter`. I have used it to integrate with `Claude Code` for some small projects and have not encountered frequency restrictions.

> It should be noted that with this free model, data may be used for training. The original text on OpenRouter states: "Prompts and completions may be used by xAI or OpenRouter to improve future models."

> Since I primarily use `Gemini CLI` and `Qwen Code`, I don't use this model much. Users need to test it themselves.

### 📝 OpenRouter

#### Account Registration - Primary Account

1. Visit the [OpenRouter](https://openrouter.ai/) official website and click the "Sign in" button in the top right corner.
2. You can choose to log in with a Github account, Google account, or MetaMask wallet, or click [Sign up](https://openrouter.ai/CLERK-ROUTER/VIRTUAL/sign-up) at the bottom of the dialog box to register a new account directly.
3. After logging in/registering, hover over your avatar to display a dropdown menu and select [Keys](https://openrouter.ai/settings/keys).
4. Click the `Create API Key` button to start creating an API key.
5. In the pop-up dialog box, name the API key (fill in the `Name` field, e.g., "grok Key"), then click `Create`. Since we aim to use the free model, the "Credit limit (optional)" field can be left blank.
6. After successful creation, the system will display the API key. Please copy and save it immediately, as the key will only be displayed once.

At this point, the OpenRouter account and API key are ready.

#### ⚙️ Configure Model

1. Please install [Chatspeed](https://chatspeed.aidyou.ai) first according to the [Installation Guide](../../guide/installation.md).
2. Refer to [Adding Models](../../guide/quickStart.html#添加模型) to add OpenRouter's `grok-4-fast:free` model to Chatspeed. The general steps are:
   - Click the `Chatspeed` menu button in the top right corner and select `AI Engine`.
   - Click the `+` in the top right corner, enter `openrouter` in the search box of the pop-up page, and then click `Import from preset`.
   - `Basic Information`
     - Other information on the interface usually does not need to be modified; just fill in the API key you copied earlier into the `API Key` field.
     - `Proxy Type`: If you cannot access the `vercel` website, you must use a proxy. If you have already set up a proxy in your "Network Settings", you can choose "Follow Network Settings", or you can set up an "HTTP Proxy" separately here.
   - Click `Model Information` to enter the model configuration, select `Import Model`, search for `grok-4` in the search box, and then select `x-ai/grok-4-fast:free` and save.
   - Click `Save`, and the model addition is complete.

At this point, the grok-4-fast:free model on the OpenRouter platform has been added.

### 📝 Vercel AI Gateway

#### Account Registration - Alternative Account

> I registered and tested it, then found that a credit card needs to be bound, so I didn't test the subsequent steps. If you have a credit card, you can try it. The following error will occur if a credit card is not bound:
> customer_verification_required: AI Gateway requires a valid credit card on file to service requests. Please visit https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card to add a card and unlock your free credits.

1. Visit the [Vercel](https://vercel.com/) official website and click the "Sign Up" button in the top right corner to register an account.
2. You can choose to register with an email address or log in via Google, GitHub, GitLab, Bitbucket, or other third-party accounts.
3. After registration, log in to Vercel, click your avatar, then select `Dashboard` from the dropdown menu, and then find "AI Gateway" in the top navigation bar and click to enter.
4. On the AI Gateway page, click "API Keys" in the left sidebar.
5. Click the "Create Key" button to create a new API key.
6. In the pop-up dialog box, name the API key (e.g., "dev"), then click Create.
7. After successful creation, the system will display the API key. Please copy and save it immediately, as the key will only be displayed once.
8. Bind credit card: In the top menu, select "Settings", then go to the "Billing" option in the left menu, find "Payment Method" on the page and click to enter, then click "Add Card" and follow the prompts to complete credit card binding.
   At this point, the Vercel AI Gateway account and API key are ready.

### ⚙️ Configure Vercel AI Gateway Model

1. Similarly, configure the Vercel AI Gateway model in [Chatspeed](https://chatspeed.aidyou.ai).
2. Refer to [Adding Models](../../guide/quickStart.html#添加模型) to add the `Vercel AI Gateway` model to Chatspeed. The general steps are:
   - Click the `Chatspeed` menu button in the top right corner and select `AI Engine`.
   - Click the `+` in the top right corner, enter `vercel` in the search box of the pop-up page, and then click `+Manually Add`.
   - `Basic Information` needs to be filled in:
     - `API Protocol`: Select `OpenAI`.
     - `Request Address`: `https://ai-gateway.vercel.sh/v1`.
     - `API Key`: Fill in the Vercel AI Gateway API key you copied earlier.
     - `Proxy Type`: If you cannot access the `vercel` website, you must use a proxy. If you have already set up a proxy in your "Network Settings", you can choose "Follow Network Settings", or you can set up an "HTTP Proxy" separately here.
   - Click `Model Information` to enter the model configuration, select `Import Model`.
     - Search for `grok-4` in the search box, and then select `xai/grok-4-fast-non-reasoning` (the reasoning model is slower, I personally prefer non-reasoning models; if you like, you can also choose `xai/grok-4-fast-reasoning`).
     - Click "Save".
   - Click `Save`, and the model addition is complete.

### 🔄 Configure Proxy Model

For proxy model configuration, you can refer to the [CCProxy Configuration Guide](../../ccproxy/configuration.md) and configure it step by step:

- `Proxy Group`: You can add a separate proxy group, for example, named `grok`.
- `Proxy Service`: Both `claude-3-5-haiku-20241022` and `claude-sonnet-4-20250514` can select the `x-ai/grok-4-fast:free` model added above. If you have registered a `Vercel` account and bound a credit card, you can also select the `xai/grok-4-fast-non-reasoning` model from `Vercel`. This can achieve load balancing, increase call frequency, and reduce the probability of `429` errors.
- `Proxy Key`: You can create a separate `ClaudeCode` dedicated key, or use your previous keys, depending on your preference.

### 🔌 Integrate `Claude Code`

To integrate the above proxy model with Claude Code, you can refer to the [Claude Code Integration Guide](../../ccproxy/claude-code.md).

Now you can happily use `Claude Code` for free! 😄
