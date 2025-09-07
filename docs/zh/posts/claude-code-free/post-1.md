---
title: 免费使用 Claude Code：集成魔塔 qwen3-code
date: 2025-09-07
category:
  - 低成本编程
tag:
  - Claude Code
  - 免费
---

## 开始之前

本篇是“免费使用 Claude Code”系列博客的第一篇，将向你展示如何通过接入魔塔的 `qwen3-coder` 模型，实现免费使用 Claude Code。

在开始之前，你必须先安装 [Chatspeed](https://github.com/aidyou/chatspeed/releases)。Chatspeed 的代理模块 (`ccproxy`) 实现了在 OpenAI 兼容格式、Claude、Gemini、Ollama 原生协议之间的任意转换，是实现本文目标的关键工具。关于 Chatspeed 的安装，请参考[安装指南](../../guide/installation.md)。

## 免费使用 Claude Code

### 平台及模型

本次我们选用接入 Claude Code 的模型是[魔塔](https://www.modelscope.cn/)的 `qwen3-coder`。截止目前（2025-09-07），魔塔为每个注册账户提供每天2000次免费调用，这对于个人开发者来说完全足够。

### 魔塔账户申请

| 步骤 | 操作内容 | 关键说明 |
| :--- | :--- | :--- |
| **1. 访问官网** | 在浏览器中打开 [https://www.modelscope.cn](https://www.modelscope.cn) | 这是 ModelScope 的官方网站。非中文用户可以切换到英文界面。 |
| **2. 注册账号** | 点击页面右上角的 **“登录/注册”** 按钮，按提示填写信息（如手机号、验证码）完成注册。 | 建议使用手机号进行注册，需要短信验证。 |
| **3. 绑定阿里云账号** | 注册登录后，系统通常会提示你**绑定阿里云账号**。请按指引完成绑定授权。 | **此步非常重要！** 未绑定阿里云账号会导致后续无法获取 API Key 或调用 API 时出现 “Please bind your Alibaba Cloud account before use.” 的错误提示。 |
| **4. 获取 API Key** | 登录后，在网站右上角点击你的**头像**，进入 **“账户设置”**。 | 这是管理密钥的地方。 |
| 4.1 | 在个人中心侧边栏中，找到并点击 **“访问令牌”**。 | 不同时期的界面描述可能略有差异。 |
| 4.2 | 在 API 密钥管理页面，点击 **“新建访问令牌”**。 | 系统会为你生成一个新的密钥。 |
| 4.3 | 为密钥设置一个便于记忆的**名称**（例如：for_chatspeed_project）。 | 一个好记的名称有助于后期管理多个密钥。 |
| 4.4 | **复制并妥善保存系统为您生成的密钥。** | **密钥安全至关重要**，切勿泄露给他人。 |

#### ⚠️ 重要注意事项

1.  **阿里云账号绑定**：这是成功使用 ModelScope 许多功能（包括获取 API Key 和调用 API）的**前提条件**。请务必完成。
2.  **免费额度**：ModelScope 为新用户提供了**每天 2000 次免费调用**的额度，对于个人体验和开发测试来说非常充裕。你可以在个人中心或相关页面查看额度的使用情况。

### 将 qwen3-coder 接入 Claude Code

#### 1. 添加 qwen3-coder 到 Chatspeed

##### 1.1 如下图所示，点开模型管理界面：

![模型管理](/images/zh/setting-add-model-1.png)

##### 1.2 点击“添加模型”按钮：

![添加模型](/images/zh/setting-add-model-2.png)

##### 1.3 从预设导入：

![添加模型](/images/blog/zh/qwen3-code-add-1.png)

##### 1.4 在数字1位置输入密钥：

![添加模型](/images/blog/zh/qwen3-code-add-2.png)

##### 1.5 按标注的数字1和数字2的顺序点击导入模型，搜索 qwen3-coder，然后选择数字3标注的模型：

![添加模型](/images/blog/zh/qwen3-code-add-3.png)

#### 2. 创建代理分组

##### 2.1 如下图所示，进入“代理”设置界面：

![代理分组菜单](/images/zh/proxy-group-1.png)

##### 2.2 按数字顺序点击，进入“代理分组”添加界面：

![代理分组](/images/zh/proxy-group-2.png)

##### 2.3 填写代理分组名称和描述，提示词可以从 [Claude Code提示词增强](../../prompt/claude-code-prompt-enhance.md) 拷贝。

![代理分组信息编辑](/images/zh/proxy-group-3.png)

#### 3. 设置 Claude Code 代理模型

Claude Code 目前使用3个模型，作用如下：

- `claude-3-5-haiku-20241022`: 通常用于简单的任务，比如生成会话主题
- `claude-sonnet-4-20250514`: 截止目前，Claude Code 中的大量编程任务都是这个模型完成的
- `claude-opus-4-1-20250805`: 目前还不知道是做啥，不过我遇到过提示缺少这个模型，所以最好设置下

##### 3.1 按数字标注顺点开添加代理界面

![代理分组菜单](/images/zh/proxy-setting-1.png)

##### 3.2 按数字标注填选`claude-3-5-haiku-20241022`相关信息

![代理分组菜单](/images/blog/zh/qwen3-code-add-4.png)

##### 3.2 按数字标注填选`claude-opus-4-1-20250805`相关信息

![代理分组菜单](/images/blog/zh/qwen3-code-add-5.png)

> 图中我们为代理目标额外勾选了 `openrouter` 的 `qwen3-coder` 模型。当为同一个目标选择多个模型时，`ccproxy` 模块会在每次请求时，对这些模型进行负载均衡轮换。

##### 3.2 按上面步骤再添加`claude-sonnet-4-20250514`相关信息设置即可完成

#### 4. 设置代理密钥

如下图所示，添加一个专用密钥。

![代理分组菜单](/images/zh/proxy-key-1.png)

##### 4.1 接入 Claude Code

下面提供两种方式接入 Claude Code：

1.  **直接接入**

    由于魔塔的 `qwen3-coder` 模型对工具调用有良好的支持，因此可以直接接入，无需启用工具兼容模式。接入方法很简单，执行下面的命令即可：

    ```sh
    export ANTHROPIC_BASE_URL="http://127.0.0.1:11434/qwen"
    export ANTHROPIC_AUTH_TOKEN="{You-Proxy-Token}"

    # 现在执行 claude 就可以用 ccproxy 模块接入我们上面设置的模型了
    claude
    ```

    注意：命令中的密钥需从下图所示位置复制：

    ![代理分组菜单](/images/zh/proxy-key-3.png)

2.  **启用工具兼容模式**

    如果你勾选了多个供应商的相同（或不同）模型，而有些模型不支持原生工具调用，此时便可以启用工具兼容模式，以确保所有模型都能使用工具调用。启用方法很简单，只需在 URL 末尾添加 `/compat_mode` 即可。

    使用以下命令即可启用 `ccproxy` 的工具兼容模式来接入 Claude Code:

    ```sh
    export ANTHROPIC_BASE_URL="http://127.0.0.1:11434/qwen/compat_mode"
    export ANTHROPIC_AUTH_TOKEN="{You-Proxy-Token}"

    # 现在执行 claude 就可以用 ccproxy 模块接入我们上面设置的模型了
    claude
    ```

    启动后你通常可以看到类似下面的界面：

    ```shell
    > claude
    ╭───────────────────────────────────────────────────╮
    │ ✻ Welcome to Claude Code!                         │
    │                                                   │
    │   /help for help, /status for your current setup  │
    │                                                   │
    │   cwd: /path/to/you/project                       │
    │                                                   │
    │   ─────────────────────────────────────────────── │
    │                                                   │
    │   Overrides (via env):                            │
    │                                                   │
    │   • API Base URL:                                 │
    │   http://127.0.0.1:11434/qwen/compat_mode         │
    ╰───────────────────────────────────────────────────╯
    ```
