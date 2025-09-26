---
title: Using Claude Code for Free - Integrating ModelScope's qwen3-coder
date: 2025-09-07
category:
  - Low-Cost Programming
tag:
  - Claude Code
  - Free
  - qwen3-coder
description: This guide shows how to use Claude Code for free by connecting to ModelScope's qwen3-coder model via Chatspeed's CCProxy module, enabling arbitrary protocol conversion.
keywords: Claude Code, Free, qwen3-coder, ModelScope, CCProxy, Chatspeed, protocol conversion, low-cost programming
---

## Before You Start

This is the first post in the "Using Claude Code for Free" blog series. It will show you how to use Claude Code for free by connecting to ModelScope''s `qwen3-coder` model.

Before you begin, you must install [Chatspeed](https://github.com/aidyou/chatspeed/releases). Chatspeed''s proxy module [CCProxy](../../ccproxy/) enables arbitrary conversion between OpenAI-compatible formats and the native protocols of Claude, Gemini, and Ollama, making it a key tool for achieving the goal of this article. For Chatspeed installation, please refer to the [Installation Guide](../../guide/installation.md).

## Using Claude Code for Free

### Platform and Model

The model we''ve chosen to connect to Claude Code this time is [ModelScope](https://www.modelscope.cn/)''s `qwen3-coder`. As of now (2025-09-07), ModelScope provides 2,000 free calls per day for each registered account, which is more than enough for individual developers.

### ModelScope Account Application

| Step | Action | Key Instructions |
| :--- | :--- | :--- |
| **1. Visit the Official Website** | Open [https://www.modelscope.cn](https://www.modelscope.cn) in your browser. | This is the official ModelScope website. Non-Chinese users can switch to the English interface. |
| **2. Register an Account** | Click the **"Login/Register"** button in the top-right corner and follow the prompts to complete registration (e.g., with a phone number and verification code). | Registration with a phone number is recommended, which requires SMS verification. |
| **3. Bind Alibaba Cloud Account** | After registering and logging in, the system will usually prompt you to **bind your Alibaba Cloud account**. Follow the instructions to complete the authorization. | **This step is very important!** Failure to bind your Alibaba Cloud account will result in errors like "Please bind your Alibaba Cloud account before use." when trying to get an API Key or make API calls. |
| **4. Get API Key** | After logging in, click your **avatar** in the top-right corner and go to **"Account Settings"**. | This is where you manage your keys. |
| 4.1 | In the sidebar of your personal center, find and click **"Access Token"**. | The interface description may vary slightly over time. |
| 4.2 | On the API key management page, click **"Create New Access Token"**. | The system will generate a new key for you. |
| 4.3 | Set an easy-to-remember **name** for the key (e.g., for_chatspeed_project). | A memorable name helps with managing multiple keys later. |
| 4.4 | **Copy and securely save the key generated for you by the system.** | **Key security is crucial**; do not disclose it to others. |

#### ⚠️ Important Notes

1.  **Alibaba Cloud Account Binding**: This is a **prerequisite** for successfully using many ModelScope features (including getting API Keys and making API calls). Please be sure to complete it.
2.  **Free Quota**: ModelScope offers new users a quota of **2,000 free calls per day**, which is very generous for personal experimentation and development testing. You can check your quota usage in your personal center or on related pages.

### Connecting qwen3-coder to Claude Code

#### 1. Add qwen3-coder to Chatspeed

##### 1.1 As shown below, open the model management interface:

![Model Management](/images/en/setting-add-model-1.png)

##### 1.2 Click the "Add Model" button:

![Add Model](/images/en/setting-add-model-2.png)

##### 1.3 Import from presets:

![Import from Presets](/images/blog/en/qwen3-code-add-1.png)

##### 1.4 Enter the key in the position marked with the number 1:

![Enter Key](/images/blog/en/qwen3-code-add-2.png)

##### 1.5 Click in the order of the numbers 1 and 2 to import the model, search for qwen3-coder, and then select the model marked with the number 3:

![Import Model](/images/blog/en/qwen3-code-add-3.png)

#### 2. Create Proxy Group

##### 2.1 As shown below, go to the "Proxy" settings interface:

![Proxy Group Menu](/images/en/proxy-group-1.png)

##### 2.2 Click in numerical order to enter the "Add Proxy Group" interface:

![Add Proxy Group](/images/en/proxy-group-2.png)

##### 2.3 Fill in the proxy group name and description. The prompt can be copied from [Enhanced Prompt for Claude Code](../../prompt/claude-code-prompt-enhance.md).

![Edit Proxy Group Info](/images/en/proxy-group-3.png)

#### 3. Set Up Claude Code Proxy Models

Claude Code currently uses 3 models, with the following roles:

- `claude-3-5-haiku-20241022`: Usually used for simple tasks, like generating conversation topics.
- `claude-sonnet-4-20250514`: As of now, most programming tasks in Claude Code are completed by this model.
- `claude-opus-4-1-20250805`: It''s not yet clear what this one does, but I''ve encountered prompts saying this model is missing, so it''s best to set it up.

##### 3.1 Click in the order of the numbers to open the add proxy interface:

![Add Proxy Settings](/images/en/proxy-setting-1.png)

##### 3.2 Fill in the information for `claude-3-5-haiku-20241022` as marked by the numbers:

![Add Proxy for Haiku](/images/blog/en/qwen3-code-add-4.png)

##### 3.2 Fill in the information for `claude-opus-4-1-20250805` as marked by the numbers:

![Add Proxy for Opus](/images/blog/en/qwen3-code-add-5.png)

> In the figure, we have additionally checked the `qwen3-coder` model from `openrouter` for the proxy target. When you select multiple models for the same target, the `CCProxy` module will perform load balancing rotation among them for each request.

##### 3.2 Follow the steps above to add the settings for `claude-sonnet-4-20250514` to complete the setup.

#### 4. Set Up Proxy Key

As shown below, add a dedicated key.

![Add Proxy Key](/images/en/proxy-key-1.png)

##### 4.1 Connect to Claude Code

Two methods are provided below to connect to Claude Code:

1.  **Direct Connection**

    Since ModelScope''s `qwen3-coder` model has good support for tool calls, you can connect it directly without needing to enable tool compatibility mode. The connection method is simple; just execute the following commands:

    ```sh
    export ANTHROPIC_BASE_URL="http://127.0.0.1:11434/qwen"
    export ANTHROPIC_AUTH_TOKEN="{You-Proxy-Token}"

    # Now, running claude will connect to the models we set up above via the CCProxy module
    claude
    ```

    Note: The key in the command needs to be copied from the location shown in the figure below:

    ![Copy Proxy Key](/images/en/proxy-key-3.png)

2.  **Enable Tool Compatibility Mode**

    If you have selected the same (or different) models from multiple providers, and some models do not support native tool calls, you can enable tool compatibility mode to ensure that all models can use tool calls. Enabling it is simple: just add `/compat_mode` to the end of the URL.

    Use the following commands to enable `CCProxy`''s tool compatibility mode to connect to Claude Code:

    ```sh
    export ANTHROPIC_BASE_URL="http://127.0.0.1:11434/qwen/compat_mode"
    export ANTHROPIC_AUTH_TOKEN="{You-Proxy-Token}"

    # Now, running claude will connect to the models we set up above via the CCProxy module
    claude
    ```

    After launching, you will typically see an interface like the one below:

    ```shell
    > claude
    ╭───────────────────────────────────────────────────╮
    │ ✻ Welcome to Claude Code!                         │
    │                                                   │
    │   /help for help, /status for your current setup  │
    │                                                   │
    │   cwd: /path/to/you/project                       │
    │                                                   │
    │   ─────────────────────────────────────────────── │
    │                                                   │
    │   Overrides (via env):                            │
    │                                                   │
    │   • API Base URL:                                 │
    │   http://127.0.0.1:11434/qwen/compat_mode         │
    ╰───────────────────────────────────────────────────╯
    ```
