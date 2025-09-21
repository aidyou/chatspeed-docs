# `Zed` 接入指南

Zed 是一款为高性能人机协作而设计的下一代代码编辑器。它在资源占用方面有优势，提供了不错的 AI 支持，并且调试功能也日趋成熟。

本节主要讲解如何将 `CCProxy` 配置的模型应用到 `Zed` 中。

## 📋 前置条件

在开始使用前，请确保已完成以下步骤：

1. 已安装 [Chatspeed](../guide/installation.md)
2. 根据[快速开始](../guide/quickStart.md)添加了必要的模型
3. 已完成[CCProxy 基础配置](configuration.md)
4. 已添加所需的代理模型
5. 已配置好代理密钥

> 对于 `Zed` 编辑器，模型是自己指定的，所以配置 **代理分组** 不是必要条件。

## ⚙️ 配置 `Zed` 编辑器

1.  从菜单 `Zed` -> `Settings` -> `Open Settings`（macOS 快捷键: `Command + ,`）打开设置。
2.  将下面的配置添加到文件中：

```json
{
  "language_models": {
    "openai_compatible": {
      "Chatspeed": {
        "api_url": "http://127.0.0.1:11434/v1",
        "available_models": [
          {
            "name": "gemini2.5-pro",
            "display_name": "gemini2.5-pro",
            "max_tokens": 1000000,
            "max_output_tokens": 32000,
            "max_completion_tokens": 200000
          },
          {
            "name": "gemini2.5-flash",
            "display_name": null,
            "max_tokens": 1000000,
            "max_output_tokens": 32000,
            "max_completion_tokens": 200000
          },
          {
            "name": "gemini2.0-flash",
            "display_name": null,
            "max_tokens": 1000000,
            "max_output_tokens": 32000,
            "max_completion_tokens": 200000
          },
          {
            "name": "deepseek-r1-0528",
            "display_name": null,
            "max_tokens": 128000,
            "max_output_tokens": 32000,
            "max_completion_tokens": 200000
          },
          {
            "name": "deepseek-v3.1",
            "display_name": null,
            "max_tokens": 128000,
            "max_output_tokens": 32000,
            "max_completion_tokens": 200000
          },
          {
            "name": "deepseek-v3",
            "display_name": null,
            "max_tokens": 128000,
            "max_output_tokens": 32000,
            "max_completion_tokens": 200000
          },
          {
            "name": "qwen3-coder",
            "display_name": null,
            "max_tokens": 256000,
            "max_output_tokens": 32000,
            "max_completion_tokens": 200000
          },
          {
            "name": "kimi-k2",
            "display_name": "kimi-k2",
            "max_tokens": 256000,
            "max_output_tokens": 32000,
            "max_completion_tokens": 200000
          }
        ]
      }
    }
  }
}
```

> **注意**：所有模型都需预先在 Chatspeed 中添加。配置中的模型名称应从下图指示的位置拷贝。

![拷贝代理名称](/images/zh/proxy-setting-5.png)

2.  按下图数字标注的顺序拷贝代理密钥。

    ![拷贝代理密钥](/images/zh/proxy-key-4.png)

3.  按下图数字标注的顺序打开 Zed 的设置，并将**代理密钥**粘贴到**Chatspeed**的 API Key 字段中。

    ![粘贴代理密钥](/images/common/zed-setting-2.png)

    ![粘贴代理密钥](/images/common/zed-setting-3.png)

4.  完成以上步骤后，您就可以在 Zed 编辑器中使用代理模型了。

    ![在 Zed 中使用 CCProxy](/images/common/zed-setting-4.png)
