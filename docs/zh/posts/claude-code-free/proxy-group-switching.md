---
title: Chatspeed 代理分组切换：编程过程中无缝切换 AI 模型
date: 2025-01-29
category:
  - 高效编程
tag:
  - Chatspeed
  - 代理分组
  - Claude Code
  - 模型切换
description: 本文介绍 Chatspeed 的代理分组自动切换功能，通过 `/switch` 前缀和 `Alt+Shift+P` 快捷键，让你在不退出 Claude Code 等编程工具的情况下，快速切换不同的 AI 模型配置。
keywords: 代理分组, 模型切换, Chatspeed, Claude Code, Alt+Shift+P, /switch, 编程效率, AI 模型
---

## 🎯 痛点与解决方案

在日常 AI 辅助编程中，我们经常需要根据不同的任务类型切换不同的模型：

- **简单任务**：希望使用快速、便宜的模型（如 Haiku 级别）
- **复杂任务**：需要更强大的推理能力（如 Opus 级别）
- **成本控制**：希望在不同场景使用不同供应商的高性价比模型

传统的做法是在 Claude Code 中修改 `ANTHROPIC_BASE_URL` 环境变量，这需要：

1. 退出当前的 Claude Code 会话
2. 修改环境变量
3. 重新启动 Claude Code

这个过程繁琐且会打断工作流。

**Chatspeed 的代理分组切换功能** 完美解决了这个问题——你可以在编程过程中**无缝切换**模型配置，所有切换即时生效，无需重启任何应用。

## 🚀 核心功能

### 1. `/switch` 动态路由前缀

Chatspeed 的 CCProxy 模块支持 `/switch` 端点前缀。当客户端请求发往 `/switch/` 路径时，代理会自动读取当前**激活的代理分组**配置，并将请求转发到该分组中定义的模型。

```bash
# Claude 协议（Claude Code 原生使用）
# 访问激活分组的模型
curl -X POST http://127.0.0.1:11435/switch/v1/messages \
  -H "x-api-key: {proxy-key}" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"model": "claude-sonnet-4-20250514", "messages": [{"role": "user", "content": "hello"}], "max_tokens": 100}'

# Claude Code 配置示例
export ANTHROPIC_BASE_URL="http://127.0.0.1:11435/switch"
export ANTHROPIC_AUTH_TOKEN="{proxy-key}"

# 现在启动 Claude Code，所有请求都会走当前激活的分组配置
claude
```

### 2. `Alt+Shift+P` 快捷切换面板

按下 `Alt+Shift+P`（可自定义）即可呼出轻量级分组切换面板：

- **键盘导航**：↑/↓ 方向键预览、Enter 激活、Esc 关闭
- **鼠标操作**：点击分组条目即可直接激活
- **工具模式切换**：点击左侧设置图标，可在三种模式间循环切换

### 工具兼容模式说明

切换面板左侧有一个**工具模式图标**，点击可循环切换三种模式。详细说明请参考[工具兼容模式详解](/zh/posts/experience-sharing/why-compat-mode.html)。

| 模式           | 图标 | 说明                                                          |
| -------------- | ---- | ------------------------------------------------------------- |
| **原生调用**   | 🔨    | 直接利用 AI 自身的工具调用能力                                |
| **兼容模式**   | 📝    | 通过 XML 格式解析工具参数，适用于不支持原生工具调用的模型     |
| **按地址设置** | ⚙️    | 根据请求 URL 前缀判断，如 `/switch/compat_mode/` 启用兼容模式 |

> ⚠️ **优先级说明**：分组中的工具模式设置会**覆盖** URL 前缀的设置。

**即时生效**：切换后新请求立即使用新配置
**智能显隐**：窗口失去焦点自动隐藏，不干扰工作流

![代理分组切换面板](/images/blog/zh/proxy-switcher-panel.png)

### 3. 分组模型映射机制

