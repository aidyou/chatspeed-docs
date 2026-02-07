---
title: Cline 接入指南
description: 本指南介绍如何将 Chatspeed 的 CCProxy 中的代理模型接入 Cline，一款优秀的 VS Code AI 编程插件，采用计划 -> 执行的工作模式。内容涵盖前置条件和配置步骤。
keywords: Cline, 接入指南, CCProxy, Chatspeed, VS Code, AI 编程插件, 代理模型, 计划执行, 配置
---
# `Cline` 接入指南

[Cline](https://github.com/cline/cline) 是一款优秀的 `VS Code` AI 编程插件，采用 `计划 -> 执行` 的工作模式。本指南介绍如何将 `CCProxy` 中的代理模型接入 `Cline`。

### 📋 前置条件

在开始使用前，请确保已完成以下步骤：

1. 已安装 [Chatspeed](../guide/installation.md)
2. 根据[快速开始](../guide/quickStart.md)添加了必要的模型
3. 已完成[CCProxy 基础配置](configuration.md)
4. 已添加所需的代理模型
5. 已配置好代理密钥

> 对于 Cline 插件，模型是自己指定的，所以配置 **代理分组** 不是必要条件。

### ⚙️ 配置步骤

1. **设置执行模型**
   - **API Provider**：选择 `OpenAI Compatible`。
   - **Base URL**：输入 `http://127.0.0.1:11435/v1`。
   - **API Key**：从 `CCProxy` 设置界面拷贝代理密钥并粘贴。
   - **Model ID**：输入 `gemini2.5-flash`。
   - `gemini2.5-flash` 支持图片输入和工具调用，可以将对应的选项打勾，也可以忽略。

> Model ID 你可以根据自己的配置情况修改为别的，比如 `qwen3-coder` 或者 `deepseek-v3` 也不错

![配置 Cline 执行模型](/images/common/cline-setting-1.png)

2. **设置计划模型**
   - 切换到`Plan Mode`，按下图数字标注的顺序修改相关信息，然后点击**数字 3** 标注的`Done`按钮保存信息，其中：
     - **Model ID**：选择 `deepseek-r1-0528`。
     - `deepseek-r1-0528` 是推理模型，因此如图中**数字 2** 所示，取消勾选`Supports Images`和`Supports browser use`。

![配置 Cline 计划模型](/images/common/cline-setting-2.png)

### ✅ 验证配置
   - 返回 Cline 主界面
   - 测试基础功能是否正常工作

   ![在 Cline 中使用 CCProxy](/images/common/cline-setting-3.png)

### 📊 推荐模型配置

| 用途     | 推荐模型         | 备注                     |
| -------- | ---------------- | ------------------------ |
| 计划模型 | deepseek-r1-0528 | 推理能力强，适合任务分解 |
| 执行模型 | gemini2.5-flash  | 响应快，适合代码生成     |

### ❓ 常见问题

**Q: 为什么我的模型不工作？**

**A: 请检查：**

1. CCProxy 服务是否运行
2. 模型是否已在 CCProxy 中添加
3. API Key 是否正确
4. Base URL 是否包含正确的端口号

**Q: 如何切换不同模型？**

**A:** 只需在设置中修改 Model ID 并保存即可，无需重启 VS Code

[返回主文档](./README.md)
