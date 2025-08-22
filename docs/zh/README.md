---
home: true
icon: home
heroImage: /images/claude.gif
heroText: Chatspeed
tagline: Any Claude Code, Any Gemini CLI | 万物皆可 Claude，万物皆可 Gemini
actions:
  - text: 开始使用 →
    link: /zh/guide/
    type: primary
features:
  - title: 🔄 多协议代理转换
    details: 在 OpenAI、Claude、Gemini、Ollama 等协议间无缝转换，让任何 AI 模型都能快速集成到Claude Code、Gemini Cli、Cursor、Cline、Roo Code 等开发环境中。
  - title: 🎯 万物皆可 Claude Code
    details: 将 OpenRouter、Nvidia、魔塔等免费模型，Qwen3-code，k2，GLM4.5等高性价比模型接入 Claude Code，开发成本降低 80% 以上。
  - title: 🌐 万物皆可 Gemini CLI
    details: 不仅是 Claude Code，Gemini CLI 同样能接入任何模型。无论是 Claude、ChatGPT，还是各类免费、开源模型，均可接入 Gemini CLI。
  - title: 🔗 统一 MCP 代理
    details: 将所有 MCP（模型上下文协议）聚合为统一代理入口，解决在不同 IDE 间重复配置工具的痛点。
  - title: 🎛️ 智能分组管理
    details: 创建不同的 AI 代理分组，通过 /kimi、/qwen 等端点一键切换模型，灵活高效。
  - title: ⚙️ 高级提示词工程
    details: 每个代理分组支持独立的提示词注入、修改、替换，并可调节温度比例，用于适配开发环境，提高模型性能。
footer: MIT 协议 | 版权所有 © 2025 Chatspeed 团队
---

## 🚀 万能 AI 代理 `ccproxy`

`ccproxy` (`Chat Completion Proxy`) 是 Chatspeed 的核心代理引擎，一个为 AI 开发设计的万能适配器。它主要解决两大痛点：

### 1. 协议转换，降本增效
它能在 OpenAI 兼容格式、Gemini、Claude、Ollama 等协议间任意转换。这意味着，你可以将任何本地或云端的免费、开源、高性价比模型，无缝接入 `Claude Code`、`Gemini CLI` 等任何需要特定协议的流行开发环境中。

**✨ 特别功能：工具调用兼容模式**

对于本身不支持工具调用（Function Calling）的模型，`ccproxy` 提供了兼容模式，使其也能理解并执行工具调用指令，极大地扩展了这些模型的能力边界。

### 2. 统一入口，简化工作流
它能将所有安装在 Chatspeed 上的 MCP 工具（如网页浏览、文件操作等）聚合成一个统一的代理入口对外服务。一次配置，所有应用和终端都能调用，彻底告别重复设置。

![MCP proxy](/images/zh/mcp-proxy.png)

> 你可以通过 `http://localhost:11434/sse` 访问 `ccproxy` 的 SSE 协议的 MCP

### 核心优势

- **🔀 协议无缝转换**: ccproxy可以在`Openai兼容格式`、`Gemini`、`Claude`、`Ollama`之间进行高效地转换，基本达到`万能`适配的效果
- **💰 极致成本控制**: 使用免费和高性价比模型，开发成本降低 80% 以上，让免费使用 Claude Code 成为可能
- **🔄 一次配置，处处可用**: 消除在多个 IDE 中重复配置 MCP 工具的繁琐
- **🎯 灵活的分组切换**: 通过不同的模型分组可以高效的在不同场景下使用 claude code
- **🔑 安全**: ccproxy 提供的代理密钥可以有效隔离客户端接触真实的密钥，确保你AI的账户安全
- **🚀 高效性能**: rust 实现的高效适配器

### 快速示例

