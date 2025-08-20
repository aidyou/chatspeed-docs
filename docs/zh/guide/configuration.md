# 配置指南

本指南详细介绍了 Chatspeed 的配置选项，帮助您根据需求定制 AI 代理和 MCP 管理平台。

## 配置文件结构

Chatspeed 使用 YAML 格式的配置文件，主要配置文件位于：

```
~/.chatspeed/
├── config.yaml      # 主配置文件
├── models.yaml      # AI 模型配置
├── groups.yaml      # 模型分组配置
├── mcp.yaml         # MCP 工具配置
└── logs/            # 日志目录
```

## 主配置文件 (config.yaml)

### 基本设置

```yaml
# 服务器配置
server:
  host: "0.0.0.0"          # 监听地址
  port: 11434              # 监听端口
  cors_enabled: true       # 启用 CORS
  max_connections: 1000    # 最大连接数

# 日志配置
logging:
  level: "info"            # 日志级别: debug, info, warn, error
  file: "logs/chatspeed.log"
  max_size: "100MB"        # 日志文件最大大小
  max_files: 10            # 保留的日志文件数量

# 安全配置
security:
  api_key_required: false  # 是否需要 API Key
  allowed_origins: ["*"]   # 允许的来源
  rate_limit:
    requests_per_minute: 60
    burst_size: 10

# 缓存配置
cache:
  enabled: true
  ttl: "1h"               # 缓存过期时间
  max_size: "1GB"         # 最大缓存大小
```

### 高级设置

```yaml
# 代理配置
proxy:
  timeout: "30s"          # 请求超时时间
  retry_attempts: 3       # 重试次数
  retry_delay: "1s"       # 重试延迟

# 监控配置
monitoring:
  metrics_enabled: true   # 启用指标收集
  health_check_interval: "30s"

# 更新配置
updates:
  auto_check: true        # 自动检查更新
  check_interval: "24h"   # 检查间隔
```

## 模型配置 (models.yaml)

### OpenAI 兼容模型

```yaml
models:
  gpt-4:
    provider: "openai"
    model: "gpt-4"
    api_key: "${OPENAI_API_KEY}"
    base_url: "https://api.openai.com/v1"
    parameters:
      temperature: 0.7
      max_tokens: 4096
      top_p: 1.0

  gpt-3.5-turbo:
    provider: "openai"
    model: "gpt-3.5-turbo"
    api_key: "${OPENAI_API_KEY}"
    base_url: "https://api.openai.com/v1"
    parameters:
      temperature: 0.8
      max_tokens: 2048
```

### Claude 模型

```yaml
  claude-3-sonnet:
    provider: "anthropic"
    model: "claude-3-sonnet-20240229"
    api_key: "${ANTHROPIC_API_KEY}"
    base_url: "https://api.anthropic.com"
    parameters:
      temperature: 0.7
      max_tokens: 4096

  claude-3-haiku:
    provider: "anthropic"
    model: "claude-3-haiku-20240307"
    api_key: "${ANTHROPIC_API_KEY}"
    base_url: "https://api.anthropic.com"
    parameters:
      temperature: 0.5
      max_tokens: 2048
```

### Gemini 模型

```yaml
  gemini-pro:
    provider: "google"
    model: "gemini-pro"
    api_key: "${GOOGLE_API_KEY}"
    base_url: "https://generativelanguage.googleapis.com/v1"
    parameters:
      temperature: 0.9
      max_tokens: 2048
      top_p: 0.8
      top_k: 40
```

### Ollama 本地模型

```yaml
  qwen-coder:
    provider: "ollama"
    model: "qwen2.5-coder:7b"
    base_url: "http://localhost:11434"
    parameters:
      temperature: 0.3
      max_tokens: 4096

  llama3:
    provider: "ollama"
    model: "llama3:8b"
    base_url: "http://localhost:11434"
    parameters:
      temperature: 0.7
      max_tokens: 2048
```

### OpenRouter 模型

```yaml
  openrouter-free:
    provider: "openrouter"
    model: "openai/gpt-3.5-turbo"
    api_key: "${OPENROUTER_API_KEY}"
    base_url: "https://openrouter.ai/api/v1"
    parameters:
      temperature: 0.7
      max_tokens: 2048

  kimi-k2:
    provider: "openrouter"
    model: "moonshot/moonshot-v1-8k"
    api_key: "${OPENROUTER_API_KEY}"
    base_url: "https://openrouter.ai/api/v1"
    parameters:
      temperature: 0.6
      max_tokens: 8192
```

## 模型分组配置 (groups.yaml)

