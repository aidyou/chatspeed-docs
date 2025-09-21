---
home: true
icon: home
heroImage: /images/claude.gif
heroText: Chatspeed
tagline: Forged in Rust, this open-source, high-performance AI assistant is your powerful programming companion and smart desktop hub
actions:
  - text: Get Started →
    link: /guide/
    type: primary
features:
  - title: 🔄 Multi-Protocol Conversion
    details: Seamlessly convert between OpenAI, Claude, Gemini, Ollama, and more. Integrate most AI models into your preferred development environment.
  - title: 🔀 Global Key Rotation
    details: Enable global, load-balanced rotation of multiple keys across multiple providers, creating a proxy pool to mitigate rate limits.
  - title: 🎯 Any Claude Code
    details: Integrate free or cost-effective models (e.g., OpenRouter, Kimi, Qwen, GLM) into Claude Code, slashing development costs by over 80%.
  - title: 💻 Any Gemini CLI
    details: Not just Claude, Gemini CLI can also integrate most models. Whether it's Claude 3 or various free/open-source models, they can all become part of your CLI workflow.
  - title: 🔗 Unified MCP Entry
    details: Aggregate all MCP (Model Context Protocol) tools into a unified proxy entry, eliminating the pain of repeatedly configuring tools across IDEs like VS Code and Cursor.
  - title: 🎛️ Smart Grouping & Routing
    details: Create different AI proxy groups and quickly switch models via endpoints (e.g., /kimi, /qwen) for flexible, efficient multi-scenario needs.
  - title: ⚙️ Advanced Prompt Engineering
    details: Each proxy group supports independent prompt injection and modification, with fine-tuned model parameters (e.g., temperature) to optimize performance in specific development environments.
  - title: 📚 More Than a Programming Tool
    details: Instantly summon the AI assistant (ALT+Z) for translation, mind maps, flowcharts, and brainstorming. Extend its capabilities limitlessly with custom "Skills".
footer: MIT Licensed | Copyright © 2025 Chatspeed Team
---

## 🌟 What can Chatspeed do?
- **💼 Multi-functional Desktop Assistant**: Use it for translation, creating mind maps, flowcharts, daily conversations, and more. Quickly summon it with the shortcut ALT+Z.
- **🔌 Connect Any Dev Tool**: Beyond just [Claude Code](./en/ccproxy/claude-code.md), you can connect your models to almost any major AI development tool, including [Gemini CLI](./en/ccproxy/gemini.md), [Cline](./en/ccproxy/cline.md), [Roo Code](./en/ccproxy/roo-code.md), and [Zed](./en/ccproxy/zed.md).
- **💰 Use Claude Code for Free**: As a best practice, we provide a detailed tutorial on how to [use Claude Code for free](./posts/claude-code-free/).
- **🚀 MCP Hub**: Chatspeed's MCP proxy can provide its own `WebSearch` and `WebFetch` tools, along with any `MCP` tools you've installed, to external clients via the `SSE` protocol. Learn how to [centrally manage MCP](./en/mcp/).

## 🚀 Universal AI Proxy `CCProxy`

`CCProxy` (`Chat Completion Proxy`) is Chatspeed's core proxy engine, a universal adapter designed for AI development. It primarily solves two major pain points:

### 1. Protocol Conversion for Cost-Efficiency
It enables arbitrary protocol conversion between OpenAI-compatible formats, Gemini, Claude, Ollama, and more. This means you can seamlessly integrate any local or cloud-based free, open-source, or cost-effective model into popular development environments like `Claude Code` and `Gemini CLI` that require specific protocols.

**✨ Special Feature: Tool Calling Compatibility Mode**

For models that do not natively support tool calling (Function Calling), `CCProxy` provides a compatibility mode, allowing them to understand and execute tool calling instructions, greatly expanding their capabilities.

### 2. Unified Entry Point for Streamlined Workflow
It aggregates all MCP tools (e.g., web browsing, file operations) installed on Chatspeed into a single, unified proxy entry point for external service. Configure once, and all applications and terminals can call them, completely eliminating repetitive setup.