```bash

# 使用 Claude Code 协议访问 kimi 分组下的模型列表, {proxy-key} 可以在软件设置中进行配置
curl  -H "x-api-key: {proxy-key}" http://127.0.0.1:11434/kimi/v1/models

# 使用 Gemini 协议访问 qwen 分组下的模型列表
curl http://127.0.0.1:11434/qwen/v1beta/models?key={proxy-key}

# 通过 ollama 协议访问代理中配置的`gemma3-12b`（代理别名）
curl http://localhost:11434/api/chat -d '{
  "model": "gemma3-12b",
  "messages": [
    {
      "role": "user",
      "content": "你是哪个家伙?"
    }
  ],
  "stream": true
}'


# 通过工具兼容模式访问 ollama 协议的聊天接口，其中`gemma3-12b`是软件中配置的“代理别名”
curl http://localhost:11434/compat_mode/api/chat -d '{
  "model": "gemma3-12b",
  "messages": [
    {
      "role": "user",
      "content": "what is the weather in tokyo?"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get the weather in a given city",
        "parameters": {
          "type": "object",
          "properties": {
            "city": {
              "type": "string",
              "description": "The city to get the weather for"
            }
          },
          "required": ["city"]
        }
      }
    }
  ],
  "stream": true
}'

# 通过 claude 协议访问大理服务器的聊天接口，并且开启了工具兼容模式
# 其中：代理密钥和代理别名都是软件中配置的，示例中的是我本机测试，无法直接运行
curl http://localhost:11434/compat_mode/v1/messages \
  -H "x-api-key: cs-TosCz7A29R74yNnShYQKskxXPx9OSYd1RMQV5YzVdHvqL7ehNNoOhCVg7UTp6" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "gemma3-12b",
  "messages": [{"role": "user", "content": "帮我获取下北京的天气"}],
  "tools": [
    {
      "name": "get_weather",
      "description": "Get weather information",
      "input_schema": {
        "type": "object",
        "properties": {
          "location": {"type": "string"}
        }
      }
    }
  ],
  "max_tokens": 1024,
  "stream": true
}'

# 通过工具兼容模式和 openai 兼容协议访问代理服务器的聊天接口
# 测试时注意修改模型id 为软件配置中的代理别名，密钥改为自己配置的
curl http://localhost:11434/compat_mode/v1/chat/completions \
  -H "Authorization: Bearer cs-TosCz7A29R74yNnShYQKskxXPx9OSYd1RMQV5YzVdHvqL7ehNNoOhCVg7UTp6" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "gemma3-12b",
  "messages": [{"role": "user", "content": "帮我查下杭州有啥好玩的"}],
  "tools": [{
    "type": "function",
    "function": {
      "name": "search_web",
      "description": "Search the web",
      "parameters": {"type": "object", "properties": {"query": {"type": "string"}}}}
  }],
  "stream": true
}'

# 通过 gemini 协议，在工具兼容模式下访问代理服务器的聊天接口
curl http://localhost:11434/compat_mode/v1beta/models/gemma3-12b:streamGenerateContent?alt=sse&key=cs-TosCz7A29R74yNnShYQKskxXPx9OSYd1RMQV5YzVdHvqL7ehNNoOhCVg7UTp6 \
  -H "Content-Type: application/json" -d '{
  "contents": [
    {
      "role": "user",
      "parts": [{"text": "What is the price of GOOG stock?"}]
    }
  ],
  "tools": [
    {
      "functionDeclarations": [
        {
          "name": "get_stock_price",
          "description": "Get the latest price of a stock",
          "parameters": {
            "type": "OBJECT",
            "properties": {
              "symbol": {
                "type": "STRING",
                "description": "The stock ticker symbol"
              }
            },
            "required": ["symbol"]
          }
        }
      ]
    }
  ]
}'
```

## 🌟 Chatspeed 的独特之处

Chatspeed 不仅仅是 **AI 代理和 MCP 管理平台**，更是一个 **全面的** AI 助手：

1. **翻译**: Chatspeed 内置翻译支持，自动识别您输入的语言并翻译为另外的，能力边界在于模型本身
2. **脑图制作**: 如果你有任何想法，可以跟 ai 一起制作脑图，当然了他也可以自动帮你生成
3. **流程图**: 让 ai 快速让你制作流程图
4. **日常对话**: Chatspeed 可以作为常驻桌面的 AI 伙伴，随时响应您的日常问询与工作指令。。
5. **智记**: 在 AI 聊天过程中的精华内容，你可以非常方便地收录到“智记”中。
6. 其他还有许多工等待您自己发掘，比如：你可以通过“技能”配置选项来拓展 AI 的能力。

下面是两张示例图

![assistant](/images/zh/assistant.png)
![chat](/images/zh/chat.png)

## 📖 文档结构

- **[快速开始](/zh/guide/)** - 安装、配置和快速入门
- **[ccproxy 模块](/zh/ccproxy/)** - 详细的 ccproxy 设置和使用
- **[MCP 集成](/zh/mcp/)** - 模型上下文协议代理配置
- **[API 参考](/zh/api/)** - 完整的 API 文档

## 🤝 社区与支持

- 🐛 [报告问题](https://github.com/aidyou/chatspeed/issues)
- 💬 [参与讨论](https://github.com/aidyou/chatspeed/discussions)
- 📚 [贡献指南](/zh/guide/contributing)
- 🌟 [GitHub 点星](https://github.com/aidyou/chatspeed)

---

**准备好革命性地改变你的 AI 开发工作流程了吗？** [立即开始](/zh/guide/) 体验统一 AI 代理管理的强大力量！
