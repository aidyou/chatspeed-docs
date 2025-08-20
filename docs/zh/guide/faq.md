# 常见问题

## 安装相关

### 如何在 macOS 上安装 Chatspeed？

您可以使用 Homebrew 安装（推荐）：

```bash
brew install aidyou/tap/chatspeed
```

或者从 GitHub 下载预编译的二进制文件。

### 安装后如何验证 Chatspeed 是否正常工作？

运行以下命令检查版本：

```bash
chatspeed --version
```

## 配置相关

### 如何添加新的 AI 模型？

使用 `chatspeed model add` 命令添加新模型：

```bash
chatspeed model add \
  --name "my-model" \
  --provider "openai" \
  --model "gpt-3.5-turbo" \
  --api-key "your-api-key" \
  --base-url "https://api.openai.com/v1"
```

### 如何创建模型分组？

使用 `chatspeed group create` 命令创建分组：

```bash
chatspeed group create \
  --name "coding" \
  --model "qwen-coder" \
  --temperature 0.3 \
  --description "编程专用模型"
```

## ccproxy 相关

### ccproxy 支持哪些 AI 协议？

ccproxy 支持以下协议：

- OpenAI 兼容 API
- Claude Messages API
- Google Gemini API
- Ollama API

### 如何在 Claude Code 中使用 ccproxy？

设置环境变量：

```bash
export ANTHROPIC_API_BASE="http://localhost:11434/free"
export ANTHROPIC_API_KEY="dummy-key"
```

## MCP 相关

### 如何添加 MCP 工具？

使用 `chatspeed mcp add` 命令添加工具：

```bash
chatspeed mcp add \
  --name "filesystem" \
  --command "npx @modelcontextprotocol/server-filesystem" \
  --args "/path/to/your/project" \
  --description "文件系统访问工具"
```

### 如何在 IDE 中使用 MCP 工具？

在 IDE 的 MCP 配置中设置服务器 URL：

```
MCP Server URL: http://localhost:11434/mcp/filesystem
```

## 故障排除

### 端口被占用怎么办？

修改配置文件中的端口设置，或终止占用端口的进程：

```bash
# 查找占用端口的进程
lsof -i :11434

# 终止进程
kill -9 <PID>
```

### 模型连接失败怎么办？

1. 检查 API Key 是否正确
2. 验证网络连接是否正常
3. 确认模型提供商的服务是否可用
4. 查看日志获取详细错误信息

### 如何查看 Chatspeed 日志？

使用以下命令查看日志：

```bash
chatspeed logs
```

## 性能优化

### 如何提高响应速度？

1. 使用本地模型（如 Ollama）
2. 启用缓存功能
3. 优化提示词工程
4. 调整模型参数（如 temperature）

### 如何降低使用成本？

1. 使用免费模型提供商（如 OpenRouter）
2. 创建成本优化的模型分组
3. 合理设置最大令牌数限制
4. 利用模型轮换功能

## 开发相关

### 如何从源码构建 Chatspeed？

```bash
git clone https://github.com/aidyou/chatspeed.git
cd chatspeed
yarn install
yarn build
cargo install --path .
```

### 如何贡献代码？

1. Fork 项目仓库
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 其他问题

### Chatspeed 是开源软件吗？

是的，Chatspeed 是开源软件，采用 MIT 许可证。

### 支持哪些操作系统？

Chatspeed 支持 Windows 10+、macOS 10.15+ 和 Linux (Ubuntu 18.04+)。

### 如何获取技术支持？

您可以通过以下方式获取技术支持：

- [GitHub Issues](https://github.com/aidyou/chatspeed/issues)
- [GitHub Discussions](https://github.com/aidyou/chatspeed/discussions)
- 邮件支持：<support@chatspeed.ai>
