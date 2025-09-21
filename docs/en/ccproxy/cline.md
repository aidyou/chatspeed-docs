# `Cline` Integration Guide

[Cline](https://github.com/cline/cline) is an excellent `VS Code` AI programming plugin that uses a `Plan -> Execute` workflow. This guide explains how to connect proxy models from `CCProxy` to `Cline`.

### 📋 Prerequisites

Before you begin, ensure you have completed the following steps:

1. Installed [Chatspeed](../guide/installation.md)
2. Added the necessary models according to the [Quick Start](../guide/quickStart.md)
3. Completed the [CCProxy Basic Configuration](configuration.md)
4. Added the required proxy models
5. Configured the proxy keys

> For the Cline plugin, the model is specified by the user, so configuring a **Proxy Group** is not a necessary condition.

### ⚙️ Configuration Steps

1. **Set the Execution Model**
   - **API Provider**: Select `OpenAI Compatible`.
   - **Base URL**: Enter `http://127.0.0.1:11434/v1`.
   - **API Key**: Copy the proxy key from the `CCProxy` settings interface and paste it here.
   - **Model ID**: Enter `gemini2.5-flash`.
   - `gemini2.5-flash` supports image input and tool calling, so you can check the corresponding options or ignore them.

> You can change the Model ID to something else based on your configuration, such as `qwen3-coder` or `deepseek-v3`, which are also good choices.

![Configure Cline Execution Model](/images/common/cline-setting-1.png)

2. **Set the Plan Model**
   - Switch to `Plan Mode`, modify the information in the order indicated by the numbers in the image below, and then click the `Done` button marked as **number 3** to save the information.
     - **Model ID**: Select `deepseek-r1-0528`.
     - `deepseek-r1-0528` is an inference model, so as shown by **number 2**, uncheck `Supports Images` and `Supports browser use`.

![Configure Cline Plan Model](/images/common/cline-setting-2.png)

### ✅ Verify Configuration
   - Return to the Cline main interface.
   - Test if the basic functions are working correctly.

   ![Using CCProxy in Cline](/images/common/cline-setting-3.png)

### 📊 Recommended Model Configuration

| Purpose         | Recommended Model | Notes                            |
| --------------- | ----------------- | -------------------------------- |
| Plan Model      | deepseek-r1-0528  | Strong inference, good for tasks |
| Execution Model | gemini2.5-flash   | Fast response, good for coding   |

### ❓ FAQ

**Q: Why isn't my model working?**

**A: Please check the following:**

1. Is the CCProxy service running?
2. Has the model been added in CCProxy?
3. Is the API Key correct?
4. Does the Base URL include the correct port number?

**Q: How do I switch between different models?**

**A:** Simply change the Model ID in the settings and save. No need to restart VS Code.

[Back to Main Document](./README.md)