每个代理分组可以独立配置 `claude-haiku-*`、`claude-sonnet-*`、`claude-opus-*` 三个模型别名的映射目标：

| 客户端请求模型  | ds 分组映射  | glm 分组映射 | kimi 分组映射  |
| --------------- | ------------ | ------------ | -------------- |
| claude-haiku-*  | ds-code-2.5  | glm-4.5      | kimi-k2.5-fast |
| claude-sonnet-* | deepseek-3.1 | glm-4.6      | kimi-k2.5      |
| claude-opus-*   | deepseek-3.2 | glm-4.7      | kimi-k2.5-pro  |

这意味着当你切换分组时，Claude Code 会自动使用不同的后端模型，而无需修改任何代码或重启应用。

## 📝 配置指南

### 步骤 1：添加[代理分组](/zh/ccproxy/configuration.html#🧩-代理分组)

1. 打开 Chatspeed 设置 → [代理](/zh/ccproxy/configuration.html#代理设置)
2. 切换到「代理分组」点击右上角「+」添加新分组
3. 填写分组名称（如 `ds`、`glm`、`minimax` 等）等相关参赛后保存即可

### 步骤 2：配置[模型映射](/zh/ccproxy/configuration.html#🎯-模型映射)

在分组编辑界面，为每个 Claude 模型配置目标后端：

```
代理分组名称: ds

代理模型:
├── claude-haiku-* → ds-code-2.5 (或 qwen3-code-30b)
├── claude-sonnet-* → deepseek-3.1
└── claude-opus-* → deepseek-3.2
```

### 步骤 3：配置 [Claude Code](/zh/ccproxy/claude-code.html)

```bash
# 方式一：使用 /switch 动态路由（推荐）
export ANTHROPIC_BASE_URL="http://127.0.0.1:11435/switch"
export ANTHROPIC_AUTH_TOKEN="cs-xxxxx"

# 方式二：直接使用分组名称
export ANTHROPIC_BASE_URL="http://127.0.0.1:11435/ds"
export ANTHROPIC_AUTH_TOKEN="cs-xxxxx"
```

### 步骤 4：开始使用

1. 启动 Claude Code：`claude`
2. 按下 `Alt+Shift+P` 呼出切换面板
3. 选择目标分组（如 ds、glm、minimax）
4. 继续编程——模型已无缝切换

## 💡 实战场景

### 场景一：成本优化

```bash
# 日常简单任务 → 使用免费/低成本模型
# 切换到 ds 分组（使用 deepseek/qwen 免费额度）

# 复杂代码生成 → 使用高质量模型
# 切换到 glm 分组（使用智谱 GLM 高性能模型）
```

### 场景二：供应商轮换

```bash
# 当前供应商额度用完 → 一键切换到其他分组
ds → minimax → kimi → ollama 本地模型
```

### 场景三：工具调用兼容性调整

如果某个分组中的模型不支持原生工具调用，可以在切换面板中点击左侧的**工具模式图标**，快速切换到兼容模式。详见前文[工具兼容模式说明](#工具兼容模式说明)。

## 📊 使用建议

1. **分组命名规范**：使用有意义的名称，如 `ds`（deepseek）、`glm`（智谱）、`ollama-local` 等
2. **提前配置**：在开始编程前就配置好所有可能用到的分组
3. **善用快捷键**：`Alt+Shift+P` 是最高效的切换方式
4. **工具模式切换**：对于不支持原生工具调用的模型，记得切换到兼容模式

## 🎉 总结

Chatspeed 的代理分组切换功能让 AI 模型管理变得前所未有的简单：

- **零打断**：编程过程中随时切换，无需重启应用
- **极便捷**：`Alt+Shift+P` 一键呼出面板
- **高灵活**：每个分组独立配置，适配不同场景
- **低成本**：轻松在免费/低成本模型间切换

现在，你可以真正做到「按需选模，随心切换」，让 AI 编程工作流更加高效流畅。

---

*本文基于 Chatspeed v1.1.26+ 版本编写*