![MCP proxy](/images/en/mcp-proxy.png)

> You can access `CCProxy`'s SSE protocol MCP via `http://localhost:11434/sse`

### Key Benefits

- **🔀 Seamless Protocol Conversion**: Efficiently convert between mainstream AI protocols, achieving a "universal" adaptation effect.
- **💰 Ultimate Cost Control**: Flexibly use free and cost-effective models, making "using Claude Code for free" a reality.
- **🔄 Configure Once, Use Everywhere**: Eliminate the tedious, repetitive configuration of MCP tools across multiple IDEs, boosting development efficiency.
- **🎯 Flexible Group Switching**: Efficiently use AI-assisted programming in different scenarios through various model groups.
- **🔑 Enhanced Security**: Use `CCProxy`'s proxy key to effectively isolate clients from real keys, ensuring your AI account security.
- **🚀 High Performance**: A high-performance adapter implemented in Rust, ensuring stability and reliability.

### Quick Examples

```bash
# Access the model list under the kimi group using the Claude Code protocol, {proxy-key} can be configured in the software settings
curl  -H "x-api-key: {proxy-key}" http://127.0.0.1:11434/kimi/v1/models

# Access the model list under the qwen group using the Gemini protocol
curl http://127.0.0.1:11434/qwen/v1beta/models?key={proxy-key}

# Access the 'gemma3-12b' model (proxy alias) configured in the proxy via the Ollama protocol
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


# Access the chat interface of the Ollama protocol via tool compatibility mode, where 'gemma3-12b' is the "proxy alias" configured in the software
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

# Access the chat interface of the Dali server via the Claude protocol, with tool compatibility mode enabled
# Note: The proxy key and proxy alias are configured in the software. The example here is for my local testing and cannot be run directly.
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

# Access the chat interface of the proxy server via tool compatibility mode and OpenAI compatible protocol
# When testing, remember to change the model ID to the proxy alias configured in the software, and the key to your own configured key.
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

# Access the chat interface of the proxy server via the Gemini protocol in tool compatibility mode
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
> For more `curl` examples, please refer to the [CCProxy Module](./en/ccproxy/) documentation.

## 🌟 More Than Just a Proxy: An All-in-One AI Assistant

Chatspeed is not only a powerful proxy platform but also a fully-featured, desktop-resident AI assistant that will transform your daily workflow.

1.  **Smart Conversation & Creation**: Engage in fluid conversations with any integrated model. Whether generating code, writing articles, or sparking creativity, it's your powerful partner.
2.  **AI-Assisted Diagramming**: Collaborate with AI to automatically generate and modify **mind maps** and **flowcharts**, helping you organize complex thoughts.
3.  **Multi-Language Translation**: Built-in powerful translation capabilities automatically detect your input language and translate it into your set target language.
4.  **Smart Notes Knowledge Base**: During AI chats, you can easily save valuable content (whether code blocks, diagrams, or text) to "Smart Notes," building your private knowledge base.
5.  **Extensible Skill System**: Beyond built-in features, you can create any new tools via the "Skills" system, continuously expanding the AI's capabilities.

Here are two example images:

![assistant](/images/en/assistant.png)

![chat](/images/en/chat.png)

## 📖 Documentation Structure

- **[Getting Started](/en/guide/)** - Installation, configuration, and quick start
- **[CCProxy Module](/en/ccproxy/)** - Detailed CCProxy setup and usage
- **[MCP Integration](/en/mcp/)** - Model Context Protocol proxy configuration
- **[API Reference](/en/api/)** - Complete API documentation

## 🤝 Community & Support

- 🐛 [Report Issues](https://github.com/aidyou/chatspeed/issues)
- 💬 [Join Discussions](https://github.com/aidyou/chatspeed/discussions)
- 🌟 [Star on GitHub](https://github.com/aidyou/chatspeed)

---

**Ready to revolutionize your AI development workflow?** [Get started now](/en/guide/) and experience the power of unified AI proxy management!
