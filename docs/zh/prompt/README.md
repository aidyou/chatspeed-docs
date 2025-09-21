# 提示词库

欢迎来到 Chatspeed 提示词库！

本库收录了一系列精心设计的提示词模板，旨在优化 Chatspeed 的 `CCProxy` 模块与各类大语言模型（LLM）的交互效果，从而在您的工作流中发挥出 AI 的最大潜力。

## 可用提示词

### Claude Code 工具兼容模式提示增强

- **文件**: [claude-code-prompt-enhance.md](claude-code-prompt-enhance.md)
- **描述**: 适用于 `CCProxy` **工具兼容模式**下，使**非 Claude 模型**调用 Claude Code 能力。优化代码生成与指令遵循，推荐用于 `CCProxy` 中配置为 Claude Code 的模型分组。

### Claude Code 原生工具调用提示增强

- **文件**: [claude-code-prompt-enhance-native-tool-call.md](claude-code-prompt-enhance-native-tool-call.md)
- **描述**: 适用于 `CCProxy` **直接调用 Claude Code**，并利用**模型自身工具调用能力**的场景。优化代码生成与指令遵循，推荐用于 `CCProxy` 中配置为 Claude Code 的模型分组。

### 通用提示词模板

- **文件**: [common.md](common.md)
- **描述**: 一套通用的基础指令，适用于任何通过 `CCProxy` 接入的 AI IDE 或代码插件。它为 AI 设定了基本的交互框架和行为准则，建议作为默认分组的基础提示词。

## 如何使用

1.  **复制与应用**: 直接将提示词内容复制并粘贴到 Chatspeed 客户端对应的 `CCProxy` 分组设置中。
2.  **定制优化**: 根据您的具体需求和偏好，自由修改和调整提示词。
3.  **组合创新**: 尝试将不同模板的片段进行组合，创造出更符合您个人工作流的强大提示词。

## 贡献指南

我们热切欢迎您分享自己的智慧！如果您有优秀的提示词模板，可以通过以下方式参与贡献：

1.  **添加新模板**: 提交您原创的提示词文件。
2.  **改进现有模板**: 对本库中的提示词提出优化建议。
3.  **分享用例**: 展示您如何利用这些提示词完成了出色的工作。

---

_请注意：本库中的所有提示词均专为通过 Chatspeed 代理模块（`CCProxy`）连接 AI 模型以完成编程任务的场景而设计，且主要针对工具兼容模式场景而设计。_
