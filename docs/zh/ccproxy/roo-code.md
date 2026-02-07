---
title: Roo Code 接入指南
description: 本指南介绍如何在 Roo Code 中配置 Chatspeed 的 CCProxy 代理模型。Roo Code 是一款优秀的 VS Code AI 插件，能高效处理繁琐任务。内容以添加 gemini2.5-pro 为例，涵盖前置条件和配置步骤。
keywords: Roo Code, 接入指南, CCProxy, Chatspeed, VS Code, AI 插件, 代理模型, 配置, gemini2.5-pro
---
# `Roo Code` 接入指南

[Roo Code](https://github.com/RooCodeInc/Roo-Code) 是 [Cline](https://github.com/cline/cline) 的一个分支，是一款优秀的 `VS Code` **AI 插件**。它能高效处理繁琐任务，例如为 `Chatspeed` 补充缺失的 `i18n` 语言项，或通过安装必要的 `MCP` 工具进行信息校对。

下面主要讲解如何在 `Roo Code` 中配置 `CCProxy` 的代理模型，下文以添加 `gemini2.5-pro` 为例。

## 📋 前置条件

在开始使用前，请确保已完成以下步骤：

1. 已安装 [Chatspeed](../guide/installation.md)
2. 根据[快速开始](../guide/quickStart.md)添加了必要的模型
3. 已完成[CCProxy 基础配置](configuration.md)
4. 已添加所需的代理模型
5. 已配置好代理密钥

> 对于 `Roo Code` 插件，模型是自己指定的，所以配置 **代理分组** 不是必要条件。

## ⚙️ 配置 `Roo Code`

1.  按下图数字标注的顺序打开 Roo Code 的模型设置，输入 `gemini2.5-pro` 然后点击 `Create Profile` 保存。

    ![创建 Roo Code 模型配置](/images/common/roo-code-setting-1.png)

2.  按下图数字标注的顺序点开，输入相关信息，然后点击**数字 6** 标注的 `Save` 按钮保存信息，其中：
    - **API Provider**：选择 `OpenAI Compatible`。
    - **Base URL**：输入`http://127.0.0.1:11435/v1`。
    - **API Key**：从 CCProxy 设置界面拷贝代理密钥并粘贴。
    - **Model**：选择 `gemini2.5-pro`。
    - `gemini2.5-pro` 支持图片输入和工具调用，可以将对应的选项打勾，也可以忽略。

    ![配置 Roo Code 模型](/images/common/roo-code-setting-2.png)

3.  Roo Code 支持创建多个模型，您只需重复第一步和第二步即可添加其他模型。最后返回 `Roo Code` 插件主界面，就可以开始使用了。

    ![在 Roo Code 中使用 CCProxy](/images/common/roo-code-setting-3.png)