```yaml
groups:
  # 免费模型分组
  free:
    description: "免费和低成本模型"
    models:
      - "openrouter-free"
      - "qwen-coder"
    default_model: "openrouter-free"
    parameters:
      temperature: 0.7
      max_tokens: 2048
    prompt_injection:
      system: "你是一个有用的AI助手，请用中文回答。"

  # 编程专用分组
  coding:
    description: "编程和代码生成专用"
    models:
      - "qwen-coder"
      - "claude-3-haiku"
    default_model: "qwen-coder"
    parameters:
      temperature: 0.3
      max_tokens: 4096
    prompt_injection:
      system: "你是一个专业的编程助手，请提供高质量的代码和技术建议。"

  # 高端模型分组
  premium:
    description: "高端模型用于复杂任务"
    models:
      - "gpt-4"
      - "claude-3-sonnet"
      - "gemini-pro"
    default_model: "claude-3-sonnet"
    parameters:
      temperature: 0.7
      max_tokens: 4096
    prompt_injection:
      system: "你是一个高级AI助手，请提供深入和专业的分析。"

  # 翻译专用分组
  translation:
    description: "多语言翻译专用"
    models:
      - "gpt-3.5-turbo"
      - "gemini-pro"
    default_model: "gpt-3.5-turbo"
    parameters:
      temperature: 0.3
      max_tokens: 2048
    prompt_injection:
      system: "你是一个专业的翻译助手，请提供准确和自然的翻译。"
```

## MCP 工具配置 (mcp.yaml)

```yaml
mcp_servers:
  # 文件系统工具
  filesystem:
    command: "npx"
    args: ["@modelcontextprotocol/server-filesystem", "/path/to/project"]
    env:
      NODE_ENV: "production"
    enabled: true
    description: "文件系统访问工具"

  # 数据库工具
  database:
    command: "python"
    args: ["-m", "mcp_server_database", "--connection-string", "${DATABASE_URL}"]
    enabled: true
    description: "数据库查询工具"

  # Git 工具
  git:
    command: "npx"
    args: ["@modelcontextprotocol/server-git", "/path/to/repo"]
    enabled: true
    description: "Git 版本控制工具"

  # 网络搜索工具
  search:
    command: "python"
    args: ["-m", "mcp_server_search", "--api-key", "${SEARCH_API_KEY}"]
    enabled: false
    description: "网络搜索工具"

# MCP 代理配置
mcp_proxy:
  enabled: true
  port: 11435
  timeout: "30s"
  max_connections: 100
```

## 环境变量

Chatspeed 支持通过环境变量进行配置：

```bash
# API Keys
export OPENAI_API_KEY="your-openai-key"
export ANTHROPIC_API_KEY="your-anthropic-key"
export GOOGLE_API_KEY="your-google-key"
export OPENROUTER_API_KEY="your-openrouter-key"

# 数据库连接
export DATABASE_URL="postgresql://user:pass@localhost/db"

# 搜索 API
export SEARCH_API_KEY="your-search-api-key"

# Chatspeed 配置
export CHATSPEED_CONFIG_DIR="/custom/config/path"
export CHATSPEED_LOG_LEVEL="debug"
export CHATSPEED_PORT="8080"
```

## 配置验证

验证您的配置是否正确：

```bash
# 验证配置文件语法
chatspeed config validate

# 测试模型连接
chatspeed model test --all

# 测试特定模型
chatspeed model test gpt-4

# 测试分组配置
chatspeed group test free

# 测试 MCP 工具
chatspeed mcp test filesystem
```

## 配置最佳实践

### 1. 安全性

```yaml
# 使用环境变量存储敏感信息
api_key: "${API_KEY}"  # ✅ 推荐
api_key: "sk-xxx"      # ❌ 不推荐

# 限制访问来源
security:
  allowed_origins:
    - "http://localhost:3000"
    - "https://yourdomain.com"
```

### 2. 性能优化

```yaml
# 合理设置超时时间
proxy:
  timeout: "30s"        # 一般任务
  timeout: "120s"       # 复杂任务

# 启用缓存
cache:
  enabled: true
  ttl: "1h"
```

### 3. 成本控制

```yaml
# 设置默认参数限制
parameters:
  max_tokens: 2048      # 限制输出长度
  temperature: 0.7      # 平衡创造性和一致性

# 使用免费模型作为默认
groups:
  default:
    default_model: "openrouter-free"
```

### 4. 监控和日志

```yaml
# 启用详细日志
logging:
  level: "info"

# 启用监控
monitoring:
  metrics_enabled: true
```

## 动态配置更新

Chatspeed 支持热重载配置：

```bash
# 重新加载配置
chatspeed config reload

# 重新加载特定配置文件
chatspeed config reload --file models.yaml

# 监听配置文件变化（开发模式）
chatspeed config watch
```

## 配置模板

Chatspeed 提供了一些预设的配置模板：

```bash
# 生成基础配置模板
chatspeed config template basic

# 生成开发环境配置
chatspeed config template development

# 生成生产环境配置
chatspeed config template production

# 生成多模型配置
chatspeed config template multi-model
```

## 故障排除

### 配置文件错误

```bash
# 检查 YAML 语法
chatspeed config validate

# 查看配置解析结果
chatspeed config show

# 重置为默认配置
chatspeed config reset
```

### 模型连接问题

```bash
# 测试网络连接
chatspeed model ping openai

# 检查 API Key
chatspeed model auth-test gpt-4

# 查看详细错误信息
chatspeed logs --level debug
```

## 下一步

配置完成后，您可以：

1. **[ccproxy 模块](../ccproxy/)** - 了解代理功能的详细配置
2. **[MCP 集成](../mcp/)** - 配置更多 MCP 工具
3. **[最佳实践](./best-practices.md)** - 学习使用技巧和优化方法
4. **[API 参考](../api/)** - 查看完整的 API 文档