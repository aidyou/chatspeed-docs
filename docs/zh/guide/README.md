# 用户指南

欢迎使用 Chatspeed 用户指南！本指南将帮助您快速上手并充分利用 Chatspeed 的各项功能。

## 指南内容概览

本指南包含以下主要部分：

### 🚀 入门指南

- **[功能概览](./features/overview.md)** - 了解 Chatspeed 的主要功能特性
- **[安装指南](./installation.md)** - 详细介绍如何在不同操作系统上安装 Chatspeed
- **[快速开始](./quickStart.md)** - 5 分钟快速上手教程，帮助您运行第一个 AI 代理

### 🔄 核心功能

- **[ccproxy 模块](../ccproxy/)** - 了解Chatspeed的AI协议代理及妙用
- **[MCP 模块](../mcp/)** - MCP工具的使用及代理配置

## 核心概念

在开始使用 Chatspeed 之前，了解以下核心概念会很有帮助：

### 1. AI 代理

AI 代理是 Chatspeed 管理的基本单元，每个代理代表一个特定的 AI 模型配置，包括：

- 模型提供商和具体模型
- API 密钥和访问端点
- 参数配置（温度、最大令牌数等）

### 2. 模型分组

模型分组允许您将多个 AI 代理组织在一起，便于：

- 按用途分类（如编程、翻译、写作等）
- 快速切换不同场景下的模型
- 统一管理相似任务的参数设置

### 3. ccproxy 代理

ccproxy 是 Chatspeed 的核心代理引擎，负责：

- 在不同 AI 协议间进行转换（OpenAI、Claude、Gemini、Ollama等）
- 提供统一的 API 接入点
- 支持 "Any Claude Code, Any Gemini CLI" 能力

### 4. MCP 工具

MCP（Model Context Protocol）工具扩展了 AI 的能力，包括：

- 文件系统访问
- 数据库查询
- 网络搜索
- Git 操作等

## 常见使用场景

### 场景 1：日常办公助手

将 Chatspeed 作为桌面常驻 AI 助手，处理日常的：

- 文档撰写和润色
- 语言翻译
- 信息查询
- 创意生成

### 场景 2：开发工具增强

通过 ccproxy 将高性价比模型集成到开发环境中：

- 在 Claude Code 中使用免费模型
- 降低开发成本 80% 以上
- 保持原有工作流程不变

### 场景 3：知识管理

利用智记功能构建个人知识库：

- 保存有价值的 AI 对话内容
- 按标签分类管理
- 快速检索历史信息

## 开始使用

要开始使用 Chatspeed，请按照以下步骤操作：

1. **[安装 Chatspeed](./installation.md)** - 在您的系统上安装软件
2. **[完成初始配置](./quickStart.md)** - 设置第一个 AI 模型
3. **[探索核心功能](./features/overview.md)** - 了解 Chatspeed 的主要特性

## 获取帮助

如果在使用过程中遇到问题，您可以：

- 📚 查看 [常见问题](./faq.md)
- 🐛 [报告问题](https://github.com/aidyou/chatspeed/issues)
- 💬 [参与讨论](https://github.com/aidyou/chatspeed/discussions)
- 📧 [联系支持](mailto:chatspeed@aidyou.ai)

准备好开始您的 AI 助手之旅了吗？让我们从 [安装指南](./installation.md) 开始吧！
