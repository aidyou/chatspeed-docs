# `Zed` Integration Guide

Zed is a next-generation code editor designed for high-performance human-computer collaboration. It has advantages in resource consumption, offers good AI support, and its debugging features are maturing.

This section explains how to apply models configured in `CCProxy` to `Zed`.

## 📋 Prerequisites

Before you begin, ensure you have completed the following steps:

1. Installed [Chatspeed](../guide/installation.md)
2. Added the necessary models according to the [Quick Start](../guide/quickStart.md)
3. Completed the [CCProxy Basic Configuration](configuration.md)
4. Added the required proxy models
5. Configured the proxy keys

> For the `Zed` editor, the model is specified by the user, so configuring a **Proxy Group** is not a necessary condition.

## ⚙️ Configuring the `Zed` Editor

1.  Open settings from the menu `Zed` -> `Settings` -> `Open Settings` (macOS shortcut: `Command + ,`).
2.  Add the following configuration to the file:

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

> **Note**: All models must be added in Chatspeed beforehand. The model names in the configuration should be copied from the location indicated in the image below.

![Copy Proxy Name](/images/en/proxy-setting-5.png)

2.  Copy the proxy key in the order indicated by the numbers in the image.

    ![Copy Proxy Key](/images/en/proxy-key-4.png)

3.  Open Zed's settings in the order indicated by the numbers and paste the **proxy key** into the API Key field for **Chatspeed**.

    ![Paste Proxy Key](/images/common/zed-setting-2.png)

    ![Paste Proxy Key](/images/common/zed-setting-3.png)

4.  After completing these steps, you can use the proxy models in the Zed editor.

    ![Using CCProxy in Zed](/images/common/zed-setting-4.png)
