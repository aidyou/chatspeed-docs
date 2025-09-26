---
title: Roo Code Integration Guide
description: This guide explains how to configure Chatspeed's CCProxy proxy models in Roo Code, an excellent VS Code AI plugin. It covers prerequisites and configuration steps, using gemini2.5-pro as an example.
keywords: Roo Code, Integration Guide, CCProxy, Chatspeed, VS Code, AI plugin, proxy models, configuration, gemini2.5-pro
---
# `Roo Code` Integration Guide

[Roo Code](https://github.com/RooCodeInc/Roo-Code) is a fork of [Cline](https://github.com/cline/cline) and an excellent `VS Code` **AI plugin**. It efficiently handles tedious tasks, such as filling in missing `i18n` language items for `Chatspeed` or performing information verification by installing necessary `MCP` tools.

The following explains how to configure `CCProxy`'s proxy models in `Roo Code`, using the addition of `gemini2.5-pro` as an example.

## 📋 Prerequisites

Before you begin, ensure you have completed the following steps:

1. Installed [Chatspeed](../guide/installation.md)
2. Added the necessary models according to the [Quick Start](../guide/quickStart.md)
3. Completed the [CCProxy Basic Configuration](configuration.md)
4. Added the required proxy models
5. Configured the proxy keys

> For the `Roo Code` plugin, the model is specified by the user, so configuring a **Proxy Group** is not a necessary condition.

## ⚙️ Configuring `Roo Code`

1.  Open the Roo Code model settings in the order indicated by the numbers in the image, enter `gemini2.5-pro`, and then click `Create Profile` to save.

    ![Create Roo Code Model Profile](/images/common/roo-code-setting-1.png)

2.  Click in the order indicated by the numbers, enter the relevant information, and then click the `Save` button marked as **number 6** to save the information.
    - **API Provider**: Select `OpenAI Compatible`.
    - **Base URL**: Enter `http://127.0.0.1:11434/v1`.
    - **API Key**: Copy the proxy key from the CCProxy settings interface and paste it here.
    - **Model**: Select `gemini2.5-pro`.
    - `gemini2.5-pro` supports image input and tool calling, so you can check the corresponding options or ignore them.

    ![Configure Roo Code Model](/images/common/roo-code-setting-2.png)

3.  Roo Code supports creating multiple models. You can add other models by repeating the first and second steps. Finally, return to the `Roo Code` plugin's main interface to start using it.

    ![Using CCProxy in Roo Code](/images/common/roo-code-setting-3.png)
