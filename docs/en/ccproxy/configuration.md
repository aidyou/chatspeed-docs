# CCProxy Configuration Guide

Before starting this chapter, please install [Chatspeed](https://chatspeed.aidyou.ai) according to the [Installation Guide](../guide/installation.md).

## 🧩 Proxy Groups

Proxy groups allow users to isolate access to different models based on usage scenarios and can also be used to quickly switch models for Claude Code.

#### Group Management

1.  Click the dropdown menu in the upper right corner of the Chatspeed main window and select "Proxy" in the order indicated by the numbers.

    ![Proxy Management Menu Entry](/images/en/proxy-group-1.png)

2.  After entering the proxy settings page, click "Proxy Groups" to switch to group management, then click "+" to add a group, following the numerical order.

    ![Proxy Group Management](/images/en/proxy-group-2.png)

3.  This example uses a `qwen` group. Fill in the details as shown in the image and save.

    ![Add Proxy Group](/images/en/proxy-group-3.png)

    **Where**:
    - **Prompt Injection**: Select **Enhanced**.
    - **Prompt Text**: You can enter your desired prompt enhancement (an example is provided below).
    - **Tool Filter**: Enter `WebFetch` and `WebSearch`, one per line. Since we are using an external model, Claude Code's internal tools `WebFetch` and `WebSearch` cannot be used and need to be filtered out. Chatspeed has built-in `WebFetch` and `WebSearch` tools, which you can add to `Claude Code` via `MCP`. Please refer to [MCP Proxy](../mcp/) for adding MCP.
    - **Temperature Ratio**: Set this according to the optimal temperature for different models. Claude uses a temperature of `1.0` for code generation, while the official documentation for `qwen3-code` suggests an optimal temperature of `0.7`, so the ratio should be set to `0.7`.

**Claude Code** Prompt Enhancement: We provide some prompts in the [Prompts](../prompt/) section that you can use as a reference.


#### Switching Groups

You can follow the steps above to add a kimi group, a gemini group, etc. Access to models in different groups is done via the `/{group_name}/` prefix. For specific access rules, please refer to the [API Documentation](../api/).

### 🔀 Proxy Management

After managing groups, we can now add different proxies to the corresponding groups as needed. This example demonstrates how to add a proxy model for the `Claude Code` usage scenario.

> Before starting this section, you must first add some models. You can refer to the **Add Model** section of the [Quick Start](../guide/quickStart.md).

#### Proxy Settings

1.  Click the dropdown menu in the upper right corner of the Chatspeed main window and select "Proxy" in the order indicated by the numbers.

    ![Proxy Management Menu Entry](/images/en/proxy-group-1.png)

2.  On the proxy management page, click **Proxy Services** and then **+** in the order indicated.

    ![Proxy Management Page](/images/en/proxy-setting-1.png)

3.  Fill in the fields as indicated in the image and save.
    - **Group**: In this example, we are configuring qwen3-code as a backup model for `Claude Code`, so select qwen.
    - **Proxy Alias**: `Claude Code` currently uses `claude-sonnet-4-20250514` as its main programming model, so enter `claude-sonnet-4-20250514` here.
    - **Model**: Search for qwen, then select all qwen3-coder or related models.

      > Note: The `Nvidia` `qwen3-235b-a22b` in the image is not actually a code model and is used here for demonstration purposes only.

    ![Add Proxy](/images/en/proxy-setting-2.png)

4.  Please follow step 3 again to add a `claude-3-5-haiku-20241022` proxy, which is currently used by `Claude Code` to generate conversation titles.

    ![Add Proxy](/images/en/proxy-setting-3.png)

5.  At this point, we have the basic requirements for a `Claude Code` proxy.

    ![Proxy List](/images/en/proxy-setting-4.png)

> As of `2025-09-21`, we have noticed that Claude Code sometimes calls the `claude-opus-4-1-20250805` model, so it is recommended to add it as well following the steps above.

### 🔑 Key Management

Proxy keys are used to access proxy models. They are independent of the keys provided by AI vendors and can effectively protect your data security. You can configure multiple keys for different scenarios.

#### Key Management

1.  Click the dropdown menu in the upper right corner of the Chatspeed main window and select "Proxy" in the order indicated by the numbers.

    ![Proxy Management Menu Entry](/images/en/proxy-group-1.png)

2.  As indicated by the numbers, switch to key management, click "+", enter `ClaudeCode` in the **Key Name** field, and then save. The key name can be any string you like.

    ![Key Management Page](/images/en/proxy-key-1.png)

3.  You can add multiple keys for your different use cases. For example, you can add separate keys for `Claude Code`, `Cline`, `Roo Code`, `Zed`, and development testing (`dev`). Some example keys in the documentation (like `dev`) are generally safe to use in a test environment.

    ![Key Management Page](/images/en/proxy-key-2.png)

### ✍️ Prompt Engineering

Currently, `Qwen Code` offers 2,000 free calls per day, and `Gemini CLI` also has a generous free quota (testing shows about 50 free calls per day for `gemini-2.5-pro`, after which it automatically switches to `gemini-2.5-flash`). Therefore, when on a limited budget, using them can meet most programming needs. If you want to experience `Claude Code` on a budget, creating a proxy pool with free models from various channels is an excellent choice.

However, free models have limitations, including call limits, frequency limits, and adaptation issues. Call and frequency limits can be addressed by using multiple accounts and keys. This article focuses on the adaptation issue.

It is certain that the `Claude` model used in `Claude Code` is specially adapted and performs exceptionally well, especially with a low probability of tool-calling errors and smooth workflow execution.

To use an external, non-specially trained model for `Claude Code`, the model must at least have good tool-calling and instruction-following capabilities. On this basis, we can use prompt enhancement to optimize its performance in `Claude Code`.

The following prompt enhancement is appended to the `Claude Code` system prompt. It attempts to guide the model to perform tasks better through usage examples and guidance. As the prompt content is quite long, you can refer to it here: [Prompts](../prompt/).

### 🎛️ Parameter Tuning

Judging from the requests sent by `Claude Code`, tuning is currently done mainly through the temperature parameter, while parameters like `top_k` and `top_p` are not set. It is recommended to refer to the official documentation for the optimal temperature of each model. It is known that the optimal temperature for `qwen3-coder` is 0.7, and for `kimi-k2` it is 0.6. For other models, please refer to the official documentation of the model you are using.
