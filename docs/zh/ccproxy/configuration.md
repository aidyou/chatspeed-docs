---
title: CCProxy 配置指南
description: 本指南详细介绍了 Chatspeed 的 CCProxy 模块配置，涵盖代理分组、代理管理和密钥管理，帮助您优化 Claude Code 的使用。
keywords: CCProxy, 配置指南, Chatspeed, 代理分组, 代理管理, 密钥管理, Claude Code, 模型配置, AI 代理
---

# CCProxy 配置指南

在开始本章节之前，请根据[安装指南](../guide/installation.md)安装好 [Chatspeed](https://chatspeed.aidyou.ai)。

## 🧩 代理分组

代理分组可以让用户根据使用场景隔离不同的模型访问能力，也可以用于根据场景快速切换 `Claude Code`。

#### 分组管理

1.  按数字标注的顺序依次点击 `Chatspeed` 主窗口右上角的下拉菜单，选择“代理”。

    ![代理管理菜单入口](/images/zh/proxy-group-1.png)

2.  进入代理设置页面后，按数字标注顺序点击“代理分组”切换到代理分组管理，然后点击“+”添加分组。

    ![代理分组管理](/images/zh/proxy-group-2.png)

3.  本例以 `qwen` 分组为例，按图中填写并保存。

    ![添加代理分组](/images/zh/proxy-group-3.png)

    **其中**：
    - **提示词注入**：选择**增强**。
    - **提示词文本**：可以输入您需要的提示词增强（下文会提供示例）。
    - **工具过滤**：输入 `WebFetch` 和 `WebSearch`，一行一个。由于我们使用的是外部模型，`Claude Code` 的内部工具 `WebFetch` 和 `WebSearch` 无法使用，因此需要过滤掉。`Chatspeed` 内置了 `WebFetch` 和 `WebSearch` 两个工具，你可以将它们通过 `MCP` 将添加到 `Claude Code`，添加 MCP 请参考[MCP 代理](../mcp/)。
    - **温度比例**：请根据不同模型的最佳温度来设置。`Claude Code` 生成代码时使用的温度是 `1.0`，而根据 `qwen3-code` 的官方文档，其最佳温度是 `0.7`，所以比例应设为 `0.7`。

**Claude Code** 提示词增强：我们在[提示词](../prompt/)提供了一些提示词，您可以参考使用。

#### 分组切换

您可以依据上面的步骤依次添加 kimi 组、gemini 组等。不同分组的模型访问通过 `/{group_name}/` 前缀即可，具体的访问规则请参考 [API 文档](../api/)。

### 🔀 代理管理

完成分组管理后，我们现在可以根据需要将不同的代理添加到相应分组中。本例以 `Claude Code` 使用场景为例，演示如何添加代理模型。

> 在开始本章节之前，您必须先添加一些模型。具体可以参考[快速开始](../guide/quickStart.md)的**添加模型**章节。

#### 代理设置

1.  按数字标注的顺序依次点击 `Chatspeed` 主窗口右上角的下拉菜单，选择“代理”。

    ![代理管理菜单入口](/images/zh/proxy-group-1.png)

2.  在代理管理页面依次按数字标注点击**代理服务**、**+**。

    ![代理管理页面](/images/zh/proxy-setting-1.png)

3.  按下图标注分别填写并保存，其中：
    - **分组**：本例以配置 `qwen3-coder` 作为 `Claude Code` 的备用模型，所以选择 `qwen`。
    - **代理别名**：我们使用 `sonnet` 系列作为 `Claude Code` 编程的主模型，因此这里填写 `claude-sonnet-*`。
    - **模型**：搜索 `qwen`，然后将所有 `qwen3-coder` 或相关的模型选中。

      > 注：你可以如图中示例，选择多个不同的供应商相同（也可以不同）的模型，`CCProxy` 会通过供应商均衡轮换来提高模型调用频率，减小 `429` 错误风险

      > **通配符**：在配置代理时，模型别名支持在任意位置使用通配符。其中 `*` 可以匹配零个或者多个任意字符，例如 `claude-sonnet-*` 可以匹配 `claude-sonnet-4-5-20250929`。而 `?` 可以匹配单个任意字符，例如 `model-v1.?` 可以匹配 `model-v1.0` 或 `model-v1.5`。

      > 示例中的代理别名我们使用了通配符 `claude-sonnet-*`，这样可以避免未来 `Claude Code` 升级使用不同模型导致我们配置的模型不可用。在启动 `Claude` 时通过 `--model sonnet` 参数即可使用 `sonnet` 系列。如果您更喜欢 `opus` 这个名字，可以使用 `claude-opus-*` 然后在启动时用 `claude --model opus` 即可，不过这个其实无关紧要，因为真正执行任务的模型都是其所指向的（本例中是`qwen3-coder`）。

      > `Claude code` 快速切换分组并进入可以参考[Claude Code 接入指南](claude-code.md)

    ![添加代理](/images/zh/proxy-setting-2.png)

4.  请按步骤 3 再次添加一个 `claude-3-*` 代理，这个是目前 `Claude Code` 执行简单任务（比如用于生成会话主题）的模型。

    ![添加代理](/images/zh/proxy-setting-3.png)

5.  至此，我们已经具备了 `Claude Code` 代理的基本条件。

    ![代理列表](/images/zh/proxy-setting-4.png)

### 🔑 密钥管理

代理密钥用于访问代理模型，它独立于 AI 供应商提供的密钥，可以有效保护您的数据安全。您可以配置多个密钥以用于不同的场景。

#### 密钥管理

1.  按数字标注的顺序依次点击 Chatspeed 主窗口右上角的下拉菜单，选择“代理”。

    ![代理管理菜单入口](/images/zh/proxy-group-1.png)

2.  按数字标注，切换到密钥管理，然后点击 " + "，在 **密钥名称** 中输入 `ClaudeCode`，然后点击保存。密钥的名称可以是您喜欢的任意字符串。

    ![密钥管理页面](/images/zh/proxy-key-1.png)

3.  您可以根据自己的使用场景添加多个密钥。例如，可以为 `Claude Code`、`Cline`、`Roo Code`、`Zed` 和开发测试（`dev`）分别添加密钥。文档中的一些示例密钥（如 `dev`）通常可以安全地用于测试环境。

    ![密钥管理页面](/images/zh/proxy-key-2.png)

### ✍️ 提示词工程

目前 `Qwen Code` 每天有 2000 次免费调用额度，`Gemini CLI` 也有充足的免费额度（经测试 `gemini-2.5-pro` 每天约有 50 次免费额度，用完后会自动切换为 `gemini-2.5-flash`）。因此，在预算有限的情况下，使用它们基本能满足大部分编程场景。当您希望体验`Claude Code`且预算有限时，使用各渠道的免费模型组成一个代理池，会是一个非常不错的选择。

但是，免费模型也存在一些限制，包括调用次数限制、频率限制、适配度问题等。调用次数和频率可以通过多账户、多密钥的方式解决。本文主要介绍适配性问题。

可以确定的是，`Claude Code` 中使用的 `Claude` 模型是经过专门适配的，其表现非常优秀，特别是工具调用出错的概率很低，工作流运行也十分流畅。

而要将外部未经特别训练的模型用于 `Claude Code`，该模型至少**需具备**良好的工具调用能力和指令遵循能力。在此基础上，我们可以通过提示词增强来优化其在 `Claude Code` 中的表现。

下面的提示词增强是在 `Claude Code` 系统提示词的基础上追加的，它试图通过用法示例和引导来让模型更好地执行任务。由于提示词内容较多，您可以从这里参考[提示词](../prompt/)。

### 🎛️ 参数调优

从 `Claude Code` 发送的请求来看，目前主要通过温度参数进行调优，而 `top_k`、`top_p` 等参数则未作设置。各模型的最佳温度建议参考其官方文档。据了解，`qwen3-coder` 的最佳温度是 0.7，而 `kimi-k2` 的最佳温度是 0.6。其他模型请参考您所使用的模型的官方文档。

### 🔌 接入 `Claude Code`

接入 `Claude Code` 您可以参考[Claude Code 接入指南](claude-code.md)
