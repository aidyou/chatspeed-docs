# API 简介

Chatspeed `CCProxy` 模块为方便各类客户端调用，提供了灵活且强大的 API 访问规则。本节将详细说明这些规则，帮助您理解如何通过 `CCProxy` 访问和组合各种 AI 模型及工具。

### 核心概念

`CCProxy` 的 API 访问主要基于以下两个核心概念：

1.  **分组 (Group)**
    您可以为不同的客户端或使用场景设置独立的模型分组。通过在 API 路径中加入分组名称，可以方便地隔离不同客户端对模型的访问能力，并根据需求快速切换模型。
    *   **示例**：如果您的分组名称是 `gemini`，要访问 Claude 协议的聊天接口，可以通过 `/gemini/v1/messages` 访问。

2.  **工具调用兼容模式 (Tool Compatibility Mode)**
    对于本身不支持工具调用（Function Calling）的模型，`CCProxy` 提供了工具兼容模式，使其也能获得并执行工具调用能力。启用工具兼容模式只需在 API 入口端点前加上 `compat_mode`。
    *   **示例**：`/gemini/compat_mode/v1/messages`


### API 访问入口

以下是 `CCProxy` 提供的各类 API 基础入口：

*   `/sse`：MCP 代理入口 (Server-Sent Events)
*   `/v1/models`：OpenAI 兼容接口和 Claude 格式的模型列表接口
*   `/v1/chat/completions`：OpenAI 兼容接口的聊天入口
*   `/v1/messages`：Claude 原生协议的消息接口
*   `/v1beta/models`：Gemini 聊天的模型列表接口
*   `/v1beta/models/{model}/generateContent`：Gemini 聊天的同步访问接口
*   `/v1beta/models/{model}/streamGenerateContent`：Gemini 聊天的流式访问接口
*   `/api/tags`：Ollama 协议的模型列表接口
*   `/api/chat`：Ollama 协议的聊天接口
*   `/api/show`：Ollama 协议的模型详情接口

### 组合式 API 访问

通过结合**分组**和**工具兼容模式**，您可以构建更灵活的 API 访问路径。具体组合方式请参考下方的 API 列表。

## API列表

| 接口类型 | 协议   | 分组    | 兼容格式 | API地址                                                              | 备注                                                                         |
| -------- | ------ | ------- | -------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| MCP      | SSE    |         | false    | /sse                                                                 |                                                                              |
| Chat     | Openai |         | false    | /v1/chat/completions                                                 |                                                                              |
| Chat     | Openai | {group} | false    | /{group}/v1/chat/completions                                         | 将 {group} 替换为分组名称                                                    |
| Chat     | Openai | {group} | true     | /{group}/compat_mode/v1/chat/completions                             | 将 {group} 替换为分组名称                                                    |
| Chat     | Openai |         | true     | /compat_mode/v1/chat/completions                                     |                                                                              |
| Chat     | Claude |         | false    | /v1/messages                                                         |                                                                              |
| Chat     | Claude | {group} | false    | /{group}/v1/messages                                                 | 将 {group} 替换为分组名称                                                    |
| Chat     | Claude | {group} | true     | /{group}/compat_mode/v1/messages                                     | 将 {group} 替换为分组名称                                                    |
| Chat     | Claude |         | true     | /compat_mode/v1/messages                                             |                                                                              |
| Chat     | Gemini |         | false    | /v1beta/models/{model}/generateContent?key={key}                     | 将 {model} 替换为模型名称，将 {key} 替换为API Key                            |
| Chat     | Gemini | {group} | false    | /{group}/v1beta/models/{model}/generateContent?key={key}             | 将 {group} 替换为分组名称，将 {model} 替换为模型名称，将 {key} 替换为API Key |
| Chat     | Gemini | {group} | true     | /{group}/compat_mode/v1beta/models/{model}/generateContent?key={key} | 将 {group} 替换为分组名称，将 {model} 替换为模型名称，将 {key} 替换为API Key |
| Chat     | Gemini |         | true     | /compat_mode/v1beta/models/{model}/generateContent?key={key}         | 将 {model} 替换为模型名称，将 {key} 替换为API Key                            |
| Chat     | Ollama |         | false    | /api/chat                                                            |                                                                              |
| Chat     | Ollama | {group} | false    | /{group}/api/chat                                                    | 将 {group} 替换为分组名称                                                    |
| Chat     | Ollama | {group} | true     | /{group}/compat_mode/api/chat                                        | 将 {group} 替换为分组名称                                                    |
| Chat     | Ollama |         | true     | /compat_mode/api/chat                                                |                                                                              |
| List     | Openai |         |          | /v1/models                                                           | 支持分组和兼容模式                                                           |
| List     | Calude |         |          | /v1/models                                                           | 支持分组和兼容模式                                                           |
| List     | Gemini |         |          | /v1beta/models                                                       | 支持分组和兼容模式                                                           |
| List     | Ollama |         |          | /api/tags                                                            | 支持分组和兼容模式                                                           |
